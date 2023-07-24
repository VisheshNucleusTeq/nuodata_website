import { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Menu, Image, Tag, Dropdown, Space, Badge } from "antd";
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

  const getData = async () => {
    const data = await fetch_retry_get(
      `${GETEVENT}pageNo/0/records/4?pastEvents=false`
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
    if (status === "success") {
      if (eventDataArr?.success) {
        setEventData(eventDataArr.data?.eventDetails);
      } else {
        setEventData([]);
      }
    }
  }, [status, eventDataArr]);

  return (
    <div
      className={`${HeaderCss.menuDiv} ${
        data.scrollY > 500 && data.scrollDirection == "up"
          ? HeaderCss.menuDivScrollY
          : null
      }`}
    >
      {/* <p style={{ color: "red" }}>{eventData.length}</p> */}
      <Row className={HeaderCss.infoRow}>
        <Col offset={eventData.length > 0 ? 1 : 2} span={4}>
          <div className={HeaderCss.infoColImage}>
            <Link href="/">
              <Image preview={false} src={"/logo.png"} />
            </Link>
          </div>
        </Col>

        <Col offset={eventData.length > 0 ? 1 : 2} className={HeaderCss.infoColManu} span={eventData.length > 0 ? 18 : 16}>
          <Menu
            className={HeaderCss.menu}
            mode="horizontal"
            overflowedIndicator={
              <MenuOutlined style={{ fontSize: "200%", color: "#e74860" }} />
            }
            items={[
              {
                key: "1",
                className: HeaderCss.hoverEffect,
                label: (
                  <a className={HeaderCss.hoverEffect} href="/#benefitsID">
                    Why NuoData?
                  </a>
                ),
              },
              {
                key: "2",
                label: "Data Modernization",
                className: HeaderCss.hoverEffect,
                onClick: () => {
                  router.push("/how-it-works");
                },
              },
              {
                key: "3",
                label: "Data Management",
                className: HeaderCss.hoverEffect,
                onClick: () => {
                  router.push("/data-management");
                },
              },
              // {
              //   key: "4",
              //   label: (
              //     <Dropdown
              //       menu={{
              //         items: [
              //           {
              //             label: (
              //               <a
              //                 target="_blank"
              //                 rel="noopener noreferrer"
              //                 href="https://governance.dev.nuodata.io/"
              //               >
              //                 <Badge count={'D'} color="#e74860"/>&nbsp; DataHub
              //                 {/* <p><span className={HeaderCss.nameIcon}>D</span>DataHub</p> */}
              //               </a>
              //             ),
              //             key: "0",
              //           },
              //         ],
              //       }}
              //     >
              //       <a onClick={(e) => e.preventDefault()}>
              //         <Space className={HeaderCss.hoverEffect}>
              //           <BranchesOutlined />
              //           Select Platform
              //         </Space>
              //       </a>
              //     </Dropdown>
              //   ),
              // },
              {
                key: "TEST",
                label: "SPACEMENU",
                onClick: () => {
                  router.push("/");
                },
                style: {
                  visibility: "hidden",
                },
                className: "SPACEMENU",
              },
              {
                key: "4",
                label: (
                  <Tag
                    onClick={() => {
                      router.push("/events/");
                    }}
                    className={HeaderCss.tryNowTag}
                    color="#E74860"
                  >
                    Events
                  </Tag>
                ),
              },
              {
                key: "event",
                label: (
                  <Tag
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                    className={HeaderCss.tryNowTag}
                    color="#E74860"
                  >
                    Sign In
                  </Tag>
                ),
              },
              {
                key: "5",
                label: (
                  <Tag
                    onClick={() => Router.push("/contact-us")}
                    className={HeaderCss.tryNowTag}
                    color="#E74860"
                  >
                    Contact Us
                  </Tag>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}
