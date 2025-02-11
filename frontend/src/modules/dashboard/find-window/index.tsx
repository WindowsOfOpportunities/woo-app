import { useEffect, useState, useCallback, useMemo } from "react";
import { Table, Typography, Input, Space, Modal, Tag, Flex, Radio } from "antd";
import {
    getImageByWindowId,
    getWindowsList,
} from "../../../utils/api/api-functions";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";


// Utility function for mapping color values
const mapColorToWord = (number: number) => {
    const colorMap: Record<number, string> = {
        1: 'Low',
        2: 'Medium',
        3: 'High',
    };
    return colorMap[number] || '';
};

// Custom icon for markers
const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const FindWindow = () => {
    const [windowData, setWindowData] = useState<any[]>([]);
    const [viewSection, setViewSection] = useState<'Table' | 'Map'>('Table');
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
        setSearchText(value.toLowerCase());

        if (!value) {
            setFilteredData(windowData); // Reset filtered data when search is cleared
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

    // Columns definition for the table
    const columns = [
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
            render: (value: any, record: any) => `${record?.project?.projectName}`,
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            render: (value: any, record: any) => `${record?.project?.city}`,
        },
        {
            title: "Anzahl verfügbare Fenster",
            dataIndex: "windowCount",
            key: "windowCount",
        },
        {
            title: "Höhe",
            dataIndex: "windowHeight",
            key: "windowHeight",
            render: (value: any) => `${value} m`,
        },
        {
            title: "Breite",
            dataIndex: "windowWidth",
            key: "windowWidth",
            render: (value: any) => `${value} m`,
        },
        {
            title: "Rahmen Material",
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
            title: "Abbruch Datum",
            dataIndex: "dismantleDate",
            key: "dismantleDate",
            render: (value: any) => {
                const [year, month] = value.split("-");
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

    // Memoized markers to prevent unnecessary re-renders
    const markers = useMemo(() => {

        return filteredData.map((item) => {
            if (!item.lat || !item.lon) return null;
            return (
                <Marker key={item.projectId} position={[item.lat, item.lon]} icon={customIcon}>
                    <Popup >
                        <Flex vertical >
                            <span> <strong>Project:</strong> {item?.project?.projectName} </span>
                            <span> <strong>City:</strong> {item?.project?.city} </span>
                            <span> <strong>Window Count:</strong> {item.windowCount} </span>
                            <span> <strong>Window Width:</strong> {item.windowWidth} </span>
                            <span> <strong>Material Frame:</strong> {item.materialFrame} </span>
                            <span> <strong>U Value:</strong> {item.uValue} </span>
                            <span>    <strong>Dismantle Date:</strong> {item.dismantleDate} </span>
                        </Flex>
                    </Popup>
                </Marker>
            );
        }).filter(Boolean);
    }, [filteredData]);

    const MapBounds = ({ data }: { data: any[] }) => {
        const map = useMap();

        useEffect(() => {
            const points = data
                .filter(item => item.lat && item.lon)
                .map(item => L.latLng(item.lat, item.lon));

            if (points.length > 0) {
                const bounds = L.latLngBounds(points);
                map.fitBounds(bounds);
            }
        }, [data, map]);

        return null;
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title level={3}>Find Windows</Typography.Title>
            <Flex style={{ marginBottom: 20 }}>
                <Radio.Group value={viewSection} onChange={(e) => setViewSection(e.target.value)} buttonStyle="solid">
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
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        loading={loading}
                        rowKey="projectId"
                        scroll={{ y: "40vh", x: 900 }}
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
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; ESRI'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                        />
                        {markers}
                        <MapBounds data={filteredData} />
                    </MapContainer>
                </div>
            )}

            <Modal visible={modalVisible} footer={null} onCancel={() => setModalVisible(false)}>
                {selectedImage ? <img src={selectedImage} alt="Window" style={{ width: "100%" }} /> : "No Image Available"}
            </Modal>
        </div>
    );
};

export default FindWindow;
