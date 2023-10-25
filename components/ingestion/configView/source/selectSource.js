import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Input,
  Button,
  Card,
  Tooltip,
  Image,
  Modal,
  message,
} from "antd";
import { INGESTIONTEMPLATES } from "../../../../network/apiConstants";
import { fetch_retry_get } from "../../../../network/api-manager";

const SelectSource = ({ ingestionCss, setConnection, setActiveKey }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [connection, setConnection] = useState({});
  const [accountList, setAccountList] = useState([]);
  const [accountListArr, setAccountListArr] = useState([]);

  const getRecord = async () => {
    const result = await fetch_retry_get(INGESTIONTEMPLATES);
    if (result.success) {
      setAccountList(result.data);
      setAccountListArr(result.data);
    } else {
      message.error(result.error);
    }
  };

  const filterData = (text) => {
    console.log(accountListArr);
    let dataArr = [];
    dataArr = accountListArr.filter((e) => {
      return e.title.toLowerCase().includes(text.toLowerCase());
    });
    setAccountList(dataArr);
  };

  useEffect(() => {
    getRecord();
  }, []);

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
              accountList.map((e) => {
                return (
                  <Col span={4}>
                    <div
                      className={
                        e?.isDisable
                          ? ingestionCss.notClickDiv
                          : ingestionCss.clickDiv
                      }
                    >
                      <div
                        onClick={() => {
                          setConnection(e);
                          setActiveKey("schema_tab");
                        }}
                      >
                        <Tooltip title={e.title} color="#0c3246">
                          <Image
                            alt={e.title}
                            src={e.logo_url}
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
