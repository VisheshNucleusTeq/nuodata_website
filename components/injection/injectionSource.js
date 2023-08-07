import React from "react";
import { Col, Row, Steps } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import injectionSourceCss from "../../styles/injectionSource.module.css";

const InjectionSource = () => {
  return (
    <div className={injectionSourceCss.main}>
      <h1>New Pipeline- Editable Field</h1>
      <Row className={injectionSourceCss.dashedLines}>
        <Col span={24}>
          <Row align={"space-between"}>
            {Array(5)
              .fill(undefined)
              .map(() => {
                return (
                  <Col
                    span={4}
                    style={{
                      border: "1px solid red",
                      height: "8vh",
                      borderRadius: "10px",
                    }}
                  >
                    111
                  </Col>
                );
              })}
          </Row>

          {/* <div style={{width : "100vw"}}>
            {
                Array(5).fill(undefined).map(()=>{
                    return <div style={{width : "15vw"}}>sdfsdfsdff</div>
                })
            }
          </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default InjectionSource;
