import { useState } from "react";
import { Table, Typography, Input, Space, Modal } from "antd";
import { getImageByWindowId } from "../../../utils/api/api-functions";

// Example dataset
const initialData = [
    {
        key: "1",
        windowItemId: "e1efe044-e644-4cf0-8a97-34bcb8a51c9d",
        projectId: "8de50881-ef26-4699-a232-4a935b188707",
        windowCount: 4,
        materialFrame: "Aluminum",
        color: "White",
        dismantleDate: "2025-06-14",
        fireproof: "Yes",
        imageUrl: null,
    },
    {
        key: "2",
        windowItemId: "a6e61d86-7dd8-483b-921c-bc84cbe7d2c9",
        projectId: "80f62fb0-8fac-47cb-a3dd-49f09fc34093",
        windowCount: 4,
        materialFrame: "Aluminum",
        color: "White",
        dismantleDate: "2025-06-14",
        fireproof: "Yes",
        imageUrl: "8d986bd1-087a-4716-afce-ee1f0a0cd23f",
    },
    {
        key: "3",
        windowItemId: "41837634-f395-4af5-b00b-5ba409e7aea7",
        projectId: "0df7c74d-b1a7-4071-b715-daca80c82424",
        windowCount: 0,
        materialFrame: "asdsa",
        color: "asdsada",
        dismantleDate: "2025-02-19",
        fireproof: "false",
        imageUrl: "5e51beaa-1a33-4c04-8cd5-954b392de9a1",
    },
];

const FindWindow = () => {

    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<null | string>(null);

    const showImageModal = async (url: string) => {
        setSelectedImage(url);
        const respose = await getImageByWindowId(url);
        console.log(respose);
        setModalVisible(true);
    };


    const columns = [
        {
            title: "Project ID",
            dataIndex: "projectId",
            key: "projectId",
        },
        {
            title: "Window Count",
            dataIndex: "windowCount",
            key: "windowCount",
        },
        {
            title: "Material Frame",
            dataIndex: "materialFrame",
            key: "materialFrame",
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Dismantle Date",
            dataIndex: "dismantleDate",
            key: "dismantleDate",
        },
        {
            title: "Fireproof",
            dataIndex: "fireproof",
            key: "fireproof",
        },
        {
            title: "Image Id",
            dataIndex: "imageUrl",
            key: "imageUrl",
        },
        {
            title: "Action",
            key: "action",
            render: (record: any) =>
                record.imageUrl ? (
                    <a onClick={() => showImageModal(record.imageUrl)}>View Image</a>
                ) : (
                    "No Image"
                ),
        },
    ];

    const handleSearch = (value: any) => {
        setSearchText(value);
        const filteredData = initialData.filter((item) =>
            Object.values(item).some(
                (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
            )
        );
        setData(filteredData);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title level={3}>Find Windows</Typography.Title>
            <Space style={{ marginBottom: "20px", width: "100%" }}>
                <Input
                    placeholder="Search windows..."
                    style={{ width: 300 }}
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Space>
            <Table columns={columns} dataSource={data} />
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                {selectedImage ? (
                    <img
                        src={`https://your-image-host.com/images/${selectedImage}.jpg`}
                        alt="Window"
                        style={{ width: "100%" }}
                    />
                ) : (
                    "No Image Available"
                )}
            </Modal>
        </div>
    );
};

export default FindWindow;