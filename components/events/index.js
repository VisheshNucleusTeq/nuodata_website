import {
  Col,
  Row,
  Badge,
  Button,
  Divider,
  Drawer,
  Space,
  Form,
  Input,
  Select,
  Image,
} from "antd";
import React, { useState, useEffect } from "react";
import Header from "../common/header";
import {
  MailOutlined,
  MobileOutlined,
  GlobalOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { loderShowHideAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { GETEVENT } from "../../network/apiConstants";
import DrawerView from "./drawerView";
const Event = ({ EventsCss }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [displayDiv, setDisplayDiv] = useState(true);
  const [eventData, setEventData] = useState([]);

  const getData = async () => {
    const data = await fetch_retry_get(
      `${GETEVENT}pageNo/0/records/2?pastEvents=false`
    );
    if (data.success) {
      setEventData(data.data?.eventDetails);
      return data;
    } else {
      setEventData([]);
      return [];
    }
  };

  const {
    status,
    data: eventDataArr,
    refetch,
  } = useQuery(["EVENT_DATA_HOME"], () => getData(), {
    refetchOnWindowFocus: false,
    enabled: true,
    staleTime: 10 * (60 * 1000),
  });

  useEffect(() => {
    getData();
    dispatch(loderShowHideAction(true));
    if (status === "success") {
      dispatch(loderShowHideAction(false));
      if (eventDataArr?.success) {
        setEventData(eventDataArr.data?.eventDetails);
      } else {
        setEventData([]);
      }
    }
  }, [status, eventDataArr]);

  const onFinish = async (payload) => {};

  return (
    <div
      className={EventsCss.mainDiv}
      // style={{
      //   background: `url("${
      //     eventData && eventData && eventData.length ? eventData[1].image : "/home/sequence.gif"
      //   }") no-repeat center center`,
      //   backgroundSize : "cover",
      // }}
    >
      <Drawer
        contentWrapperStyle={{
          borderRight: ".5vw solid #e74860",
          borderTop: ".5vw solid #e74860",
          borderRadius: "0 204px 0 0",
          backgroundColor: "transparent",
        }}
        height={"90vh"}
        placement="lefft"
        width={500}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        className={EventsCss.drawer}
        closeIcon={false}
        destroyOnClose
      >
        <DrawerView EventsCss={EventsCss}/>
      </Drawer>

      <Header />
      <div className={EventsCss.detailsDiv}>
        <div
          className={`${
            open ? EventsCss.modelButonOpen : EventsCss.modelButonClose
          } ${
            displayDiv ? EventsCss.displayDivShow : EventsCss.displayDivHide
          }`}
          onClick={() => {
            setDisplayDiv(false);
            setTimeout(() => {
              setDisplayDiv(true);
            }, 1000);
            setOpen(!open);
          }}
        >
          <div>
            <span>{open ? "Close" : "Open"}</span>
            <br />
            <p
              style={{
                textAlign: "center",
                lineHeight: "0",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              {open ? <LeftOutlined /> : <RightOutlined />}
            </p>
          </div>
        </div>

        <Row className={EventsCss.infoRow}>
          <Col span={19} className={EventsCss.leftEvent}>
            <Row>
              <Col span={24} className={EventsCss.leftEventFirstDiv}>
                <div>
                  <h1>Big Data Summit</h1>
                  <p>
                    Watch all the keynotes, 250+ breakouts and more from the
                    global event for the data and AI community — available until
                    July 14.
                  </p>
                </div>
              </Col>
              <Col span={24} className={EventsCss.leftEventSecondDiv}>
                <Row>
                  <Col span={2}></Col>
                  <Col span={20}>
                    <Row className={EventsCss.leftEventBottom}>
                      <Col span={6} className={EventsCss.leftEventBottomBadge}>
                        <Button
                          onClick={() => {
                            setOpen(true);
                          }}
                          danger
                        >
                          Reach Us At
                        </Button>
                      </Col>
                      <Col span={6} className={EventsCss.bottomText}>
                        <span>
                          <MailOutlined />
                          &nbsp;&nbsp;info@nucleusteq.com
                        </span>
                      </Col>
                      <Col span={1} className={EventsCss.bottomText}>
                        <Divider
                          type="vertical"
                          style={{ backgroundColor: "#FFF", height: "4vh" }}
                        />
                      </Col>
                      <Col span={5} className={EventsCss.bottomText}>
                        <span>
                          <MobileOutlined />
                          &nbsp;&nbsp;+91 9876543210
                        </span>
                      </Col>
                      <Col span={1} className={EventsCss.bottomText}>
                        <Divider
                          type="vertical"
                          style={{ backgroundColor: "#FFF", height: "4vh" }}
                        />
                      </Col>
                      <Col span={5} className={EventsCss.bottomText}>
                        <span>
                          <GlobalOutlined />
                          &nbsp;&nbsp;nucleusteq.com
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={5}>

            {
              eventData?.map((e, i)=>{
                return <p style={{color :"red"}}>{e?.eventId}</p>
              })
            }
            {/* <Timeline
              style={{
                border: "1px solid red",
                width: "100%",
              }}
              mode={"left"}
            >
              {Array(3)
                .fill(undefined)
                .map(() => {
                  return (
                    <Timeline.Item
                      key={(Math.random() + 1).toString(36).substring(7)}
                      style={{ height: 80 / 3 + "vh", fontSize: "16px" }}
                      label={<>demo item</>}
                    >
                     <p> 22-05-19995 <br/> to <br/>22-05-19995</p>
                    </Timeline.Item>
                  );
                })}
            </Timeline> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Event;
