import { Row, Col, Table, Space, Card, message, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetch_retry_post, fetch_retry_get } from "../../network/api-manager";
import { TRANSFORM, DOWNLOADFILE, DESIGN } from "../../network/apiConstants";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import AnalyzeDetailPopup from "./analyzeDetailPopup";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Transform = ({ dataModernizationCss, changeStep }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [outputFiles, setOutputFiles] = useState([]);
  const [modalData, setModalData] = useState();
  const [outputFileId, setOutputFileId] = useState();
  const [open, setOpen] = useState(false);

  const analyzeDetail = useSelector(
    (state) => state.analyzeDetail.analyzeDetail
  );

  const getTransform = async () => {
    const data = await fetch_retry_post(
      `${TRANSFORM}1` //${connectDetails.fileId}`
    );
    setLoading(false);
    if (data.success) {
      setData(data?.data);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    setOutputFiles(analyzeDetail?.outputFiles);
  }, [analyzeDetail]);

  const getProjectData = async (fileId) => {
    const data = await fetch_retry_get(`${DESIGN}${fileId}`);
    if (data.success) return data.data;
    // setData(data);
    // console.log(data);
  };

  const getDataCall = async (id) => {
    let datar = await getProjectData(id);
    setModalData(datar);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  return (
    <Row className={dataModernizationCss.defineForm}>
      {/* <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} /> */}
      <Col
        xs={23}
        sm={23}
        md={23}
        lg={23}
        xl={23}
        xxl={23}
        className={dataModernizationCss.transform}
      >
        <h1>Congratulations !</h1>
        <h2>
          Transformation Completed for File{" "}
          <span>{analyzeDetail?.fileName}</span>
        </h2>
        <h2>
          You saved <span>{analyzeDetail?.complexity?.hoursSaved}</span> hours
          of manual effort
        </h2>
      </Col>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
        <div className={dataModernizationCss.analyzeMain}>
          <Modal
            // title="Modal 1000px width"
            destroyOnClose
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={"100vw"}
          >
            {/* <p>{ Date.now() }</p> */}
            <AnalyzeDetailPopup outputFileId={outputFileId} data={modalData} />
          </Modal>

          <Table
            pagination={false}
            // className="demo"
            columns={[
              {
                title: "",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "",
                key: "action",
                render: (_, record) => {
                  if (record.fileType == "graph_src") {
                    return (
                      <a
                        onClick={async () => {
                          // setOutputFileId(record.outputFileId);
                          getDataCall(record.outputFileId);
                        }}
                      >
                        <Space size="middle" style={{ cursor: "pointer" }}>
                          <EyeOutlined /> View
                        </Space>
                      </a>
                    );
                  } else {
                    return (
                      //http://3.109.185.25:8080/core/v1/download/155
                      <a
                        target={"_blank"}
                        href={`${DOWNLOADFILE}${record.outputFileId}`}
                      >
                        <Space size="middle" style={{ cursor: "pointer" }}>
                          <DownloadOutlined /> Download
                        </Space>
                      </a>
                    );
                  }
                },
              },
            ]}
            dataSource={analyzeDetail?.outputFiles}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Transform;
