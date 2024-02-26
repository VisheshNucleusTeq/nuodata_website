import { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Menu, Image, Button, Tag, Drawer, List } from "antd";
import { MenuOutlined, BranchesOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { useQuery } from "react-query";

import HeaderCss from "../../styles/Header.module.css";
import { scroll } from "../../hooks/scroll";
import { fetch_retry_get } from "../../network/api-manager";
import { GETEVENT } from "../../network/apiConstants";

export default function Header() {
  const router = useRouter();
  const data = scroll();
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);

  const getData = async () => {
    const data = await fetch_retry_get(
      `${GETEVENT}pageNo/0/records/1?pastEvents=false`
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
  } = useQuery(["EVENT_DATA_HOME_CHECK"], () => getData(), {
    refetchOnWindowFocus: false,
    enabled: true,
    staleTime: 10 * (60 * 1000),
  });

  useEffect(() => {
    getData();
    if (status === "success") {
      if (eventDataArr?.success) {
        setEventData(eventDataArr.data?.eventDetails);
      } else {
        setEventData([]);
      }
    }
  }, [status, eventDataArr]);

  return (
    <>
      <Drawer
        // title="Platforms"
        placement={"top"}
        closable={false}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        key={"placement"}
        className={HeaderCss.Platform}
        style={{ display: `${open ? "" : "none"}` }}
      >
        <Row justify={"space-around"}>
          <Col span={6}>
            <List
              size="small"
              header={
                <div>
                  <b>Data Modernization</b>
                </div>
              }
              bordered={true}
              style={{ borderColor: "#FFF" }}
              dataSource={[
                { text: "About Data Modernization" },
                { text: "Informatica to ANY Cloud" },
                { text: "Informatica to Databricks, Snowflake" },
                { text: "Hadoop to ANY Cloud, Databricks, Snowflake" },
                { text: "Hadoop to WatsonX.data" },
                { text: "Teradata to ANY Cloud, Databricks, Snowflake" },
                { text: "Teradata to WatsonX.data" },
                { text: "Oracle on Prem to ANY Cloud or OCI" },
                { text: "Sybase SQL to Spark or Presto on ANY Cloud" },
                { text: "Any SQL to Spark or Presto" },
              ]}
              renderItem={(item) => (
                <List.Item style={{ cursor: "pointer" }}>
                  {item?.text}
                </List.Item>
              )}
            />
          </Col>
          <Col span={6}>
            <List
              size="small"
              header={
                <div>
                  <b>Data Management Platform</b>
                </div>
              }
              bordered={true}
              style={{ borderColor: "#FFF" }}
              dataSource={[
                { text: "Data Catalog" },
                { text: "Data Lineage" },
                { text: "Data Governance" },
                { text: "MDM & Customer 360" },
                { text: "Data Engineering (ETL-ELT)" },
                { text: "Data Access & Security" },
                { text: "Business Intelligence & Reporting" },
                { text: "Data Orchestration & Scheduling" },
                { text: "Data Operations & Observability" },
              ]}
              renderItem={(item) => (
                <List.Item style={{ cursor: "pointer" }}>
                  {item?.text}
                </List.Item>
              )}
            />
          </Col>
          <Col span={6}>
            <List
              size="small"
              header={
                <div>
                  <b>Pricing</b>
                </div>
              }
              bordered={true}
              style={{ borderColor: "#FFF" }}
              dataSource={[
                { text: "Data Modernizing pricing" },
                { text: "Data Management pricing" },
              ]}
              renderItem={(item) => (
                <List.Item style={{ cursor: "pointer" }}>
                  {item?.text}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Drawer>
      <div
        className={`${HeaderCss.menuDiv} ${
          data.scrollY > 500 && data.scrollDirection == "up"
            ? HeaderCss.menuDivScrollY
            : null
        }`}
      >
        <Row className={HeaderCss.infoRow}>
          <Col
            offset={eventData.length > 0 ? 3 : 2}
            md={2}
            xs={8}
            sm={6}
            onMouseEnter={() => {
              setOpen(false);
            }}
          >
            <div className={HeaderCss.infoColImage}>
              <Link href="/">
                <Image preview={false} src={"/auth/logo-new.png"} />
              </Link>
            </div>
          </Col>

          <Col md={eventData.length < 0 ? 20 : 18} xs={14} sm={16}>
            <Menu
              className={HeaderCss.menu}
              mode="horizontal"
              overflowedIndicator={
                <MenuOutlined style={{ fontSize: "200%", color: "#e74860" }} />
              }
              items={[
                {
                  key: "1",
                  className: `${HeaderCss.hoverEffectDiv} ${
                    router.pathname === "/#benefitsID"
                      ? HeaderCss.hoverEffectDivActive
                      : ""
                  }`,
                  label: "Why NuoData?",
                  onClick: () => {
                    router.push("/#benefitsID");
                  },
                  onMouseEnter: () => {
                    setOpen(false);
                  },
                },
                {
                  key: "2",
                  label: "Platforms",
                  className: `${HeaderCss.hoverEffectDiv}`,
                  onClick: () => {
                    setOpen(!open);
                  },
                },

                eventData.length > 0
                  ? {
                      key: "3",
                      label: (
                        <Button className={HeaderCss.contactUs}>Events</Button>
                      ),
                      className: `${HeaderCss.hoverEffectDiv} ${
                        router.pathname === "/events"
                          ? HeaderCss.hoverEffectDivActive
                          : ""
                      }`,
                      onClick: () => {
                        router.push("/events");
                      },
                      onMouseEnter: () => {
                        setOpen(false);
                      },
                    }
                  : null,

                // {
                //   key: "HIDEEN",
                //   label: "",
                //   style: {
                //     height: "0px",
                //   },
                // },
                {
                  key: "5",
                  label: (
                    <Button className={`${HeaderCss.tryNowBtn} ${"tryNowBtn"}`}>
                      Try It Now
                    </Button>
                  ),
                  onClick: () => {
                    router.push("/sign-in");
                  },
                  onMouseEnter: () => {
                    setOpen(false);
                  },
                },
                {
                  key: "5",
                  label: (
                    <Button className={`${HeaderCss.tryNowBtn} ${"tryNowBtn"}`}>
                      SSO Login {process.env.AUTH0_CLIENT_ID}
                    </Button>
                  ),
                  onClick: () => {
                    router.push("/api/auth/login");
                  },
                  onMouseEnter: () => {
                    setOpen(false);
                  },
                },
                {
                  key: "6",
                  label: (
                    <Button className={HeaderCss.contactUs}>Contact Us</Button>
                  ),
                  onClick: () => {
                    router.push("/contact-us");
                  },
                  onMouseEnter: () => {
                    setOpen(false);
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
