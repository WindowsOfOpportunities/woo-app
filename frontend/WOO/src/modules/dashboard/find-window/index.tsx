import { useEffect, useState } from "react";
import { Table, Typography, Input, Space, Modal, Tag } from "antd";
import {
  getImageByWindowId,
  getWindowsList,
} from "../../../utils/api/api-functions";

const FindWindow = () => {
  const [windowData, setWindowData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    getWindowsList()
      .then((data) => setWindowData(data))
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

  console.log(windowData);

  const handleSearch = (value: any) => {
    // setSearchText(value);
    // const filteredData = initialData.filter((item) =>
    //     Object.values(item).some(
    //         (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
    //     )
    // );
    // setData(filteredData);
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
      <Table columns={columns} dataSource={windowData} loading={loading} />
      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        {selectedImage ? (
          <div
            style={{
              padding: 20,
            }}
          >
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
