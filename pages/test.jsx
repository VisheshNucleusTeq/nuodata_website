import React, { useState } from "react";
import { Input, Button } from "antd";
const { TextArea } = Input;
import AnalyzeDetailPopup from "../components/dataModernization/graphView/analyzeDetailPopup";
const Test = () => {
  const [modalData, setModalData] = useState({});
  const [data, setData] = useState({});

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
        Primary Button
      </Button>
      {/* {JSON.stringify(modalData)} */}
      {modalData?.Edges ? (
        <AnalyzeDetailPopup
          outputFileId={"outputFileId"}
          data={modalData}
          showPopUp={true}
        />
      ) : null}
    </div>
  );
};

export default Test;
