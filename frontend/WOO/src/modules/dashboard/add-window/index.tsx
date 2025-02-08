import { Form, Input, InputNumber, Upload, Button, Row, Col, DatePicker, Switch, Flex, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createWindow } from "../../../utils/api/api-functions";

const AddWindowForm = () => {
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();
    const submitData = async (data: any) => {

        notification.open({
            message: "Upload Successful",
            description: "Your window data has been uploaded successfully.",
        });

        const jsonData = data
        // Convert JSON to FormData
        const formData = new FormData();

        // Flatten & Append data
        Object.entries(jsonData).forEach(([key, value]: any) => {
            if (key === "image" && value?.file as any) {
                formData.append("image", value?.file as any);
            } else {
                formData.append(key, value as any);
            }
        });

        try {

            const response = await createWindow(formData)
            // Show success notification
            api.success({
                message: "Upload Successful",
                description: "Your window data has been uploaded successfully.",
            });

            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
            api.error({
                message: "Upload Failed",
                description: "There was an issue with uploading the data. Please try again.",
                placement: "topRight",
                duration: 3,
            });
        }
    };

    return (
        <div className="scrollable-container">
            {contextHolder}
            <Flex justify="center">

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={submitData}
                    initialValues={{
                        projectName: "",
                        streetName: "",
                        streetNumber: "",
                        postcode: "",
                        city: "",
                        country: "",
                        count: 0,
                        height: 0,
                        width: 0,
                        yearFrom: 1990,
                        yearTo: 2020,
                        glassPane: 0,
                        coating: 0,
                        uValue: 0,
                        airResistance: "",
                        windResistance: "",
                        soundResistance: "",
                        fireproof: false,
                        dismantleDate: "",
                        gasFilling1: "",
                        gasFilling2: "",
                        gValue: 0,
                        materialFrame: "",
                        lightTransmittance: 0,
                        security: "",
                        spacerMaterial: "",
                        soundProofingDb: 0,
                        thicknessGlassMm1: 0,
                        thicknessGlassMm2: 0,
                        thicknessGlassMm3: 0,
                        color: ""
                    }}
                    style={{
                        width: "80%",
                        maxWidth: 900,
                        background: "#fff",
                        padding: 24,
                        borderRadius: 8,
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                    }}
                >
                    <h2>Project Details</h2>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Project Name" name="projectName" rules={[{ required: true, message: "Required" }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Street Name" name="streetName">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Street Number" name="streetNumber">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Postcode" name="postcode">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="City" name="city">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Country" name="country">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h2>Window Details</h2>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Window Count" name="count">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Height (m)" name="height">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Width (m)" name="width">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Year From" name="yearFrom">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Year To" name="yearTo">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Glass Pane" name="glassPane">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Coating" name="coating">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="U-Value" name="uValue">
                                <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Air Resistance" name="airResistance">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Wind Resistance" name="windResistance">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Sound Resistance" name="soundResistance">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Fireproof" name="fireproof" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Dismantle Date" name="dismantleDate">
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Gas Filling 1" name="gasFilling1">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Gas Filling 2" name="gasFilling2">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Material Frame" name="materialFrame">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Light Transmittance" name="lightTransmittance">
                                <InputNumber min={0} max={1} step={0.01} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Security" name="security">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="G Value" name="gValue">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Spacer Material" name="spacerMaterial">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Sound Proofing (dB)" name="soundProofingDb">
                                <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Thickness Glass 1 (mm)" name="thicknessGlassMm1">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Thickness Glass 2 (mm)" name="thicknessGlassMm2">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Thickness Glass 3 (mm)" name="thicknessGlassMm3">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Color" name="color">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Upload Image" name="image">
                        <Upload
                            beforeUpload={(file) => false} // Disable auto upload
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Button color="default" style={{
                        width: '100%'
                    }} variant="solid" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Flex>
        </div>
    );
};

export default AddWindowForm;
