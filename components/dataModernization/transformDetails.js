import { Row, Col, Table, Space, Card, message, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetch_retry_post, fetch_retry_get } from "../../network/api-manager";
import {
  GETANALYZEDATA,
  DOWNLOADFILE,
  DESIGN,
} from "../../network/apiConstants";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import AnalyzeDetailPopup from "./analyzeDetailPopup";
import { SetAnalyzeDetailAction } from "../../Redux/action";

const TransformDetails = ({ dataModernizationCss, changeStep }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [outputFiles, setOutputFiles] = useState([]);
  const [modalData, setModalData] = useState();
  const [outputFileId, setOutputFileId] = useState();
  const [open, setOpen] = useState(false);

  const analyzeDetail = useSelector(
    (state) => state.analyzeDetail.analyzeDetail
  );

  const projectTransformDetails = useSelector(
    (state) => state.projectTransformDetails.projectTransformDetails
  );
      
    

  const getAnalyzeData = async (analyzeDetailsId) => {
    setLoading(true);
    const data = await fetch_retry_get(
      `${GETANALYZEDATA}${analyzeDetailsId}?version=1`
    );
    setLoading(false);
    if (data.success) {
      dispatch(SetAnalyzeDetailAction(data?.data));
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    setOutputFiles(analyzeDetail?.outputFiles);

    if (projectTransformDetails && projectTransformDetails.analyzeDetailsId) {
      getAnalyzeData(projectTransformDetails.analyzeDetailsId);
    }
  }, [analyzeDetail]);

  const getProjectData = async (fileId) => {
    const data = await fetch_retry_get(`${DESIGN}${fileId}`);
    if (data.success) return data.data;
  };

  const getDataCall = async (id) => {
    let datar = await getProjectData(id);
    setModalData(datar);
    setTimeout(() => {
      setOpen(true);
    }, 10);
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
          You saved{" "}
          <span>
            {parseFloat(analyzeDetail?.complexity?.hoursSaved).toFixed(2)}{" "}
            {parseFloat(analyzeDetail?.complexity?.hoursSaved).toFixed(2) > 1
              ? "Hours"
              : "hour"}
          </span>
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

export default TransformDetails;
