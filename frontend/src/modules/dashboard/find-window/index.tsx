import React, { useEffect, useState, useCallback } from "react";
import { Table, Typography, Input, Space, Modal, Tag, Flex, Radio } from "antd";
import {
    getImageByWindowId,
    getWindowsList,
} from "../../../utils/api/api-functions";
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Utility function for mapping color values
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

// **Colonnes pour le tableau "Fenster Informationen"**
const infoColumns = [
    {
        title: "Projekt",
        dataIndex: "projectName",
        key: "projectName",
        render: (value: any, record: any) => `${record?.project?.projectName}`,
    },
    {
        title: "Anzahl",
        dataIndex: "windowCount",
        key: "windowCount",
        render: (value: any) => `${value} Fenster`,
    },
    {
        title: "Masse (B*H)",
        key: "windowSize",
        render: (_: any, record: any) => `${record.windowWidth} m × ${record.windowHeight} m`,
    },
    {
        title: "Rahmen",
        dataIndex: "materialFrame",
        key: "materialFrame",
    },
    {
        title: "U-Wert",
        dataIndex: "uValue",
        key: "uValue",
        render: (value: any) => `${value} W/m²K`,
    },
    {
        title: "Anhänge",
        key: "action",
        render: (record: any) =>
            record.imageUrl ? (
                <a onClick={() => showImageModal(record.imageUrl)}>View Image</a>
            ) : (
                "No Image"
            ),
    },
];

// **Colonnes pour le tableau "Fenster Bewertung"**
const ratingColumns = [
    {
        title: "Fenster Reuse Potential",
        dataIndex: "reuseWindow",
        key: "reuseWindow",
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
        render: (_: any, record: any) => (
            <Tag color={record?.windowRating?.reuseSashes?.color}>
                {mapColorToWord(record?.windowRating?.reuseSashes?.value)}
            </Tag>
        ),
    },
    {
        title: "Glas Reuse Potential",
        dataIndex: "reuseGlass",
        key: "reuseGlass",
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
        render: (_: any, record: any) => (
            <Tag color={record?.windowRating?.recycling?.color}>
                {mapColorToWord(record?.windowRating?.recycling?.value)}
            </Tag>
        ),
    },
];

return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", height: "70vh" }}>
        <Space style={{ marginBottom: "20px", width: "100%" }}>
            <Input
                placeholder="Search windows..."
                style={{ width: 300 }}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </Space>

        {/* Conteneur avec un scroll global */}
        <div style={{ display: "flex", gap: "20px", flex: 1, overflowY: "auto" }}>
            {/* Tableau 1 : Fenster Informationen (55%) */}
            <div style={{ flex: 5, display: "flex", flexDirection: "column" }}>
                <h2>Fenster Informationen</h2>
                <Table 
                    columns={infoColumns} 
                    dataSource={filteredData} 
                    pagination={false} 
                    scroll={{ y: 400 }}  // 🔥 Synchronisation des hauteurs
                    tableLayout="fixed"
                />
            </div>

            {/* Tableau 2 : Fenster Bewertung (45%) */}
            <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
                <h2>Fenster Bewertung</h2>
                <Table 
                    columns={ratingColumns} 
                    dataSource={filteredData} 
                    pagination={false} 
                    scroll={{ y: 400 }}  // 🔥 Synchronisation des hauteurs
                    tableLayout="fixed"
                />
            </div>
        </div>
    </div>
);

};

export default FindWindow;
