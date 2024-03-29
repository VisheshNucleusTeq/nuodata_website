import { DownloadOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetAnalyzeDetailAction,
  SetTabTypeAction,
  setOpenDetails,
} from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { DOWNLOADZIP, GETANALYZEDATA } from "../../network/apiConstants";
import AnalyzeDetail from "./analyzeDetail";

const TransformDetails = ({ dataModernizationCss, setIsDetails }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const analyzeDetail = useSelector(
    (state) => state.analyzeDetail.analyzeDetail
  );

  const projectTransformDetails = useSelector(
    (state) => state.projectTransformDetails.projectTransformDetails
  );

  const getAnalyzeData = async (analyzeDetailsId, version) => {
    const data = await fetch_retry_get(
      `${GETANALYZEDATA}${analyzeDetailsId}?version=${version}`
    );
    if (data.success) {
      dispatch(SetAnalyzeDetailAction(data?.data));
    }
  };

  const downloadFile = async (url) => {
    const response = await fetch_retry_get(url, { responseType: "blob" });
    const fileNameData = response?.headers["content-disposition"];
    const filename = fileNameData
      .split(";")
      .find((n) => n.includes("fileName=") || n.includes("filename="))
      .replace('fileName="', "")
      .replace("filename=", "")
      .replace('"', "")
      .trim();

    const href = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  useEffect(() => {
    if (
      projectTransformDetails &&
      projectTransformDetails.analyzeDetailsId &&
      projectTransformDetails.version
    ) {
      getAnalyzeData(
        projectTransformDetails?.analyzeDetailsId,
        projectTransformDetails?.version
      );
    }
  }, []);

  return (
    <>
      <Badge
        style={{ cursor: "pointer", marginTop: "2vh", marginBottom: "-1vh" }}
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
            <a className={dataModernizationCss.downloadIcon}>
              <span
                onClick={() => {
                  downloadFile(
                    `${process.env.BASE_URL}${DOWNLOADZIP}${analyzeDetail?.fileId}?type=xml&workflowId=0`
                  );
                }}
              >
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
            of manual effort
          </h2>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <div className={dataModernizationCss.analyzeMain}>
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
      <div
        className={dataModernizationCss.nextExitBtn}
        style={{ marginTop: "2%" }}
      >
        <>
          <Button
            type="primary"
            danger
            className={dataModernizationCss.nextBtn}
            htmlType="submit"
            onClick={() => {
              dispatch(
                setOpenDetails({
                  detailId: projectTransformDetails?.analyzeDetailsId,
                })
              );
              dispatch(SetTabTypeAction("Validate"));
            }}
          >
            Validate
          </Button>
          <Button
            type="primary"
            danger
            className={dataModernizationCss.exitBtn}
            onClick={() => {
              router.push(`/dashboard`);
            }}
          >
            Exit
          </Button>
        </>
      </div>
    </>
  );
};

export default TransformDetails;
