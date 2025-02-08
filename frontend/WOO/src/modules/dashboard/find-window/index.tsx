import { Form, Input, InputNumber, Upload, Button, Flex, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import axios from "axios";

const AddWindowForm = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log("Form Submitted:", values);
    };

    const submitData = async () => {
        const jsonData = {
            projectName: "Green Tower Renovation",
            streetName: "Main Street",
            streetNumber: "123",
            postcode: "12345",
            city: "Sample City",
            country: "Sampleland",
            window: {
                count: 4,
                height: 1.5,
                width: 1.2,
                yearFrom: 1995,
                yearTo: 2005,
                glassPane: 2,
                coating: 1,
                uValue: 1.2,
                airResistance: "Class 4",
                windResistance: "Class C5",
                soundResistance: "Rw 40dB",
                fireproof: "Yes",
                dismantleDate: "2025-06-15",
                image: "window_image.jpg", // File name (will replace with File object)
                gasFilling1: "Argon",
                gasFilling2: "Krypton",
                gValue: 0.6,
                materialFrame: "Aluminum",
                lightTransmittance: 0.75,
                security: "RC2",
                spacerMaterial: "Stainless Steel",
                soundProofingDb: 45.0,
                thicknessGlassMm1: 4.0,
                thicknessGlassMm2: 6.0,
                thicknessGlassMm3: 4.0,
                color: "White"
            }
        };

        // Convert JSON to FormData
        const formData = new FormData();

        // Flatten & Append data
        Object.entries(jsonData).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null) {
                Object.entries(value).forEach(([subKey, subValue]) => {
                    formData.append(`window[${subKey}]`, subValue as any);
                });
            } else {
                formData.append(key, value as any);
            }
        });

        // Simulate file upload (replace this with actual File object)
        const file = new File([""], "window_image.jpg", { type: "image/jpeg" });
        formData.set("window[image]", file); // Replace filename with actual file input

        try {
            const response = await axios.post("http://localhost:3009/api/v1/external/window", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Upload failed:", error);
        }

    }





    return (
        <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

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
                    window: {
                        count: 0,
                        height: 0,
                        width: 0,
                        year: "",
                        glassPane: 0,
                        coating: 0,
                        uValue: 0,
                        image: null,
                    },
                }}
                style={{
                    width: "80%",
                    maxWidth: 900,
                    background: "#fff",
                    padding: 24,
                    borderRadius: 8,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
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

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Street Number" name="streetNumber">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Postcode" name="postcode">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="City" name="city">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Country" name="country">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <h2>Window Details</h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Window Count" name={["window", "count"]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Height (cm)" name={["window", "height"]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Width (cm)" name={["window", "width"]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Year" name={["window", "year"]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Glass Pane" name={["window", "glassPane"]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Coating" name={["window", "coating"]}>
                            <InputNumber min={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="U-Value" name={["window", "uValue"]}>
                            <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Window Image" name={["window", "image"]} valuePropName="fileList">
                            <Upload beforeUpload={() => false} listType="picture">
                                <Button icon={<UploadOutlined />} style={{
                                    width: '100%'
                                }}>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button color="default" variant="solid" htmlType="submit" style={{
                        width: '100%'
                    }}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddWindowForm;
