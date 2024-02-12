import {
    DeleteOutlined,
    FileOutlined,
    UploadOutlined
} from "@ant-design/icons";
import {
    Button,
    Col,
    Row,
    Select,
    Table,
    Tooltip,
    Upload
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

const ConnectNew = ({ dataModernizationCss }) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  const [isLoading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null); 

  const handleUpload = async (info) => {
    setLoading(true);
    setLoading(false);
  };

  const handleAddFile = () => {
  };
  const columns = [
    {
      title: "Workflow",
      dataIndex: "workflow",
      key: "workflow",
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
    },
    {
      title: "Hive",
      dataIndex: "hive",
      key: "hive",
    },
    {
      title: "Upload",
      dataIndex: "upload",
      key: "upload",
      render: (_, record) => (
        <Button
          className={dataModernizationCss.uploadBtn}
          onClick={() => handleUpload(record.key)}
          icon={<UploadOutlined />}
        >
          Upload
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Tooltip
          placement="top"
          title={"Edit"}
          key={(Math.random() + 1).toString(36).substring(7)}
        >
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <DeleteOutlined />
          </a>
        </Tooltip>
      ),
    },
  ];
  const data = Array.from({ length: 5 }, (_, index) => ({
    key: index.toString(),
    workflow: `Workflow ${index + 1}`,
    job: `Job ${index + 1}`,
    fileName: `File Name ${index + 1}`,
    file: `File ${index + 1}`,
    hive: `Hive ${index + 1}`,
  }));
  return (
    <div>
      <Row style={{ padding: "0px 20px", paddingTop: "20px" }}>
        <Col>Source File Type</Col>
      </Row>
      <Row style={{ padding: 20 }}>
        <Col span={14}>
          <Select
            style={{ width: "95%" }}
            className={dataModernizationCss.inputSelect}
            placeholder="Select File Type"
          >
            <Select.Option value="xml">.xml</Select.Option>
            <Select.Option value="csv">.csv</Select.Option>
          </Select>
        </Col>
        <Col span={4}>
          <Upload
            name="file"
            action="/upload"
            onChange={handleUpload}
            previewFile={false}
          >
            <Button
              className={dataModernizationCss.uploadBtn}
              icon={<UploadOutlined />}
            >
              Select to upload
            </Button>
          </Upload>
        </Col>
      </Row>
      <Row style={{ padding: 20 }}>
        <Col span={14}>
          <span className={dataModernizationCss.FileListItem}>
            <FileOutlined />
            Oozie (.xml)
          </span>
        </Col>
        <Col span={4}>
          <Upload
            name="file"
            action="/upload"
            onChange={handleUpload}
            previewFile={false}
          >
            <Button
              className={dataModernizationCss.uploadBtn}
              icon={<UploadOutlined />}
            >
              Add Additional Files
            </Button>
          </Upload>
        </Col>
      </Row>
      <Row style={{ padding: 20 }}>
        <Col span={18}>
          <Table
            style={{ fontSize: 12 }}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </Col>
      </Row>
      <Row style={{ padding: "8px 20px" }}>
        <Col span={4}>
          <Upload
            name="file"
            action="/upload"
            onChange={handleUpload}
            previewFile={false}
          >
            <Button
              className={dataModernizationCss.uploadBtn}
              icon={<UploadOutlined />}
            >
              Add Additional Files
            </Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};

export default ConnectNew;
