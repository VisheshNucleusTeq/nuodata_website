import { Row, Col, Table, Space, Card, message, Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetch_retry_post } from "../../network/api-manager";
import { TRANSFORM } from "../../network/apiConstants";

const Transform = ({ dataModernizationCss, changeStep }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const connectDetails = useSelector(
    (state) => state.connectDetail.connectDetails
  );

  const getTransform = async () => {
    const data = await fetch_retry_post(
      `${TRANSFORM}${connectDetails.fileId}`
    );
    setLoading(false);
    if (data.success) {
      setData(data?.data);
    } else {
      message.error([data?.error]);
    }
  };

  useEffect(() => {
    getTransform();
  }, []);

  return (
    <Row className={dataModernizationCss.defineForm}>
        {/* {JSON.stringify(data)} */}
      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
      <Col
        xs={22}
        sm={22}
        md={22}
        lg={22}
        xl={22}
        xxl={22}
        className={dataModernizationCss.transform}
      >
        <h1>Congratulations !</h1>
        <h2>
          Transformation Completed for File <span>{connectDetails.fileName}</span>
        </h2>
        <h2>You saved 100 hours of manual effort</h2>
        <p>Transformed File Location - <a>http://samplelocation</a></p>
        <p>Download from server</p>
      </Col>
      <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
    </Row>
  );
};

export default Transform;
