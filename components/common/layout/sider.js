import Link from "next/link";
import { useRouter } from "next/router";
import { Layout, Row, Col, Image } from "antd";
const { Sider } = Layout;

import { useDispatch, useSelector } from "react-redux";
import { SetTabTypeAction, loderShowHideAction } from "../../../Redux/action";
import { useState } from "react";
import { CaretLeftOutlined, CaretDownOutlined } from "@ant-design/icons";

const SiderView = ({ layoutCss, height, componentName }) => {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const tabType = useSelector((state) => state.tabType.tabType);

  const [showDataModernization, setShowDataModernization] = useState(true);

  const changePage = async (page, tab) => {
    router.push(page);
    if (tab) {
      dispatch(SetTabTypeAction(tab));
    }
  };

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  return (
    <Sider className={layoutCss.mainLayoutSider}>
      <div style={{ height: height + "px" }} className={layoutCss.logoImage}>
        <Link href="/">
          <Image src="/auth/logo.png" preview={false} />
        </Link>
      </div>

      <Row style={{ marginTop: "10%" }}>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
            onClick={() => {
              setShowDataModernization(!showDataModernization);
            }}
          >
            Data Modernization &nbsp;{" "}
            {showDataModernization ? (
              <CaretDownOutlined style={{ color: "#e74860" }} />
            ) : (
              <CaretLeftOutlined style={{ color: "#e74860" }} />
            )}
          </Col>
        </Col>

        {[
          "Dashboard",
          "Define",
          "Connect",
          "Analyze",
          "Design",
          "Transform",
          "Validate",
          "Rollout",
        ].map((data, i) => {
          return (
            showDataModernization && (
              <Col
                key={(Math.random() + 1).toString(36).substring(7)}
                span={24}
                className={`${layoutCss.mainMenuCol} ${
                  tabType === data &&
                  (componentName == "/data-modernization" ||
                    componentName == "/dashboard")
                    ? layoutCss.activeMenu
                    : null
                }`}
              >
                <a
                  onClick={() => {
                    if (data === "Dashboard") {
                      changePage("/dashboard", data);
                    } else if (
                      (query?.id ? query?.id : projectDetails?.projectId) ||
                      "Define" === data
                    ) {
                      if (query?.id ? query?.id : projectDetails?.projectId) {
                        changePage(
                          "/data-modernization?id=" +
                            (query?.id ? query?.id : projectDetails?.projectId),
                          data
                        );
                      } else {
                        changePage("/data-modernization", data);
                      }
                    }
                  }}
                >
                  <Col
                    offset={4}
                    span={20}
                    style={{ height: height / 2 + "px" }}
                    className={layoutCss.subMainMenu}
                  >
                    {data}
                  </Col>
                </a>
              </Col>
            )
          );
        })}
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
          >
            Data Management
          </Col>
        </Col>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
          >
            Account & Settings
          </Col>
        </Col>
      </Row>
    </Sider>
  );
};

export default SiderView;
