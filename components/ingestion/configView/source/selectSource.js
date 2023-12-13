import {
  Card,
  Col,
  Image,
  Input,
  Row,
  Tooltip
} from "antd";
import React, { useEffect, useState } from "react";

const SelectSource = ({ ingestionCss, setConnection, accountListArr }) => {
  const [accountList, setAccountList] = useState([]);

  const filterData = (text) => {
    let dataArr = [];
    dataArr = accountListArr.filter((e) => {
      return e.title.toLowerCase().includes(text.toLowerCase());
    });
    setAccountList(dataArr);
  };

  useEffect(() => {
    setAccountList(accountListArr);
  }, [accountListArr]);

  return (
    <>
      <div style={{ marginTop: "2vw" }}>
        <Card className="demoCard">
          <Row>
            <Col span={12} className={ingestionCss.sourceHeader}>
              <Input
                className="input"
                placeholder="Search.."
                onKeyUp={(e) => {
                  filterData(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row align={"centerr"}>
            {accountList &&
              accountList.length > 0 &&
              accountList.map((e, i) => {
                return (
                  <Col span={4} key={"sourceCol" + i}>
                    <div
                      className={
                        e?.isDisable
                          ? ingestionCss.notClickDiv
                          : ingestionCss.clickDiv
                      }
                      key={"sourceDiv" + i}
                    >
                      <div
                        onClick={() => {
                          setConnection(e);
                        }}
                      >
                        <Tooltip title={e.title} color="#0c3246">
                          <Image
                            alt={e.title}
                            src={`/db_icon/${e.title}.png`}
                            preview={false}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                );
              })}
            {accountList.length <= 0 && (
              <Col span={24} style={{ marginTop: "4vw" }}>
                <h3 style={{ textAlign: "center" }}>No record found</h3>
              </Col>
            )}
          </Row>
        </Card>
      </div>
    </>
  );
};

export default SelectSource;

// import React from 'react';

// const SelectSource = ({ingestionCss}) => {
//     return (
//         <div>
//             SelectSource
//         </div>
//     );
// };

// export default SelectSource;
