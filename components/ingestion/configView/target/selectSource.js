import { RollbackOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Image,
  Input,
  Row,
  Tooltip,
  message
} from "antd";
import React, { useEffect, useState } from "react";
import { fetch_retry_put } from "../../../../network/api-manager";
import { CREATENODE } from "../../../../network/apiConstants";
import { getFileName } from "../../../helper/getFileName";
const SelectSource = ({
  ingestionCss,
  setConnection,
  accountListArr,
  sourceData,
  setSourceData,
  nodeId,
  setConnectionId,
  setTableData,
  oldConnection,
  setOldConnection,
}) => {
  const [accountList, setAccountList] = useState([]);

  const filterData = (text) => {
    let dataArr = [];
    dataArr = accountListArr.filter((e) => {
      return e.title.toLowerCase().includes(text.toLowerCase());
    });
    setAccountList(dataArr);
  };

  const setConnectionData = async (e) => {
    const result = await fetch_retry_put(`${CREATENODE}/${nodeId}`, {
      ...sourceData,
      transformation_properties: [],
    });
    if (result.success) {
      setSourceData({
        ...sourceData,
        transformation_properties: [],
      });
      setTableData({});
      setConnectionId(null);
      setConnection(e);
    }
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
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "",
                alignItems: "center",
              }}
            >
              {oldConnection?.type && (
                <span
                  style={{
                    cursor: "pointer",
                    color: "#e74860",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    setConnection(oldConnection);
                    setOldConnection({});
                  }}
                >
                  <RollbackOutlined />
                  &nbsp; Cancel
                </span>
              )}
              {/* <span
                onClick={() => {
                  setConnection(oldConnection);
                  setOldConnection({});
                }}
                style={{ color: "#e74860", cursor: "pointer" }}
              >
                Cancel Changes
              </span> */}
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
                          setConnectionData(e);
                        }}
                      >
                        <Tooltip title={e.title} color="#0c3246">
                          <Image
                            alt={e.title}
                            src={`/db_icon/${getFileName(e.type)}.png`}
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
