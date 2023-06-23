import Link from "next/link";
import { useRouter } from "next/router";
import { Layout, Row, Col, Image } from "antd";
const { Sider } = Layout;

import { useDispatch, useSelector } from "react-redux";
import { SetTabTypeAction, loderShowHideAction } from "../../../Redux/action";
import { useEffect, useState } from "react";
import { CaretLeftOutlined, CaretDownOutlined } from "@ant-design/icons";

const SiderView = ({ layoutCss, height, componentName }) => {
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const tabType = useSelector((state) => state.tabType.tabType);

  const [showDataModernization, setShowDataModernization] = useState(true);
  const [showPlatform, setShowPlatform] = useState(false);
  const [accountAndSettings, setAccountAndSettings] = useState(false);

  const changePage = async (page, tab) => {
    router.push(page);
    if (tab) {
      dispatch(SetTabTypeAction(tab));
    }
  };

  const projectDetails = useSelector(
    (state) => state.projectDetails.projectDetails
  );

  useEffect(() => {
    if (componentName === "/dashboard") {
      dispatch(SetTabTypeAction("Dashboard"));
    }
  }, [componentName]);

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
              // setAccountAndSettings(false)
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
        {/* <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
          >
            Account & Settings
          </Col>
        </Col> */}

        {/* accountAndSettings, setAccountAndSettings */}
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
            onClick={() => {
              setAccountAndSettings(!accountAndSettings);
              // setShowDataModernization(false)
            }}
          >
            Account & Settings &nbsp;{" "}
            {accountAndSettings ? (
              <CaretDownOutlined style={{ color: "#e74860" }} />
            ) : (
              <CaretLeftOutlined style={{ color: "#e74860" }} />
            )}
          </Col>
        </Col>

        {[
          { title: "Roles & permission", link: "/user-management" },
          // {
          //   title: "Repo settings",
          //   link: "/account-and-settings/repo-settings",
          // },
        ].map((data, i) => {
          return (
            accountAndSettings && (
              <Col
                key={(Math.random() + 1).toString(36).substring(7)}
                span={24}
                className={`${layoutCss.mainMenuCol} ${
                  router.pathname === data?.link ? layoutCss.activeMenu : null
                }`}
              >
                <a
                  onClick={() => {
                    changePage(data?.link);
                  }}
                >
                  <Col
                    offset={4}
                    span={20}
                    style={{ height: height / 2 + "px" }}
                    className={layoutCss.subMainMenu}
                  >
                    {data?.title}
                  </Col>
                </a>
              </Col>
            )
          );
        })}

        {/* <Col span={24} className={layoutCss.mainMenuCol}>
          <Col
            offset={2}
            span={20}
            style={{ height: height / 1.5 + "px" }}
            className={layoutCss.mainMenu}
            onClick={() => {
              setShowPlatform(!showPlatform);
            }}
          >
            Select Platform &nbsp;{" "}
            {showPlatform ? (
              <CaretDownOutlined style={{ color: "#e74860" }} />
            ) : (
              <CaretLeftOutlined style={{ color: "#e74860" }} />
            )}
          </Col>
        </Col>

        {[
          {
            name: "DataHub",
            link: "https://governance.dev.nuodata.io/",
          },
        ].map((data, i) => {
          return (
            showPlatform && (
              <Col
                key={(Math.random() + 1).toString(36).substring(7)}
                span={24}
                className={`${layoutCss.mainMenuCol}`}
              >
                <a onClick={() => window.open(data?.link, "_blank")}>
                  <Col
                    offset={2}
                    span={20}
                    style={{ height: height / 2 + "px" }}
                    className={layoutCss.subMainMenuSelect}
                  >
                    {data?.name}
                  </Col>
                </a>
              </Col>
            )
          );
        })} */}
      </Row>
    </Sider>
  );
};

export default SiderView;
