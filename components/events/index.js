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
  CloseOutlined,
  BellOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import moment from "moment";

import { loderShowHideAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { GETEVENT } from "../../network/apiConstants";
import DrawerView from "./drawerView";
const Event = ({ EventsCss }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [icon, setIcon] = useState(
    <BellOutlined style={{ fontSize: "1.5rem" }} />
  );

  const [open, setOpen] = useState(false);
  const [displayDiv, setDisplayDiv] = useState(true);
  const [eventData, setEventData] = useState([]);
  const [singleEventData, setSingleEventData] = useState({});

  const getData = async () => {
    const data = await fetch_retry_get(
      `${GETEVENT}pageNo/0/records/4?pastEvents=false`
    );
    if (data.success) {
      setEventData(
        data.data?.eventDetails?.sort(
          (date1, date2) =>
            moment(date1?.startDateTime).unix() -
            moment(date2?.startDateTime).unix()
        )
      );
      setSingleEventData(data.data?.eventDetails[0]);
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
        setEventData(
          eventDataArr.data?.eventDetails?.sort(
            (date1, date2) =>
              moment(date1?.startDateTime).unix() -
              moment(date2?.startDateTime).unix()
          )
        );
        if (
          eventDataArr.data?.eventDetails &&
          eventDataArr.data?.eventDetails.length
        ) {
          setSingleEventData(eventDataArr.data?.eventDetails[0]);
        }
      } else {
        setEventData([]);
      }
    }
  }, [status, eventDataArr]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setIcon(
      isExpanded ? (
        <BellOutlined style={{ fontSize: "1.5rem" }} />
      ) : (
        <CloseOutlined style={{ fontSize: "1.2rem" }} />
      )
    );
  };

  const getStartEndDate = (startDateTime, endDateTime) => {
    const start = moment(startDateTime).format("YYYY-MM-DD");
    const end = moment(endDateTime).format("YYYY-MM-DD");

    return (
      <>
        {start}
        {end && start != end && (
          <>
            <br />
            to
            <br />
            {end}
          </>
        )}
      </>
    );
  };

  const getSingleDate = () => {
    const start = moment(singleEventData?.startDateTime).format("YYYY-MM-DD");
    const end = moment(singleEventData?.endDateTime).format("YYYY-MM-DD");
    return (
      <>
        {start}
        {end && start != end && (
          <>
            &nbsp;&nbsp;
            {"-"}
            &nbsp; &nbsp;
            {end}
          </>
        )}
      </>
    );
  };

  const getSingleTime = () => {
    const start = moment(singleEventData?.startDateTime).format("HH:mm a");
    const end = moment(singleEventData?.endDateTime).format("HH:mm A");
    return (
      <>
        {start}
        {end && start != end && (
          <>
            &nbsp;&nbsp;
            {"-"}
            &nbsp; &nbsp;
            {end}
          </>
        )}
      </>
    );
  };

  return singleEventData && singleEventData.image ? (
    <>
      <div
        className={EventsCss.mainDiv}
        style={{
          background: `url("${
            singleEventData && singleEventData?.image
              ? singleEventData?.image
              : "/home/sequence.gif"
          }") no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <div style={{ backgroundColor: "rgb(0, 0, 0, 0.9)" }}>
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
            <DrawerView
              EventsCss={EventsCss}
              singleEventData={singleEventData}
              setOpen={setOpen}
              setDisplayDiv={setDisplayDiv}
            />
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

            <div className={EventsCss.relativeDiv}>
              <Space direction="horizontal" className={EventsCss.collapseDiv}>
                <div style={{ display: !isExpanded ? "none" : "block" }}>
                  <Space direction="horizontal">
                    <h3 style={{ borderRight: "1px solid #FFFFFF" }}>
                      <MailOutlined /> {singleEventData?.contactEmail}
                    </h3>
                    <h3>
                      <PhoneOutlined /> {singleEventData?.contactNumber}
                    </h3>
                  </Space>
                </div>
                <Button
                  className={EventsCss.collapsetBtn}
                  onClick={handleToggle}
                >
                  {icon}
                </Button>
              </Space>
              <Row className={EventsCss.infoRow}>
                <Col span={18} className={EventsCss.leftEvent}>
                  <Row>
                    <Col span={24} className={EventsCss.leftEventFirstDiv}>
                      <div>
                        <h1>{singleEventData?.eventHeading}</h1>
                        <p>{singleEventData?.content}</p>
                        <h6>
                          <CalendarOutlined /> &nbsp; {getSingleDate()}
                        </h6>
                        {/* <h6><CalendarOutlined /> &nbsp; 2023-08-01 - 2023-08-01</h6> */}
                        <h6>
                          <ClockCircleOutlined /> &nbsp; {getSingleTime()}{" "}
                        </h6>
                      </div>
                    </Col>
                    <Col span={24} className={EventsCss.leftEventSecondDiv}>
                      <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                          <Row className={EventsCss.leftEventBottom}>
                            <Col
                              span={6}
                              className={EventsCss.leftEventBottomBadge}
                            >
                              <Button
                                onClick={() => {
                                  setOpen(true);
                                }}
                                // danger
                              >
                                Reach Us At
                              </Button>
                            </Col>
                            <Col span={6} className={EventsCss.bottomText}>
                              <span>
                                <MailOutlined />
                                &nbsp;&nbsp; info@nucleusteq.com
                              </span>
                            </Col>
                            <Col span={1} className={EventsCss.bottomText}>
                              <Divider
                                type="vertical"
                                style={{
                                  backgroundColor: "#FFF",
                                  height: "4vh",
                                }}
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
                                style={{
                                  backgroundColor: "#FFF",
                                  height: "4vh",
                                }}
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
                <Col span={6}>
                  <Row style={{ height: "90vh" }}>
                    <Col span={24} className={EventsCss.rightIcon1}></Col>
                    <Col span={24}>
                      <Row
                        style={{
                          height: "70vh",
                          display: "flex",
                          alignItems: "center",
                          overflowY: "scroll",
                          backgroundColor: "rgb(0, 0, 0, 0.1)",
                        }}
                      >
                        <Col span={24}>
                          {[...eventData]?.map((e, i) => {
                            return (
                              <Row
                                onClick={() => {
                                  setSingleEventData(e);
                                }}
                              >
                                <Col
                                  span={14}
                                  className={`${EventsCss.rightTimelineName} ${
                                    e?.eventId === singleEventData?.eventId
                                      ? EventsCss.rightTimelineNameActive
                                      : ""
                                  }`}
                                >
                                  <div>{e?.eventHeading}</div>
                                </Col>
                                <Col
                                  span={10}
                                  className={`${EventsCss.rightTimelineDate} ${
                                    e?.eventId === singleEventData?.eventId
                                      ? EventsCss.rightTimelineDateActive
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`${EventsCss.dot} ${
                                      e?.eventId === singleEventData?.eventId
                                        ? EventsCss.dotActive
                                        : ""
                                    }`}
                                  ></div>
                                  <div
                                    className={`${EventsCss.dotLine} ${
                                      e?.eventId === singleEventData?.eventId
                                        ? EventsCss.dotLineActive
                                        : ""
                                    }`}
                                  ></div>

                                  <div>
                                    {e?.startDateTime && e?.endDateTime
                                      ? getStartEndDate(
                                          e?.startDateTime,
                                          e?.endDateTime
                                        )
                                      : null}
                                    {/* {e?.startDateTime
                                      ? moment(e?.startDateTime).format(
                                          "YYYY-MM-DD"
                                        )
                                      : null}
                                      {

                                      }
                                    <br /> to <br />
                                    {e?.endDateTime
                                      ? moment(e?.endDateTime).format(
                                          "YYYY-MM-DD"
                                        )
                                      : null} */}
                                  </div>
                                </Col>
                              </Row>
                            );
                          })}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={EventsCss.mainDivLoad}></div>
    </>
  );
};

export default Event;
