import React, { useState } from "react";
import { Table, Typography, Input, Space } from "antd";

// Example data (you can replace it with your actual data)
const initialData = [
    {
        key: "1",
        projectName: "Green Tower Renovation",
        streetName: "Main Street",
        streetNumber: "123",
        postcode: "12345",
        city: "Sample City",
        country: "Sampleland",
    },
    {
        key: "2",
        projectName: "Blue Sky Project",
        streetName: "Second Avenue",
        streetNumber: "456",
        postcode: "67890",
        city: "Sunset City",
        country: "Sunland",
    },
    // Add more data as needed
];

const FindWindow = () => {
    const [data, setData] = useState(initialData); // State to hold the filtered data
    const [searchText, setSearchText] = useState(""); // State to hold the search text

    // Columns definition
    const columns = [
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
        },
        {
            title: "Street Name",
            dataIndex: "streetName",
            key: "streetName",
        },
        {
            title: "Street Number",
            dataIndex: "streetNumber",
            key: "streetNumber",
        },
        {
            title: "Postcode",
            dataIndex: "postcode",
            key: "postcode",
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
        },
    ];

    // Filter data based on search text
    const handleSearch = (value: string) => {
        setSearchText(value);
        const filteredData = initialData.filter((item) => {
            return (
                item.projectName.toLowerCase().includes(value.toLowerCase()) ||
                item.streetName.toLowerCase().includes(value.toLowerCase()) ||
                item.streetNumber.includes(value) ||
                item.postcode.includes(value) ||
                item.city.toLowerCase().includes(value.toLowerCase()) ||
                item.country.toLowerCase().includes(value.toLowerCase())
            );
        });
        setData(filteredData);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography.Title level={3}>Find Windows</Typography.Title>
            <Space style={{ marginBottom: "20px", width: "100%" }}>
                <Input
                    placeholder="Search windows..."
                    style={{
                        width: 300
                    }}
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Space>

            {/* Table */}
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default FindWindow;
