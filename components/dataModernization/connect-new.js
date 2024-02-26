import {
  DeleteOutlined,
  FileOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Upload,
  message,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_retry_get,
  fetch_retry_post,
  fetch_retry_post_with_file,
  fetch_retry_put,
} from "../../network/api-manager";
import {
  ANALYZEHADOOPFILE,
  ANALYZEHIVEHDOOP,
  UPLOADHADOOPFILE,
} from "../../network/apiConstants";
import { SetTabTypeAction } from "../../Redux/action";

const ConnectNew = ({ dataModernizationCss }) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();
  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );
  const authData = JSON.parse(localStorage.getItem("authData"));
  const [isLoading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState("xml");
  const [workflowTableData, setWorkflowTableData] = useState([]);

  const beforeUpload = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const isValidExtension = selectedFileType.includes(fileExtension);
    if (!isValidExtension) {
      message.error("Invalid file type");
    }
    return isValidExtension;
  };
  const handleUpload = () => {};
  const customRequest = async (file, onSuccess, onError) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sourceFileType", file.name.split(".").pop().toLowerCase());

    const uploadFile = await fetch_retry_post_with_file(
      `${process.env.BASE_URL}${UPLOADHADOOPFILE}/project/${
        query.id ? query.id : projectDetails.projectId
      }/user/${authData.userId}`,
      formData
    );
    if (uploadFile.success) {
      setUploadedFile(uploadFile?.data);
      if (uploadFile?.data?.fileName.split(".").pop().toLowerCase() === "xml") {
        const analyseData = await fetch_retry_post(
          `${ANALYZEHADOOPFILE}${uploadFile?.data?.fileId}`
        );
        if (analyseData?.success) {
          const updatedData = analyseData?.data?.jobs?.map((job, index) => ({
            ...job,
            workFlowName: analyseData?.data?.workFlowName,
            key: index,
          }));
          setWorkflowTableData(updatedData);
        }
      }
      onSuccess("ok");
    } else {
      onError("ok");
    }
    setLoading(false);
  };

  const customRequestHive = async (file, onSuccess, onError, record) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sourceFileType", file.name.split(".").pop().toLowerCase());
    const uploadFile = await fetch_retry_post_with_file(
      `${process.env.BASE_URL}${UPLOADHADOOPFILE}/project/${
        query.id ? query.id : projectDetails.projectId
      }/user/${authData.userId}`,
      formData
    );
    if (uploadFile.success) {
      const recordData = { ...record, fileId: uploadFile?.data?.fileId };
      const index = workflowTableData.findIndex(
        (item) => item?.key === recordData?.key
      );

      if (index === -1) {
        setWorkflowTableData([...workflowTableData, recordData]);
      } else {
        const updatedData = [...workflowTableData];
        updatedData[index] = recordData;
        setWorkflowTableData(updatedData);
      }
      onSuccess("ok");
    } else {
      onError("ok");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const allFileIdsNotNull = workflowTableData.every(
      (item) => item.fileId !== null
    );
    const isOozieFileUploaded =
      uploadedFile?.fileName.split(".").pop().toLowerCase() === "xml";
    const isHiveFileUploaded =
      uploadedFile?.fileName.split(".").pop().toLowerCase() === "hive";

    if ((isOozieFileUploaded && allFileIdsNotNull) || isHiveFileUploaded) {
      let payloadData = {
        fileId: uploadedFile.fileId,
        fileName: uploadedFile.fileName,
        workFlowAnalysisDto: {},
      };
      if (isOozieFileUploaded) {
        const workflowName = workflowTableData[0].workFlowName;
        let hiveFilesData = workflowTableData.map(
          ({ jobName, fileName, fileType, fileId }) => ({
            jobName,
            fileName,
            fileType,
            fileId,
          })
        );
        payloadData.workFlowAnalysisDto = {
          workFlowName: workflowName,
          jobs: [...hiveFilesData],
        };
      }
      const response = await fetch_retry_put(ANALYZEHADOOPFILE, payloadData);
      if (response.success) {
        message.success(response?.data?.message);
        const analyseResponse = fetch_retry_post(
          `${ANALYZEHIVEHDOOP}${payloadData.fileId}`
        );
        console.log(analyseResponse);
        // dispatch(SetTabTypeAction("Analyze"));
      }
    } else {
      message.error("please check all details");
    }
  };
  const columns = [
    {
      title: "Workflow",
      dataIndex: "workFlowName",
      key: "workFlowName",
    },
    {
      title: "Job",
      dataIndex: "jobName",
      key: "jobName",
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
    },

    {
      title: "Upload",
      dataIndex: "upload",
      key: "upload",
      render: (_, record) => (
        <Upload
          name="file"
          customRequest={({ file, onSuccess, onError }) =>
            customRequestHive(file, onSuccess, onError, record)
          }
          previewFile={false}
        >
          <Button
            className={dataModernizationCss.uploadBtn}
            icon={<UploadOutlined />}
          >
            {record?.fileId === null ? "Upload" : "Uploaded"}
          </Button>
        </Upload>
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
            value={selectedFileType}
            onChange={(value) => {
              setSelectedFileType(value);
            }}
          >
            <Select.Option value="xml">Oozie(.XML)</Select.Option>
            <Select.Option value="hive">hive</Select.Option>
          </Select>
        </Col>
        <Col span={4}>
          <Upload
            name="file"
            action="/upload"
            customRequest={({ file, onSuccess, onError }) =>
              customRequest(file, onSuccess, onError)
            }
            showUploadList={false}
            beforeUpload={beforeUpload}
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
      {uploadedFile != null && (
        <Row style={{ padding: 20 }}>
          <Col span={14}>
            <span className={dataModernizationCss.FileListItem}>
              <FileOutlined />
              {uploadedFile?.fileName}
            </span>
          </Col>
          <Col span={4}>
            <Upload
              name="file"
              action="/upload"
              onChange={handleUpload}
              previewFile={false}
              disabled
            >
              <Button
                className={dataModernizationCss.uploadBtn}
                icon={<UploadOutlined />}
                disabled
              >
                Add Additional Files
              </Button>
            </Upload>
          </Col>
        </Row>
      )}
      {workflowTableData.length > 0 && (
        <>
          <Row style={{ padding: 20 }}>
            <Col span={18}>
              <Table
                style={{ fontSize: 12 }}
                columns={columns}
                dataSource={workflowTableData}
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
        </>
      )}
      <Row className={dataModernizationCss.generalLastDiv}>
        <Col span={3}>
          <Space>
            <Button
              className={dataModernizationCss.cancelBtn}
              onClick={() => {
                router.push(`/dashboard`);
              }}
            >
              exit
            </Button>
            <Button
              onClick={handleSubmit}
              className={dataModernizationCss.submitBtn}
            >
              Next
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ConnectNew;
