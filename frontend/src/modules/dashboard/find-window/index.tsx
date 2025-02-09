import { useEffect, useState, useCallback } from "react";
import { Table, Typography, Input, Space, Modal, Tag } from "antd";
import { getImageByWindowId, getWindowsList } from "../../../utils/api/api-functions";

// Utility function for mapping color values
const mapColorToWord = (number: number) => {
    const colorMap: Record<number, string> = {
        1: 'Low',
        2: 'Medium',
        3: 'High',
    };
    return colorMap[number] || '';
};

const FindWindow = () => {
    const [windowData, setWindowData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Fetch windows data on mount
    useEffect(() => {
        const fetchWindowsData = async () => {
            setLoading(true);
            try {
                const data = await getWindowsList();
                setWindowData(data);
                setFilteredData(data); // Initialize filtered data with the full data set
            } catch (error) {
                console.error("Error fetching windows data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWindowsData();
    }, []);

    // Show image modal
    const showImageModal = useCallback(async (imageUrl: string) => {
        try {
            const blob = await getImageByWindowId(imageUrl);
            const imageUrlObject = URL.createObjectURL(blob); // Convert Blob to object URL
            setSelectedImage(imageUrlObject);
            setModalVisible(true);
        } catch (error) {
            console.error("Error displaying image:", error);
        }
    }, []);

    // Handle search input
    const handleSearch = (value: string) => {
        setSearchText(value);

        if (!value) {
            setFilteredData(windowData); // Reset filtered data when search is cleared
            return;
        }

        const filtered = windowData.filter((item) => {
            return Object.values(item).some((val) =>
                val && val.toString().toLowerCase().includes(value.toLowerCase())
            );
        });

        setFilteredData(filtered);
    };

    // Columns definition for the table
    const columns = [
        {
            title: "Window Count",
            dataIndex: "windowCount",
            key: "windowCount",
        },
        {
            title: "Window Height",
            dataIndex: "windowHeight",
            key: "windowHeight",
            render: (value: any) => `${value} m`,
        },
        {
            title: "Window Width",
            dataIndex: "windowWidth",
            key: "windowWidth",
            render: (value: any) => `${value} m`,
        },
        {
            title: "Material Frame",
            dataIndex: "materialFrame",
            key: "materialFrame",
        },
        {
            title: "U Value",
            dataIndex: "uValue",
            key: "uValue",
            render: (value: any) => `${value} W/m²K`,
        },
        {
            title: "Recycling Potential",
            dataIndex: "recycling",
            key: "recycling",
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.recycling?.color}>
                    {mapColorToWord(record?.windowRating?.recycling?.value)}
                </Tag>
            ),
        },
        {
            title: "Reuse Glass Potential",
            dataIndex: "reuseGlass",
            key: "reuseGlass",
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.reuseGlass?.color}>
                    {mapColorToWord(record?.windowRating?.reuseGlass?.value)}
                </Tag>
            ),
        },
        {
            title: "Reuse Sashes Potential",
            dataIndex: "reuseSashes",
            key: "reuseSashes",
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.reuseSashes?.color}>
                    {mapColorToWord(record?.windowRating?.reuseSashes?.value)}
                </Tag>
            ),
        },
        {
            title: "Reuse Whole Window Potential",
            dataIndex: "reuseWindow",
            key: "reuseWindow",
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.reuseWindow?.color}>
                    {mapColorToWord(record?.windowRating?.reuseWindow?.value)}
                </Tag>
            ),
        },
        {
            title: "Dismantle Date",
            dataIndex: "dismantleDate",
            key: "dismantleDate",
            render: (value: any) => {
                const [year, month, day] = value.split("-");
                return `${day}-${month}-${year}`;
            },
        },
        {
            title: "Actions",
            key: "action",
            render: (record: any) =>
                record.imageUrl ? (
                    <a onClick={() => showImageModal(record.imageUrl)}>View Image</a>
                ) : (
                    "No Image"
                ),
        },
    ];

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
            <Table
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                rowKey="projectId" // Assuming projectId is unique for each row
                scroll={{ y: "40vh", x: 900 }}
            />
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                {selectedImage ? (
                    <div style={{ padding: 20 }}>
                        <img src={selectedImage} alt="Window" style={{ width: "100%" }} />
                    </div>
                ) : (
                    "No Image Available"
                )}
            </Modal>
        </div>
    );
};

export default FindWindow;
