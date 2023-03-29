import React, { useState } from "react";
import { Row, Col, Tree, Input, Space, Tooltip } from "antd";
import { LoadingOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  JSONSTRUCTURE,
  DOWNLOADFILE,
  DOWNLOADZIP,
  DESIGN,
} from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";
import AnalyzeDetailPopup from "../graphView/analyzeDetailPopup";
import AnalyzeDetailGraphPopup from "../graphView/analyzeDetailGraphPopup";

const SqlView = ({
  showPopUp,
  analyzeDetailsId,
  dataModernizationCss,
  setShowDownload,
  activeTabValue
}) => {
  const [showHide, setShowHide] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [treeDataDefault, setTreeDataDefault] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [selectedTree, setSelectedTree] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(activeTabValue);
  const [parentArr, setParentArr] = useState([]);
  const [modalData, setModalData] = useState({});

  const addDownloadIcon = (treeDataObj) => {
    treeDataObj?.children.forEach((elementP, i) => {
      if (elementP?.children) {
        elementP?.children.forEach((elementC, j) => {
          if (elementC && elementC?.children && elementC?.children.length) {
            setParentArr([
              (treeDataObj.children[i].children[j].key + "").split("_")[1],
              ...parentArr,
            ]);
            treeDataObj.children[i].children[j].title = (
              <>
                <span>{treeDataObj.children[i].children[j].title}</span>
                <span onClick={(e) => e.stopPropagation()}>
                  <Tooltip placement="right" title={"Download"}>
                    <a
                      href={`${process.env.BASE_URL}${DOWNLOADZIP}${analyzeDetailsId}?type=workflow&workflowId=${
                        (treeDataObj.children[i].children[j].key + "").split(
                          "_"
                        )[0]
                      }`}
                      className="downloadBtn"
                    >
                      <Space size="middle" style={{ cursor: "pointer" }} info>
                        <DownloadOutlined />
                      </Space>
                    </a>
                  </Tooltip>
                </span>
              </>
            );
          }
        });
      }
    });
    return treeDataObj;
  };

  const filter = (array, text) => {
    const getNodes = (result, object) => {
      if (object.title.toLowerCase().includes(text.toLowerCase())) {
        result.push({ ...object, className: text ? "demo123" : "" });
        return result;
      }
      if (Array.isArray(object.children)) {
        const children = object.children.reduce(getNodes, []);
        if (children.length) result.push({ ...object, children });
      }
      return result;
    };
    return array.reduce(getNodes, []);
  };

  const getTreeData = async (analyzeDetailsId) => {
    const data = await fetch_retry_get(`${JSONSTRUCTURE}${analyzeDetailsId}`);
    var treeDataObj = {
      ...JSON.parse(JSON.stringify(data?.data)),
      key: "defaultExpandedKey",
    };

    const treeDataObjDefault = {
      ...JSON.parse(JSON.stringify(data?.data)),
      key: "defaultExpandedKey",
    };
    setTreeDataDefault([treeDataObjDefault]);
    setTreeData([addDownloadIcon(treeDataObj)]);
  };

  const getGraphData = async (id) => {
    setShowDownload(false);
    if (id + "") {
      if (id + "" == selectedTree + "") {
        return true;
      }
      setSelectedTree(id);
    } else {
      id = selectedTree;
      return true;
    }

    setLoading(true);
    setData("");
    setModalData({});
    let designView = true;

    const dataId1 = (id + "").split("_")[1];
    if (dataId1 > 0) {
      const data1 = await fetch_retry_get(`${DOWNLOADFILE}${dataId1}`);
      if (data1.success) {
        designView = false;
        setData(data1.data);
        if (!parentArr.includes(dataId1)) setShowDownload(dataId1);
      }
    }

    const dataId2 = (id + "").split("_")[0];
    if (dataId2 > 0) {
      const data2 = await fetch_retry_get(`${DESIGN}${dataId2}`);
      if (data2.success) {
        setModalData(data2.data);
        if(designView){
          setActiveTab("GRAPH");
        }
        // if (!parentArr.includes(dataId2)) setShowDownload(dataId2);
      }
    }

    setLoading(false);
  };

  useState(() => {
    getTreeData(analyzeDetailsId);
  }, [analyzeDetailsId]);

  return (
    <>
      <Row>
        <Col
          span={showHide ? 6 : 0}
          style={{ backgroundColor: "#0c3246", height: "85vh" }}
        >
          <Input
            placeholder="Search"
            onKeyUp={(e) => {
              setSearch(e.target.value);
              const filterData = filter(treeDataDefault, e.target.value);
              setTreeData(
                filterData.length
                  ? [addDownloadIcon(JSON.parse(JSON.stringify(filterData[0])))]
                  : []
              );
            }}
            style={{ height: "5vh", border: "1px solid #0c3246" }}
          />
          {treeData.length > 0 || search.length > 0 ? (
            <>
              {search == "" ? (
                <>
                  <Tree
                    className="treeCss"
                    defaultExpandedKeys={["defaultExpandedKey"]}
                    style={{
                      color: "#FFF",
                      paddingTop: "2vh",
                      backgroundColor: "#0c3246",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
                    showLine
                    onSelect={(e) => {
                      getGraphData(e);
                    }}
                    treeData={treeData}
                  />
                </>
              ) : (
                <>
                  <span></span>
                  <Tree
                    className="treeCss"
                    defaultExpandAll={true}
                    defaultExpandParent={true}
                    style={{
                      color: "#FFF",
                      paddingTop: "2vh",
                      backgroundColor: "#0c3246",
                      height: "80vh",
                      overflowY: "scroll",
                    }}
                    showLine
                    onSelect={(e) => {
                      getGraphData(e);
                    }}
                    treeData={treeData}
                  />
                </>
              )}
            </>
          ) : (
            <center>
              <LoadingOutlined
                style={{ color: "#e74860", fontSize: "4vh", marginTop: "4vh" }}
              />
            </center>
          )}
        </Col>
        <Col span={showHide ? 18 : 24} style={{ height: "85vh" }}>
          <Row className={dataModernizationCss.tabViewPar}>
            <Col
              onClick={() => {
                setActiveTab("SQL");
              }}
              span={11}
              className={`${dataModernizationCss.tabView} ${
                activeTab === "SQL" ? dataModernizationCss.tabViewActive : ""
              }`}
            >
              Transformation SQL
            </Col>
            <Col span={1} />
            <Col
              onClick={() => {
                setActiveTab("GRAPH");
              }}
              span={11}
              className={`${dataModernizationCss.tabView} ${
                activeTab === "GRAPH" ? dataModernizationCss.tabViewActive : ""
              }`}
            >
              Graph
            </Col>
          </Row>

          <div style={{ display: activeTab === "SQL" ? "block" : "none" }}>
            {data ? (
              <pre
                style={{
                  height: "80vh",
                  paddingLeft: "1vw",
                  overflow: "scroll",
                }}
              >
                {data}
              </pre>
            ) : (
              <center
                style={{
                  height: "80vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  color: "#e74860",
                }}
              >
                {loading ? "Loading..." : "Select SQL from tree view"}
              </center>
            )}
          </div>

          <div style={{ display: activeTab === "GRAPH" ? "block" : "none" }}>
            {modalData?.Edges ? (
              <AnalyzeDetailGraphPopup
                showHide={showHide}
                setShowHide={setShowHide}
                data={modalData}
                showPopUp={showPopUp}
              />
            ) : (
              <center
                style={{
                  height: "80vh",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  color: "#e74860",
                }}
              >
                {loading ? "Loading..." : "Select graph from tree view"}
              </center>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SqlView;
