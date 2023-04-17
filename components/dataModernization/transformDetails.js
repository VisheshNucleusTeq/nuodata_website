import { Row, Col, message, Modal, Badge } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetch_retry_get } from "../../network/api-manager";
import { GETANALYZEDATA, DOWNLOADZIP } from "../../network/apiConstants";
import { DownloadOutlined } from "@ant-design/icons";
import AnalyzeDetailPopup from "./graphView/analyzeDetailPopup";
import { SetAnalyzeDetailAction } from "../../Redux/action";
import AnalyzeDetail from "./analyzeDetail";

const TransformDetails = ({ dataModernizationCss,setIsDetails }) => {
  const dispatch = useDispatch();

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

  const getAnalyzeData = async (analyzeDetailsId, version) => {
    setLoading(true);
    const data = await fetch_retry_get(
      `${GETANALYZEDATA}${analyzeDetailsId}?version=${version}`
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
    if (
      projectTransformDetails &&
      projectTransformDetails.analyzeDetailsId &&
      projectTransformDetails.version
    ) {
      alert(1);
      getAnalyzeData(
        projectTransformDetails?.analyzeDetailsId,
        projectTransformDetails?.version
      );
    }
  }, []);

  return (
    <>
      <Badge
        style={{ cursor: "pointer", marginTop : "2vh", marginBottom : "-1vh" }}
        count={"< Go Back"}
        color="#0c3246"
        onClick={() => {
          setIsDetails(false);
        }}
      />
      <Row className={dataModernizationCss.defineForm}>
        <Col
          xs={23}
          sm={23}
          md={23}
          lg={23}
          xl={23}
          xxl={23}
          className={dataModernizationCss.transform}
        >
          <h1>
            Congratulations !
            <a
              className={dataModernizationCss.downloadIcon}
              href={`${process.env.BASE_URL}${DOWNLOADZIP}${analyzeDetail?.fileId}?type=xml&workflowId=0`}
            >
              <span>
                <DownloadOutlined /> Download
              </span>
            </a>
          </h1>
          <h2>
            Transformation Completed for File
            <span>
              {analyzeDetail?.fileName ? analyzeDetail?.fileName : "--"}
            </span>
          </h2>
          <h2>
            You saved
            <span>
              {" "}
              {analyzeDetail?.complexity?.hoursSaved
                ? parseFloat(analyzeDetail?.complexity?.hoursSaved).toFixed(2)
                : "--"}{" "}
              {parseFloat(analyzeDetail?.complexity?.hoursSaved).toFixed(2) > 1
                ? "Hours"
                : "hour"}
            </span>
            of manual effort {projectTransformDetails?.isUserAction + ""}
          </h2>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={dataModernizationCss.analyzeMain}>
            <Modal
              destroyOnClose
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={"100vw"}
            >
              <AnalyzeDetailPopup
                outputFileId={outputFileId}
                data={modalData}
                showPopUp={true}
              />
            </Modal>
            <AnalyzeDetail
              analyzeDetailsId={projectTransformDetails?.analyzeDetailsId}
              dataModernizationCss={dataModernizationCss}
              showTop={false}
              showPopUp={projectTransformDetails?.isUserAction}
              isUserAction={projectTransformDetails?.isUserAction}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TransformDetails;