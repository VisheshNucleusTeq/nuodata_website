import React, { useState } from "react";
import { Row, Col, Tree, Input, Tabs } from "antd";
import { LoadingOutlined, FolderOutlined } from "@ant-design/icons";
import { PYSPARK, DOWNLOADFILE } from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";

const SqlView = ({ showPopUp, analyzeDetailsId, dataModernizationCss }) => {
  const [showHide, setShowHide] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [treeDataDefault, setTreeDataDefault] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [selectedTree, setSelectedTree] = useState();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("SQL");

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
    const data = await fetch_retry_get(`${PYSPARK}${analyzeDetailsId}`);
    const treeDataObj = {
      ...data?.data,
      key: "defaultExpandedKey",
    };
    setTreeData([treeDataObj]);
    setTreeDataDefault([treeDataObj]);
  };

  const getGraphData = async (id) => {
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
    const dataId = (id + "").split("_")[0];
    const data = await fetch_retry_get(`${DOWNLOADFILE}${dataId}`);
    if (data.success) {
      setData(data.data);
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
              setTreeData(filterData);
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
        <Col
          span={showHide ? 18 : 24}
          style={{ height: "85vh" }}
        >
          <Row className={dataModernizationCss.tabViewPar}>
            <Col onClick={() => {setActiveTab("SQL")}} span={11} className={`${dataModernizationCss.tabView} ${activeTab === "SQL" ? dataModernizationCss.tabViewActive : ""}`}>
              Transformation SQL
            </Col>
            <Col span={1}/>
            <Col onClick={() => {setActiveTab("GRAPH")}} span={11} className={`${dataModernizationCss.tabView} ${activeTab === "GRAPH" ? dataModernizationCss.tabViewActive : ""}`}>
              Source Graph
            </Col>
          </Row>
          <pre style={{ height: "80vh", paddingLeft: "1vw", overflow: "scroll" }} >{data}</pre>
        </Col>
      </Row>
    </>
  );
};

export default SqlView;
