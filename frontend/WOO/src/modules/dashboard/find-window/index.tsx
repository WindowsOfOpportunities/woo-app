import { useEffect, useState } from "react";
import { Table, Typography, Input, Space, Modal, Tag } from "antd";
import { getImageByWindowId, getWindowsList } from "../../../utils/api/api-functions";

const FindWindow = () => {
    const [windowData, setWindowData] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);
    const [filteredData, setFilteredData] = useState<any>([]); // New state for filtered data
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<null | string>(null);

    useEffect(() => {
        setLoading(true);
        getWindowsList()
            .then((data) => {
                setWindowData(data);
                setFilteredData(data); // Initialize filteredData with windowData
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const showImageModal = async (url: string) => {
        try {
            const blob = await getImageByWindowId(url);
            const imageUrl = URL.createObjectURL(blob); // Convert Blob to object URL
            setSelectedImage(imageUrl);
            setModalVisible(true);
        } catch (error) {
            console.error("Error displaying image:", error);
        }
    };

    const mapColorToWord = (number: number) => {
        switch (number) {
            case 1:
                return 'Low'
                break;

            case 2:
                return 'Medium'
                break;

            case 3:
                return 'High'
                break;

            default:
                break;
        }
    }

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
            render: (value: any, record: any) => value + ' m'
        },
        {
            title: "Window Width",
            dataIndex: "windowWidth",
            key: "windowWidth",
            render: (value: any, record: any) => value + ' m'
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
            render: (value: any, record: any) => value + ' W/m²K'
        },
        {
            title: "Recycling Potential",
            dataIndex: "recycling",
            key: "recycling",
            render: (_: any, record: any) =>
            (
                <Tag color={record?.windowRating?.recycling?.color}>{mapColorToWord(record?.windowRating?.recycling?.value)}</Tag>
            )
        },
        {
            title: "Reuse Glass Potential",
            dataIndex: "reuseGlass",
            key: "reuseGlass",
            render: (_: any, record: any) =>
            (
                <Tag color={record?.windowRating?.reuseGlass?.color}>{mapColorToWord(record?.windowRating?.reuseGlass?.value)}</Tag>
            )
        },
        {
            title: "Reuse Sashes Potential",
            dataIndex: "reuseSashes",
            key: "reuseSashes",
            render: (_: any, record: any) =>
            (
                <Tag color={record?.windowRating?.reuseSashes?.color}>{mapColorToWord(record?.windowRating?.reuseSashes?.value)}</Tag>
            )
        },
        {
            title: "Reuse Whole Window Potential",
            dataIndex: "reuseWindow",
            key: "reuseWindow",
            render: (_: any, record: any) =>
            (
                <Tag color={record?.windowRating?.reuseWindow?.color}>{mapColorToWord(record?.windowRating?.reuseWindow?.value)}</Tag>
            )
        },
        {
            title: "Dismantle Date",
            dataIndex: "dismantleDate",
            key: "dismantleDate",
            render: (value: any, record: any) => value.split('-')[2] + '-' + value.split('-')[1] + '-' + value.split('-')[0]
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

    const handleSearch = (value: string) => {
        setSearchText(value);

        if (!value) {
            setFilteredData(windowData); // If search is empty, show all data
            return;
        }

        const filtered = windowData.filter((item: any) => {
            // Check if any field contains the search value (case insensitive)
            return Object.values(item)
                .some((val) => val && val.toString().toLowerCase().includes(value.toLowerCase()));
        });

        setFilteredData(filtered); // Update filtered data
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
            <Table
                columns={columns}
                dataSource={filteredData} // Display filtered data
                loading={loading}
                rowKey="projectId" // Assuming projectId is unique for each row
            />
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                {selectedImage ? (
                    <div style={{ padding: 20 }}>
                        <img
                            src={selectedImage}
                            alt="Window"
                            style={{ width: "100%" }}
                        />
                    </div>
                ) : (
                    "No Image Available"
                )}
            </Modal>
        </div>
    );
};

export default FindWindow;