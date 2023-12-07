import React, {  useState } from "react";
import { Row, Col, Tree, Input} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AnalyzeDetailPopup from "../graphView/analyzeDetailPopup";
import {
  JSONSTRUCTURE,
  DESIGN,
} from "../../../network/apiConstants";
import { fetch_retry_get } from "../../../network/api-manager";

const GraphView = ({ showPopUp, analyzeDetailsId, setShowDownload }) => {
  const [treeData, setTreeData] = useState([]);
  const [treeDataDefault, setTreeDataDefault] = useState([]);
  const [showHide, setShowHide] = useState(true);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTree, setSelectedTree] = useState();

  const addDownloadIcon = (treeDataObj) => {
    return treeDataObj
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
    setModalData({});
    const dataId = (id + "").split("_")[0];
    const data = await fetch_retry_get(`${DESIGN}${dataId}`);
    if (data.success) {
      setModalData(data.data);
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
        <Col
          span={showHide ? 18 : 24}
          style={{ height: "85vh", paddingLeft: "1vw" }}
        >
          {modalData?.Edges ? (
            <AnalyzeDetailPopup
              showHide={showHide}
              setShowHide={setShowHide}
              data={modalData}
              showPopUp={showPopUp}
            />
          ) : (
            <center
              style={{
                height: "100%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: "#e74860",
              }}
            >
              {loading ? "Loading..." : "Select graph from tree view"}
            </center>
          )}
        </Col>
      </Row>
    </>
  );
};

export default GraphView;
