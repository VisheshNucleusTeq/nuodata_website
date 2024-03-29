import React, { useState, useRef } from "react";
import { Input, Button, Tree, Row, Col } from "antd";
const { TextArea } = Input;
import AnalyzeDetailPopup from "../components/dataModernization/graphView/analyzeDetailPopup";
const Test = () => {
  const [modalData, setModalData] = useState({});
  // const [data, setData] = useState({});
  const [data, setData] = useState('demo');
  const textareaRef = useRef();

  const [treeDataArr, setTreeDataArr] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const cursorPosition = 0;

  const handleMessageChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      {cursorPosition}
       <textarea
    ref={textareaRef}
    onBlur={() => textareaRef.current.setSelectionRange(cursorPosition, cursorPosition)}
  />
      {/* <TextArea value={data} onFocus={()=>{
const selectionStart = textareaRef?.current?.selectionStart;
const selectionEnd = textareaRef?.current?.selectionEnd;

console.log(selectionStart, selectionEnd)
      }}></TextArea> */}
      <Button onClick={()=>{ 


      }}>SUM("value1", "value2")</Button>
    </div>
  )

  return (
    <>
    <Row>
      <Col span={7}>sdfsd</Col>
      <Col span={7}>sdfsd</Col>
      <Col span={7}>sdfsdf</Col>
      <Col span={3}>sdfsd</Col>
    </Row>
    
    </>
  )

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
