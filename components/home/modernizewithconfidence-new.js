import { Col, Row, Button, Image } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

export default function ModernizeWithConfidenceNew({ HomeCss }) {

    const [modernizeData, setModernizeData] = useState([
        {text : "6-10x faster & 100% accurate conversion", cls : HomeCss.textPos1},
        {text : "Data driven enterprise enabled through modern data lake", cls : HomeCss.textPos2},
        {text : "Certified data for enterprise consumption", cls : HomeCss.textPos3},
        {text : "No redundancies", cls : HomeCss.textPos4},
        {text : "Single version of truth", cls : HomeCss.textPos5},
        {text : "Enabling federation of data through self services",cls : HomeCss.textPos6},
      ]);

    return (
        <div className={HomeCss.ECmainNew}>
        <div className={HomeCss.ECmainNewChild}>
        {modernizeData.map((e, i) => {
          return (
            <Row className={`${HomeCss.ECmainNewRow} ${e.cls}`} >
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
                <Col
                  xs={10}
                  sm={10}
                  md={10}
                  lg={10}
                  xl={10}
                  xxl={10}
                >
                  <h1>{e.text}</h1>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2} />
              </Row>
          );
        })}
        </div>
        </div>
    )
}