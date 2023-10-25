import Link from "next/link";
import { useRouter } from "next/router";
import { Layout, Row, Col, Image } from "antd";
const { Sider } = Layout;

import { useDispatch, useSelector } from "react-redux";
import { SetTabTypeAction, loderShowHideAction } from "../../../Redux/action";
import { useEffect, useState } from "react";
import { CaretLeftOutlined, CaretDownOutlined } from "@ant-design/icons";

const SiderView = ({ layoutCss, height, componentName }) => {
  const workspace = useSelector(
    (state) => state?.workspace?.workspace
  );
  console.log(workspace)
  const { query } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();
  const tabType = useSelector((state) => state.tabType.tabType);

  const [showDataModernization, setShowDataModernization] = useState(true);
  const [showPlatform, setShowPlatform] = useState(false);
  const [accountAndSettings, setAccountAndSettings] = useState(false);
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

  const [accountAndSettingsArr, setAccountAndSettingsArr] = useState([]);

  const [ingestion, setIngestion] = useState(false);
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
    if (typeof window !== "undefined") {
      if ("workspace" in localStorage || workspace) {
        setIngestionArr([
          {
            title: "Dashboard",
            link: "/ingestion",
          },
          {
            title: "Create Pipeline",
            link: "/ingestion/create-pipeline",
          },
          {
            title: "Create Workspace",
            link: "/ingestion/create-workspace",
          },
        ]);
      } else {
        setIngestionArr([
          {
            title: "Dashboard",
            link: "/ingestion",
          },
          {
            title: "Create Workspace",
            link: "/ingestion/create-workspace",
          },
        ]);
      }
    }
  }, [typeof window !== "undefined", workspace]);

  return (
    <Sider className={layoutCss.mainLayoutSider}>
      <div style={{ height: height + "px" }} className={layoutCss.logoImage}>
        <Link href="/">
          <Image src="/auth/logo.png" preview={false} />
        </Link>
      </div>

      <Row style={{ marginTop: "10%" }}>
        <Col span={24} className={layoutCss.mainMenuCol}>
          <Row>
            <Col
              offset={2}
              span={20}
              style={{ height: height / 1.5 + "px" }}
              className={layoutCss.mainMenu}
              onClick={() => {
                setShowDataModernization(!showDataModernization);
              }}
            >
              <Row style={{ width: "100%" }}>
                <Col span={22}>Data Modernization &nbsp;</Col>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {accountAndSettings ? (
                    <CaretDownOutlined
                      style={{ color: "#e74860", float: "right" }}
                    />
                  ) : (
                    <CaretLeftOutlined
                      style={{ color: "#e74860", float: "right" }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {dataModernization.map((data, i) => {
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
          <Row>
            <Col
              offset={2}
              span={20}
              style={{ height: height / 1.5 + "px" }}
              className={layoutCss.mainMenu}
              onClick={() => {
                setAccountAndSettings(!accountAndSettings);
              }}
            >
              <Row style={{ width: "100%" }}>
                <Col span={22}>Account & Settings &nbsp;</Col>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {accountAndSettings ? (
                    <CaretDownOutlined
                      style={{ color: "#e74860", float: "right" }}
                    />
                  ) : (
                    <CaretLeftOutlined
                      style={{ color: "#e74860", float: "right" }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {accountAndSettingsArr.map((data, i) => {
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

        <Col span={24} className={layoutCss.mainMenuCol}>
          <Row>
            <Col
              offset={2}
              span={20}
              style={{ height: height / 1.5 + "px" }}
              className={layoutCss.mainMenu}
              onClick={() => {
                setIngestion(!ingestion);
              }}
            >
              {/* ingestion, setIngestion */}
              <Row style={{ width: "100%" }}>
                <Col span={22}>Ingestion &nbsp;</Col>
                <Col
                  span={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {ingestion ? (
                    <CaretDownOutlined
                      style={{ color: "#e74860", float: "right" }}
                    />
                  ) : (
                    <CaretLeftOutlined
                      style={{ color: "#e74860", float: "right" }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {ingestionArr.map((data, i) => {
          return (
            ingestion && (
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
      </Row>
    </Sider>
  );
};

export default SiderView;
