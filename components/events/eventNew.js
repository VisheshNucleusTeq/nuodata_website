import {
  Col,
  Row,
  Button,
  Divider,
  Drawer,
  Space,
  Modal,
  message,
  Image,
} from "antd";
import React, { useState, useEffect } from "react";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/router";

import Header from "../common/header";
import {
  MailOutlined,
  MobileOutlined,
  GlobalOutlined,
  // RightOutlined,
  // LeftOutlined,
  CloseOutlined,
  BellOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import moment from "moment";

import { loderShowHideAction } from "../../Redux/action";
import { fetch_retry_get } from "../../network/api-manager";
import { GETEVENT } from "../../network/apiConstants";
import DrawerView from "./drawerView";
const EventNew = ({ EventsCss }) => {
  const router = useRouter();
  const { pathname, query, isReady } = useRouter();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [icon, setIcon] = useState(
    <BellOutlined style={{ fontSize: "1.5rem" }} />
  );

  const [open, setOpen] = useState(false);
  const [displayDiv, setDisplayDiv] = useState(true);
  const [eventData, setEventData] = useState([]);
  const [singleEventData, setSingleEventData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("https://nuodata.io/");
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getData = async () => {
    const data = await fetch_retry_get(
      `${GETEVENT}pageNo/0/records/40?pastEvents=false`
    );
    if (data.success) {
      if (data.data?.eventDetails && data.data?.eventDetails.length) {
        return data;
      } else {
        setEventData([]);
        router.push("/");
      }
    } else {
      setEventData([]);
      router.push("/");
    }
  };

  const { status, data: eventDataArr } = useQuery(
    ["EVENT_DATA_HOME"],
    () => getData(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
      staleTime: 10 * (60 * 1000),
    }
  );

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
            &nbsp;
            <span style={{ color: "#e74860" }}>{"-"}</span>
            &nbsp;
            {end}
          </>
        )}
      </>
    );
  };

  const getSingleTime = () => {
    const start = moment(singleEventData?.startDateTime).format("HH:mm A");
    const end = moment(singleEventData?.endDateTime).format("HH:mm A");
    return (
      <>
        {start}
        {end && (
          <>
            &nbsp;
            <span style={{ color: "#e74860" }}>{"-"}</span>
            &nbsp;
            {end}
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    setPageUrl(
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin + pathname
        : "nuodata.io"
    );
  }, [typeof window === "undefined"]);

  useEffect(() => {
    if (query.eventId && eventData && eventData.length) {
      const eventId = query?.eventId;
      if (eventId) {
        const findIndex = eventData.findIndex(
          (e) => Number(e?.eventId) === Number(eventId)
        );

        if (findIndex >= 0) {
          setSelectedIndex(findIndex);
          setSingleEventData(eventData[findIndex]);
          setTimeout(() => {
            const element = document.getElementById("eventView" + eventId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 1000);
        } else {
          message.info({
            content: "Link expired.",
            key: "EVENTERROR",
          });
          setEventData([]);
          router.push("/");
        }
      } else {
        setSingleEventData(eventData[0]);
      }
    } else {
      if (eventData && eventData.length) {
        setSingleEventData(eventData[0]);
      }
    }
  }, [isReady, eventData]);

  useEffect(() => {
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
      } else {
        setEventData([]);
        router.push("/");
      }
    }
  }, [status, eventDataArr]);

  useEffect(() => {
    const updateDimension = async () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", updateDimension);
    updateDimension();
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return singleEventData && singleEventData.imagePublicURL ? (
    <>
      <Modal
        style={{ zIndex: 999999 }}
        // width={"45vw"}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{
          style: { backgroundColor: "#0c3246", color: "#FFF", display: "none" },
        }}
        className={EventsCss.registerModalEvent}
        centered
      >
        <DrawerView
          EventsCss={EventsCss}
          singleEventData={singleEventData}
          setOpen={setOpen}
          setDisplayDiv={setDisplayDiv}
          setIsModalOpen={setIsModalOpen}
          width={"100%"}
        />
      </Modal>
      <div
        className={EventsCss.mainDiv}
        style={{
          background: `url("${
            singleEventData && singleEventData?.imagePublicURL
              ? singleEventData?.imagePublicURL
              : "/home/sequence.gif"
          }") no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <div style={{ backgroundColor: "rgb(0, 0, 0, 0.8)" }}>
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
            {/* <div
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
            </div> */}

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
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={18}
                  xxl={18}
                  className={EventsCss.leftEvent}
                >
                  <Row>
                    <Col span={24} className={EventsCss.leftEventFirstDiv}>
                      <div>
                        <h1>{singleEventData?.eventHeading}</h1>
                        <div className={EventsCss.imageCss}>
                          <Image
                            src={singleEventData?.imagePublicURL}
                            preview={false}
                          />
                        </div>
                        {eventData.length > 1 && innerWidth <= 1200 ? (
                          <Row className={EventsCss.nextPrevBtn}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={0} xxl={0}>
                              <Space>
                                <Button
                                  className={`${
                                    eventData[0].eventId ===
                                    singleEventData.eventId
                                      ? EventsCss.disabledBtn
                                      : null
                                  }`}
                                  onClick={() => {
                                    if (
                                      eventData[0].eventId !=
                                      singleEventData.eventId
                                    ) {
                                      setSelectedIndex(selectedIndex - 1);
                                      setSingleEventData(
                                        eventData[selectedIndex - 1]
                                      );
                                    }
                                  }}
                                >
                                  <ArrowLeftOutlined /> Prev
                                </Button>
                                {/* {selectedIndex} */}
                                <Button
                                  className={`${
                                    eventData[eventData.length - 1].eventId ===
                                    singleEventData.eventId
                                      ? EventsCss.disabledBtn
                                      : null
                                  }`}
                                  onClick={() => {
                                    if (
                                      eventData[eventData.length - 1].eventId !=
                                      singleEventData.eventId
                                    ) {
                                      setSelectedIndex(selectedIndex + 1);
                                      setSingleEventData(
                                        eventData[selectedIndex + 1]
                                      );
                                    }
                                  }}
                                >
                                  Next <ArrowRightOutlined />
                                </Button>
                              </Space>
                            </Col>
                          </Row>
                        ) : null}

                        <p></p>
                        <Row>
                          <Col span={24}>
                            <h6>
                              <CalendarOutlined /> &nbsp; {getSingleDate()}{" "}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <p className={EventsCss.lineChange}></p>
                              <ClockCircleOutlined /> &nbsp; {getSingleTime()}{" "}
                            </h6>
                          </Col>
                        </Row>
                        <p></p>
                        <p
                          style={{
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {singleEventData?.content}
                        </p>
                      </div>
                    </Col>

                    <Col span={24} className={EventsCss.leftEventSecondDiv}>
                      <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                          <div className={EventsCss.registerNowBtn}>
                            <Button
                              onClick={() => {
                                setIsModalOpen(true);
                              }}
                            >
                              {singleEventData?.buttonText ? singleEventData?.buttonText : "Register Now"}
                            </Button>
                            &nbsp; &nbsp;
                            <RWebShare
                              data={{
                                text: singleEventData?.eventHeading,
                                url:
                                  pageUrl +
                                  "?eventId=" +
                                  singleEventData?.eventId,
                                title: "NuoData",
                              }}
                              onClick={() =>
                                console.log("shared successfully!")
                              }
                            >
                              <Button>
                                Share <ShareAltOutlined />
                              </Button>
                            </RWebShare>
                          </div>

                          <Row align={"center"}>
                            <Col xs={16} sm={12} md={12} lg={12} xl={6} xxl={6}>
                              <div
                                className={`${EventsCss.connectView1} ${EventsCss.leftEventBottomBadge}`}
                              >
                                <Button>Reach Us At</Button>
                              </div>
                            </Col>

                            <Col
                              xs={24}
                              sm={24}
                              md={24}
                              lg={24}
                              xl={0}
                              xxl={0}
                            />

                            <Col xs={20} sm={16} md={16} lg={6} xl={6} xxl={6}>
                              <div className={EventsCss.connectView2}>
                                <span>
                                  <MailOutlined />
                                  &nbsp;&nbsp; info@nucleusteq.com
                                </span>
                              </div>
                            </Col>
                            <Col
                              xs={0}
                              sm={0}
                              md={24}
                              lg={1}
                              xl={1}
                              xxl={1}
                              className={EventsCss.bottomText}
                            >
                              {innerWidth > 992 ? (
                                <span style={{ fontSize: "4vh" }}>|</span>
                              ) : null}
                            </Col>
                            <Col xs={20} sm={10} md={10} lg={6} xl={5} xxl={5}>
                              <div className={EventsCss.connectView3}>
                                <span>
                                  <MobileOutlined />
                                  &nbsp;&nbsp;+91 9876543210
                                </span>
                              </div>
                            </Col>
                            <Col
                              xs={0}
                              sm={1}
                              md={1}
                              lg={1}
                              xl={1}
                              xxl={1}
                              className={EventsCss.bottomText}
                            >
                              {innerWidth > 576 ? (
                                <span style={{ fontSize: "4vh" }}>|</span>
                              ) : null}
                            </Col>
                            <Col xs={20} sm={10} md={10} lg={6} xl={5} xxl={5}>
                              <div className={EventsCss.connectView4}>
                                <span>
                                  <GlobalOutlined />
                                  &nbsp;&nbsp;nucleusteq.com
                                </span>
                              </div>
                            </Col>
                          </Row>

                          {/* <Row className={EventsCss.leftEventBottom}>
                            <Col
                              span={24}
                              className={EventsCss.leftEventBottomBadge}
                            >
                              <Button
                                onClick={() => {
                                  // setOpen(true);
                                }}
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
                          </Row> */}
                        </Col>
                        <Col span={2}></Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={6}>
                  {innerWidth > 1200 && (
                    <Row className={EventsCss.leftEventChildRow}>
                      <Col span={24}>
                        <Row>
                          <Col span={24}>
                            {[...eventData]?.map((e, i) => {
                              return (
                                <Row
                                  onClick={() => {
                                    setSingleEventData(e);
                                  }}
                                  id={"eventView" + e?.eventId}
                                >
                                  <Col
                                    span={14}
                                    className={`${
                                      EventsCss.rightTimelineName
                                    } ${
                                      e?.eventId === singleEventData?.eventId
                                        ? EventsCss.rightTimelineNameActive
                                        : ""
                                    }`}
                                  >
                                    <div>{e?.eventHeading}</div>
                                  </Col>
                                  <Col
                                    span={10}
                                    className={`${
                                      EventsCss.rightTimelineDate
                                    } ${
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
                  )}
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

export default EventNew;
