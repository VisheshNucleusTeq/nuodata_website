import { Row, Col, Image } from "antd";
import HowItWorkCss from "../../styles/HowItWork.module.css";

export default function RightTextComp({
  iconSrc,
  title,
  description,
  pipelineImgSrc,
  graphSrc,
  bgColor1,
  bgColor2,
}) {
  return (
    <>
      <div
        className={HowItWorkCss.leftTxtMainDiv}
        style={{
          background: `linear-gradient(-180deg, ${bgColor1}  30%, ${bgColor2}  100%)`,
        }}
      >
        <Row
          justify={"center"}
          align={"middle"}
          className={HowItWorkCss.leftTxtRow}
        >
          <Col xs={22} sm={22} md={10} align={"center"}>
            <iframe src={graphSrc} className={HowItWorkCss.graphImg} />
          </Col>
          <Col xs={22} sm={22} md={2} align={"center"}>
            <Image
              preview={false}
              src={pipelineImgSrc}
              className={HowItWorkCss.pipelineImg}
            />
          </Col>
          <Col xs={22} sm={22} md={10} className={HowItWorkCss.leftTxtCol}>
            <iframe src={iconSrc} className={HowItWorkCss.iconImg} />
            <h1>{title}</h1>
            <p>{description}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
