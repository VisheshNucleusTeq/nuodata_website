import React, { useState, useEffect } from "react";
import { Button, Col, Image, Layout, Row } from "antd";
import Link from "next/link";
const { version } = require("../../../package.json");
import { useRouter } from "next/router";
const { Sider } = Layout;

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SetTabTypeAction, UserDetailsAction } from "../../../Redux/action";

const SiderView = ({ layoutCss, height, componentName }) => {
  const workspace = useSelector((state) => state?.workspace?.workspace);
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const tabType = useSelector((state) => state.tabType.tabType);

  const [showDataAnalytics, setShowDataAnalytics] = useState(false);
  const [showDataOperations, setShowDataOperations] = useState(false);
  const [showDataModernization, setShowDataModernization] = useState(false);
  const [showDataManagement, setShowDataManagement] = useState(true);
  const [accountAndSettings, setAccountAndSettings] = useState(false);
  const [ingestion, setIngestion] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);

  const updateWindowWidth = () => setWindowWidth(window.innerWidth);

  const [dataModernization] = useState([
    "Dashboard",
    "Define",
    "Connect",
    "Analyze",
    "Design",
    "Transform",
    "Validate",
    "Rollout",
  ]);

  const [dataManagement, setDataManagement] = useState([]);
  const [dataAnalytics, setDataAnalytics] = useState([]);
  const [dataOperations, setDataOperations] = useState([]);
  const [accountAndSettingsArr, setAccountAndSettingsArr] = useState([]);
  const [ingestionArr, setIngestionArr] = useState([]);

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
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    if (windowWidth > 990 && collapsed) {
      setCollapsed(false);
    }
  }, [windowWidth, collapsed]);

  const toggleCollapsed = () => {
    if (windowWidth <= 990) {
      setCollapsed(!collapsed);
    }
  };

  useEffect(() => {
    if (componentName === "/dashboard") {
      dispatch(SetTabTypeAction("Dashboard"));
    }
  }, [componentName]);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));

    let accountAndSettingsArrData = [];
    if (["nuodata_admin", "biz_master_admin"].includes(authData?.roleName)) {
      accountAndSettingsArrData.push({
        title: "Roles & permission",
        link: "/user-management",
      });
    }
    accountAndSettingsArrData.push({
      title: "Repo settings",
      link: "/account-and-settings/repo-settings",
    });
    accountAndSettingsArrData.push({
      title: "Target Platforms",
      link: "/account-and-settings/target-platform",
    });
    if (["nuodata_admin"].includes(authData?.roleName)) {
      accountAndSettingsArrData.push({
        title: "Events",
        link: "/event/event-management",
      });
    }
    setAccountAndSettingsArr(accountAndSettingsArrData);
  }, []);

  useEffect(() => {
    setDataManagement([
      {
        title: "Workspaces",
        link: "/ingestion/workspace",
      },
      {
        title: "Pipelines",
        link: "/ingestion",
      },
      {
        title: "Connections",
        link: "/ingestion/connections",
      },
      {
        title: "Job Runs",
        link: "#",
      },
      {
        title: "Catalog",
        link: "#",
      },
      {
        title: "Governance",
        link: "#",
      },
    ]);

    setDataAnalytics([
      {
        title: "Workspaces",
        link: "#",
      },
      {
        title: "Models",
        link: "#",
      },
    ]);

    setDataOperations([
      {
        title: "Job Runs",
        link: "#",
      },
      {
        title: "AI Ops",
        link: "#",
      },
    ]);

    if (typeof window !== "undefined") {
      if ("workspace" in localStorage || workspace) {
        setIngestionArr([
          {
            title: "Workspaces",
            link: "/ingestion/workspace",
          },
          {
            title: "Dashboard",
            link: "/ingestion",
          },
          {
            title: "Create Pipeline",
            link: "/ingestion/create-pipeline",
          },
        ]);
        setDataManagement([
          {
            title: "Workspaces",
            link: "/ingestion/workspace",
          },
          {
            title: "Pipelines",
            link: "/ingestion",
          },
          {
            title: "Connections",
            link: "/ingestion/connections",
          },
          {
            title: "Job Runs",
            link: "#",
          },
          {
            title: "Catalog",
            link: "#",
          },
          {
            title: "Governance",
            link: "#",
          },
        ]);
      } else {
        setIngestionArr([
          {
            title: "Workspaces",
            link: "/ingestion/workspace",
          },
          {
            title: "Dashboard",
            link: "/ingestion",
          },
        ]);
        setDataManagement([
          {
            title: "Workspaces",
            link: "/ingestion/workspace",
          },
          {
            title: "Pipelines",
            link: "/ingestion",
          },
          {
            title: "Connections",
            link: "/ingestion/connections",
          },
          {
            title: "Job Runs",
            link: "#",
          },
          {
            title: "Catalog",
            link: "#",
          },
          {
            title: "Governance",
            link: "#",
          },
        ]);
      }
    }
  }, [typeof window !== "undefined", workspace]);

  const MenuSection = ({ title, show, items, onToggle, link }) => (
    <div className={layoutCss.mainMenuDiv}>
      <Col span={24} className={layoutCss.mainMenuCol}>
        <Row className={layoutCss.maxWidth}>
          <Col
            offset={2}
            span={20}
            className={layoutCss.mainMenu}
            onClick={onToggle}
          >
            <Row className={layoutCss.maxWidth}>
              <Col span={items ? 22 : 24}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#fff", width: "100%" }}
                >
                  <Image
                    alt={title}
                    src={`/sider-icons/${title}.svg`}
                    preview={false}
                  />
                  <span className={layoutCss.menuTxtMargin}>{title}</span>{" "}
                  &nbsp;
                </a>
              </Col>
              <Col span={items ? 2 : 0} className={layoutCss.collapseArrowCol}>
                {items && (
                  <div style={{ width: "100%" }}>
                    {show ? (
                      <UpOutlined className={layoutCss.collapseStyle} />
                    ) : (
                      <DownOutlined className={layoutCss.collapseStyle} />
                    )}
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      {show &&
        items.map((data) => (
          <Col
            key={data.title}
            span={24}
            className={`${layoutCss.mainMenuCol} ${
              router.pathname === data?.link ? layoutCss.activeMenu : null
            }`}
          >
            <a onClick={() => changePage(data.link)}>
              <Col span={24} className={layoutCss.subMainMenu}>
                <Image
                  alt={data.title}
                  src={`/sider-icons/${data.title}.svg`}
                  preview={false}
                />
                <span className={layoutCss.menuTxtMargin}>{data.title}</span>
              </Col>
            </a>
          </Col>
        ))}
    </div>
  );

  return (
    <Row>
      <Col
        sm={collapsed ? 20 : 0}
        xs={collapsed ? 20 : 0}
        md={windowWidth > 990 ? 24 : collapsed ? 20 : 0}
        lg={24}
        xl={24}
      >
        <Sider
          collapsed={windowWidth <= 990 ? collapsed : false}
          onCollapse={toggleCollapsed}
          className={
            windowWidth > 990
              ? layoutCss.mainLayoutSider
              : collapsed
              ? layoutCss.mainLayoutSider
              : layoutCss.collapsedSider
          }
        >
          <div className={layoutCss.logoImage}>
            <Link href="/">
              <Image src="/auth/logo.png" preview={false} />
            </Link>
          </div>

          <Row className={layoutCss.mainMenuRow}>
            <MenuSection title="Data Catalogue" />

            <MenuSection
              title="Data Governance"
              link={"https://beta.governance.dev.nuodata.io/"}
            />

            <MenuSection title="Data Lineage" />

            <MenuSection title="MDM & Customer 360" />

            <MenuSection
              title="Data Engineering"
              show={showDataManagement}
              items={dataManagement}
              onToggle={() => setShowDataManagement(!showDataManagement)}
            />

            <div className={layoutCss.mainMenuDiv}>
              <Col span={24} className={layoutCss.mainMenuCol}>
                <Row className={layoutCss.maxWidth}>
                  <Col
                    offset={2}
                    span={20}
                    className={layoutCss.mainMenu}
                    onClick={() => {
                      setShowDataModernization(!showDataModernization);
                    }}
                  >
                    <Row className={layoutCss.maxWidth}>
                      <Col span={22}>
                        <Image
                          alt="Data Management"
                          src={`/sider-icons/Data Modernization.svg`}
                          preview={false}
                        />
                        <span className={layoutCss.menuTxtMargin}>
                          Data Modernization
                        </span>
                        &nbsp;
                      </Col>
                      <Col span={2} className={layoutCss.collapseArrowCol}>
                        {showDataModernization ? (
                          <UpOutlined className={layoutCss.collapseStyle} />
                        ) : (
                          <DownOutlined className={layoutCss.collapseStyle} />
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {dataModernization.map((data) => {
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
                            (query?.id
                              ? query?.id
                              : projectDetails?.projectId) ||
                            "Define" === data
                          ) {
                            if (
                              query?.id ? query?.id : projectDetails?.projectId
                            ) {
                              changePage(
                                "/data-modernization?id=" +
                                  (query?.id
                                    ? query?.id
                                    : projectDetails?.projectId),
                                data
                              );
                            } else {
                              changePage("/data-modernization", data);
                            }
                          }
                        }}
                      >
                        <Col span={24} className={layoutCss.subMainMenu}>
                          <Image
                            alt={data}
                            src={`/sider-icons/${data}.svg`}
                            preview={false}
                          />
                          <span className={layoutCss.menuTxtMargin}>
                            {data}
                          </span>
                        </Col>
                      </a>
                    </Col>
                  )
                );
              })}
            </div>

            <MenuSection
              title="Data Analytics"
              show={showDataAnalytics}
              items={dataAnalytics}
              onToggle={() => setShowDataAnalytics(!showDataAnalytics)}
            />

            <MenuSection
              title="Data Operations"
              show={showDataOperations}
              items={dataOperations}
              onToggle={() => setShowDataOperations(!showDataOperations)}
            />

            <MenuSection
              title="Account & Settings"
              show={accountAndSettings}
              items={accountAndSettingsArr}
              onToggle={() => setAccountAndSettings(!accountAndSettings)}
            />

            <div className={layoutCss.mainMenuDiv}>
              {ingestionArr.map((data, i) => {
                return (
                  ingestion && (
                    <Col
                      key={(Math.random() + 1).toString(36).substring(7)}
                      span={24}
                      className={`${layoutCss.mainMenuCol} ${
                        router.pathname === data?.link
                          ? layoutCss.activeMenu
                          : null
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
                          className={layoutCss.subMainMenu}
                        >
                          {data?.title}
                        </Col>
                      </a>
                    </Col>
                  )
                );
              })}
            </div>
          </Row>
          <Row justify={"center"} align={"middle"}>
            <Col span={24} align={"middle"}>
              <Button
                className={layoutCss.logOutBtn}
                onClick={() => {
                  router.push("/api/auth/logout/");
                }}
              >
                <LogoutOutlined /> Log Out
              </Button>
            </Col>
            <Col>
              <h6 style={{color:"#f6f6f6"}}>version: {version}</h6>
            </Col>
          </Row>
        </Sider>
      </Col>
      {windowWidth <= 990 && (  
        <Col style={{ width: "0" }}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            className={layoutCss.collapseMenuBtn}
            style={{
              border: "none",
              background: "#fff",
              color: "#0c3246",
              left: collapsed ? "5vw" : "0",
            }}
          >
            {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default SiderView;
