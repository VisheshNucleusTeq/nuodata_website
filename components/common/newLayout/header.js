import { useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Menu, Image, Button } from "antd";
import { MenuOutlined, BranchesOutlined } from "@ant-design/icons";
import Router, { useRouter } from "next/router";
import { useQuery } from "react-query";

import HeaderCss from "../../../styles/newStyles/Header.module.css";
import { scroll } from "../../../hooks/scroll";
import { fetch_retry_get } from "../../../network/api-manager";
import { GETEVENT } from "../../../network/apiConstants";

export default function Header() {
  const router = useRouter();
  const data = scroll();
  const [eventData, setEventData] = useState([]);

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
    <div
      className={`${HeaderCss.menuDiv} ${
        data.scrollY > 500 && data.scrollDirection == "up"
          ? HeaderCss.menuDivScrollY
          : null
      }`}
    >
      <Row className={HeaderCss.infoRow}>
        <Col offset={eventData.length > 0 ? 1 : 2} span={4}>
          <div className={HeaderCss.infoColImage}>
            <Link href="/">
              <Image preview={false} src={"/logo.png"} />
            </Link>
          </div>
        </Col>

        <Col
          offset={eventData.length > 0 ? 1 : 2}
          span={eventData.length > 0 ? 18 : 16}
        >
          <Menu
            className={HeaderCss.menu}
            mode="horizontal"
            overflowedIndicator={
              <MenuOutlined style={{ fontSize: "200%", color: "#e74860" }} />
            }
            items={[
              {
                key: "1",
                className: `${HeaderCss.hoverEffectDiv} ${HeaderCss.hoverEffectDivActive}`,
                label: "Why NuoData?",
                onClick: () => {
                  router.push("/#benefitsID");
                },
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
              {
                // key: "4",
                // label: (
                //   <Button className={HeaderCss.contactUs}>Event</Button>
                // ),
                key: "3",
                label: "Events",
                className: HeaderCss.hoverEffect,
                onClick: () => {
                  router.push("/events");
                },
              },

              {
                key: "HIDEEN",
                label: "",
                style: {
                  height: "0px",
                },
              },

              {
                key: "5",
                label: (
                  <Button className={`${HeaderCss.tryNowBtn} ${"tryNowBtn"}`}>Try It Now</Button>
                ),
              },
              {
                key: "6",
                label: (
                  <Button className={HeaderCss.contactUs}>Contact Us</Button>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}
