import React, { useEffect, useState, useCallback } from "react";
import { Table, Typography, Input, Space, Modal, Tag, Flex, Radio } from "antd";
import {
    getImageByWindowId,
    getWindowsList,
} from "../../../utils/api/api-functions";
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

// Fonction pour mapper les couleurs aux valeurs
const mapColorToWord = (number: number) => {
    const colorMap: Record<number, string> = {
        1: 'Gering',
        2: 'Mittel',
        3: 'Hoch',
    };
    return colorMap[number] || '';
};

const FindWindow = () => {
    const [windowData, setWindowData] = useState<any[]>([]);
    const [viewSection, setViewSection] = useState<'Table' | 'Map'>('Table');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchWindowsData = async () => {
            setLoading(true);
            try {
                const data = await getWindowsList();
                setWindowData(data);
                setFilteredData(data);
            } catch (error) {
                console.error("Error fetching windows data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWindowsData();
    }, []);

    const showImageModal = useCallback(async (imageUrl: string) => {
        try {
            const blob = await getImageByWindowId(imageUrl);
            const imageUrlObject = URL.createObjectURL(blob);
            setSelectedImage(imageUrlObject);
            setModalVisible(true);
        } catch (error) {
            console.error("Error displaying image:", error);
        }
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value.toLowerCase());

        if (!value) {
            setFilteredData(windowData);
            return;
        }

        const filtered = windowData.filter((item) => {
            return (
                (item.project?.projectName?.toLowerCase() || "").includes(value.toLowerCase()) ||
                (item.project?.city?.toLowerCase() || "").includes(value.toLowerCase()) ||
                Object.values(item).some(
                    (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
                )
            );
        });

        setFilteredData(filtered);
    };

    // **Tableau fusionné avec toutes les colonnes**
    const columns = [
        {
            title: "Projekt",
            dataIndex: "projectName",
            key: "projectName",
            width: 290, // Ajustement de la largeur
            render: (value: any, record: any) => record?.project?.projectName,
        },
        {
            title: "Anzahl",
            dataIndex: "windowCount",
            key: "windowCount",
            width: 120, // Réduction pour équilibrer
            render: (value: any) => `${value} Fenster`,
        },
        {
            title: "Masse (B*H)",
            key: "windowSize",
            width: 120,
            render: (_: any, record: any) => `${record.windowWidth} m * ${record.windowHeight} m`,
        },
        {
            title: "Rahmen",
            dataIndex: "materialFrame",
            key: "materialFrame",
            width: 120,
        },
        {
            title: "U-Wert",
            dataIndex: "uValue",
            key: "uValue",
            width: 120,
            render: (value: any) => `${value} W/m²K`,
        },
        {
            title: "Anhänge",
            key: "action",
            width: 120,
            render: (record: any) =>
                record.imageUrl ? (
                    <a onClick={() => showImageModal(record.imageUrl)}>View Image</a>
                ) : (
                    "No Image"
                ),
        },
        {
            title: "Fenster ReUse Potential",
            dataIndex: "reuseWindow",
            key: "reuseWindow",
            width: 120, // Ajustement de la largeur pour éviter le texte compressé
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.reuseWindow?.color}>
                    {mapColorToWord(record?.windowRating?.reuseWindow?.value)}
                </Tag>
            ),
        },
        {
            title: "Kastenfenster Potential",
            dataIndex: "reuseSashes",
            key: "reuseSashes",
            width: 120, // Alignement équilibré
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.reuseSashes?.color}>
                    {mapColorToWord(record?.windowRating?.reuseSashes?.value)}
                </Tag>
            ),
        },
        {
            title: "Glas ReUse Potential",
            dataIndex: "reuseGlass",
            key: "reuseGlass",
            width: 120,
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.reuseGlass?.color}>
                    {mapColorToWord(record?.windowRating?.reuseGlass?.value)}
                </Tag>
            ),
        },
        {
            title: "Recycling Potential",
            dataIndex: "recycling",
            key: "recycling",
            width: 120,
            render: (_: any, record: any) => (
                <Tag color={record?.windowRating?.recycling?.color}>
                    {mapColorToWord(record?.windowRating?.recycling?.value)}
                </Tag>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px", height: "80vh", display: "flex", flexDirection: "column" }}>
            <Typography.Title level={3}>Find Windows</Typography.Title>

            <Flex style={{ marginBottom: 20 }}>
                <Radio.Group
                    value={viewSection}
                    onChange={(e) => setViewSection(e.target.value)}
                    buttonStyle="solid"
                >
                    <Radio.Button value="Table">Table</Radio.Button>
                    <Radio.Button value="Map">Map</Radio.Button>
                </Radio.Group>
            </Flex>

            {viewSection === 'Table' ? (
                <>
                    <Space style={{ marginBottom: "20px", width: "100%" }}>
                        <Input
                            placeholder="Search windows..."
                            style={{ width: 300 }}
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Space>

                    {/* Tableau fusionné */}
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={false}
                        scroll={{ y: 500 }}
                        tableLayout="fixed"
                    />
                </>
            ) : (
                <div style={{ height: "60vh", borderRadius: 8, overflow: "hidden" }}>
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={5}
                        scrollWheelZoom={true}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" />
                    </MapContainer>
                </div>
            )}

            {/* Modal pour l'image */}
            <Modal open={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                {selectedImage ? <img src={selectedImage} alt="Window" style={{ width: "100%" }} /> : "No Image Available"}
            </Modal>
        </div>
    );
};

export default FindWindow;
