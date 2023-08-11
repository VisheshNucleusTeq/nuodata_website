import React from "react";
import testCss from "../styles/test.module.css";
import { Col, Row } from "antd";
const Test = () => {
  return (
    <>
      <Row align={"center"}>
        {Array(3)
          .fill(undefined)
          .map((data, i) => {
            return (
              <Col span={8} style={{ height: "36vw", border: "1px solid red", paddingLeft: "4vw",
              paddingRight: "4vw", }}>
                <Row
                  style={{
                    
                    border: "1px solid red",
                  }}
                  className={testCss.bgImage}
                >
                  {/* <Col
                    span={24}
                    style={{ height: "20vw", backgroundColor: "" }}
                  >
                    blank
                  </Col> */}
                  <Col
                    span={24}
                    style={{ height: "16vw", backgroundColor: "red", marginTop : "20vw" }}
                    className={testCss.textcssView}
                  >
                    text
                  </Col>
                </Row>
              </Col>
            );
          })}
      </Row>
      {/* <div className={testCss.mainDiv}>
        <div className={testCss.childDiv}>
          <Row>
            <Col span={24} className={testCss.childDiv1}>
              <div
                className={`${testCss.childDivData} ${testCss.childDivData1}`}
              >
                <div className={testCss.dataView}>
                  <div className={testCss.dataViewImage}>
                    <div className={testCss.iconView}>5</div>
                  </div>
                  <div className={testCss.iconViewText}>
                    <div>
                      <h1 className={testCss.h1text}>Title title</h1>
              
                      <p className={testCss.ptext}>Title title title</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24} className={testCss.childDiv2}>
              <div
                className={`${testCss.childDivData} ${testCss.childDivData2}`}
              ></div>
            </Col>
            <Col span={24} className={testCss.childDiv3}>
              <div
                className={`${testCss.childDivData} ${testCss.childDivData3}`}
              ></div>
            </Col>
          </Row>
        </div>
      </div> */}

      {/* <div className={testCss.mainDiv}>
        <div className={testCss.childDiv}></div>
      </div> */}

      {/* <div className={testCss.mainDivMobile}>
        <Row>
          <Col span={24} className={testCss.childDiv11}>
            <div
              className={`${testCss.childDivData111}`}
            ></div>
          </Col>

          <Col span={24} className={testCss.childDiv11}>
            <div
              className={`${testCss.childDivData111}`}
            ></div>
          </Col>

          <Col span={24} className={testCss.childDiv11}>
            <div
              className={`${testCss.childDivData111}`}
            ></div>
          </Col>
          
        </Row>
      </div> */}
    </>
  );
};

export default Test;

// import React, { useState } from "react";
// import { Input, Button } from "antd";
// const { TextArea } = Input;
// import AnalyzeDetailPopup from "../components/dataModernization/graphView/analyzeDetailPopup";
// const Test = () => {
//   const [modalData, setModalData] = useState({});
//   const [data, setData] = useState({});

//   const handleMessageChange = (event) => {
//     setData(event.target.value);
//   };

//   return (
//     <div>
//       <TextArea rows={4} onChange={handleMessageChange} />
//       <Button
//         type="primary"
//         onClick={() => {
//           try {
//             setModalData(JSON.parse(data));
//           } catch (error) {
//             setModalData(data);
//           }
//         }}
//       >
//         Primary Button
//       </Button>
//       {/* {JSON.stringify(modalData)} */}
//       {modalData?.Edges ? (
//         <AnalyzeDetailPopup
//           outputFileId={"outputFileId"}
//           data={modalData}
//           showPopUp={true}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default Test;
