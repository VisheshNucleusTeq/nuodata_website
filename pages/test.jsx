import React from "react";
import testCss from "../styles/test.module.css";
import { Col, Row } from "antd";
const Test = () => {
  return (
    <>
      <div className={testCss.mainDiv}>
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
      </div>

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
