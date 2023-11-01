import React, { useState } from "react";
import { Input, Button, Tree } from "antd";
const { TextArea } = Input;
import AnalyzeDetailPopup from "../components/dataModernization/graphView/analyzeDetailPopup";
const Test = () => {
  const [modalData, setModalData] = useState({});
  const [data, setData] = useState({});

  const [treeDataArr, setTreeDataArr] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const handleMessageChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <TextArea rows={4} onChange={handleMessageChange} />
      <Button
        type="primary"
        onClick={() => {
          try {
            setModalData(JSON.parse(data));
          } catch (error) {
            setModalData(data);
          }
        }}
      >
        Graph
      </Button>

      <TextArea
        rows={4}
        onChange={(e) => {
          setTreeDataArr(e.target.value);
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          // console.log(treeDataArr)
          try {
            setTreeData(JSON.parse(treeDataArr));
          } catch (error) {
            setTreeData(treeDataArr);
          }
        }}
      >
        Tree
      </Button>
      {modalData?.Edges ? (
        <AnalyzeDetailPopup
          outputFileId={"outputFileId"}
          data={modalData}
          showPopUp={true}
        />
      ) : null}

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
        treeData={[treeData]}
      />
    </div>
  );
};

export default Test;
