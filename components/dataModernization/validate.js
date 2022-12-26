import { Row, Col, Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
export default function Validate({ dataModernizationCss }) {
  const [selectedTab, setSelecterTab] = useState("uploadTestData");

  return (
    <>
      <Row className={dataModernizationCss.validateTab}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className={dataModernizationCss.validateTabFirst}
          onClick={() => {
            setSelecterTab("uploadTestData");
          }}
        >
          Upload Test Data
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className={dataModernizationCss.validateTabSecond}
          onClick={() => {
            setSelecterTab("validate");
          }}
        >
          Validate
        </Col>
      </Row>
      {selectedTab === "uploadTestData" && (
        <>
          <Row className={dataModernizationCss.validateTab}>
            <Col span={24} className={dataModernizationCss.downloadData}>
              <Button type="default">
                Download Data Input Sheet <DownloadOutlined />
              </Button>
            </Col>
          </Row>

          <Row className={dataModernizationCss.validateTab}>
            <Col span={24}>
              <Table
                pagination={false}
                className="demo"
                columns={[
                  {
                    title: "Table",
                    dataIndex: "table",
                    key: "table",
                  },
                  {
                    title: "Acct Name",
                    dataIndex: "acctName",
                    key: "acctName",
                  },
                  {
                    title: "Acct Nbr",
                    dataIndex: "acctNbr",
                    key: "acctNbr",
                  },
                  {
                    title: "Acct Addr",
                    dataIndex: "acctAddr",
                    key: "acctAddr",
                  },
                  {
                    title: "Acct Zip",
                    dataIndex: "acctZip",
                    key: "acctZip",
                  },
                ]}
                dataSource={[
                  {
                    table: "AcctNbr_table1",
                    acctName: "String",
                    acctNbr: "String",
                    acctAddr: "String",
                    acctZip: "String",
                  },
                ]}
              />
            </Col>
          </Row>

          <Row className={dataModernizationCss.validateTab}>
            <Col span={24}>
              <Table
                pagination={false}
                className="demo"
                columns={[
                  {
                    title: "Table",
                    dataIndex: "table",
                    key: "table",
                  },
                  {
                    title: "Acct Name",
                    dataIndex: "acctName",
                    key: "acctName",
                  },
                  {
                    title: "Acct Nbr",
                    dataIndex: "acctNbr",
                    key: "acctNbr",
                  },
                  {
                    title: "Acct Addr",
                    dataIndex: "acctAddr",
                    key: "acctAddr",
                  },
                  {
                    title: "Acct Zip",
                    dataIndex: "acctZip",
                    key: "acctZip",
                  },
                ]}
                dataSource={[
                  {
                    table: "AcctNbr_table1",
                    acctName: "String",
                    acctNbr: "String",
                    acctAddr: "String",
                    acctZip: "String",
                  },
                ]}
              />
            </Col>
          </Row>
        </>
      )}

      {selectedTab === "validate" && <p>Validate</p>}
    </>
  );
}

// // Validate
// import {
//   Button,
//   Row,
//   Col,
//   Form,
//   Input,
//   Select,
//   message,
//   Upload,
//   Card,
//   Table,
//   Carousel,
//   Tabs,
// } from "antd";
// import { useState } from "react";

// const { TabPane } = Tabs;

// import {
//   UploadOutlined,
//   LeftCircleOutlined,
//   RightCircleOutlined,
//   DownloadOutlined,
// } from "@ant-design/icons";

// const dataSource2 = [
//   {
//     key: "1",
//     table: "AcctNbr_table1",
//     acct_name: "String",
//     acct_nbr: "String",
//     acct_addr: "String",
//     acct_zip: "String",
//   },
// ];

// const columns2 = [
//   {
//     title: "Table",
//     dataIndex: "table",
//     key: "table",
//   },
//   {
//     title: "Acct_name",
//     dataIndex: "acct_name",
//     key: "acct_name",
//   },
//   {
//     title: "Acct_nbr",
//     dataIndex: "acct_nbr",
//     key: "acct_nbr",
//   },
//   {
//     title: "Acct_addr",
//     dataIndex: "acct_addr",
//     key: "acct_addr",
//   },
//   {
//     title: "Acct_zip",
//     dataIndex: "acct_zip",
//     key: "acct_zip",
//   },
// ];

// const dataSource3 = [
//   {
//     key: "1",
//     table: "AcctNbr_table2",
//     acct_name: "String",
//     acct_nbr: "int",
//     acct_addr: "Big_int",
//     acct_zip: "String",
//   },
// ];

// const columns3 = [
//   {
//     title: "Table",
//     dataIndex: "table",
//     key: "table",
//   },
//   {
//     title: "Acct_name",
//     dataIndex: "acct_name",
//     key: "acct_name",
//   },
//   {
//     title: "Acct_nbr",
//     dataIndex: "acct_nbr",
//     key: "acct_nbr",
//   },
//   {
//     title: "Acct_addr",
//     dataIndex: "acct_addr",
//     key: "acct_addr",
//   },
//   {
//     title: "Acct_zip",
//     dataIndex: "acct_zip",
//     key: "acct_zip",
//   },
// ];

// export default function Validate({ dataModernizationCss }) {
//   const [activeKey, setActiveKey] = useState("1");
//   const onKeyChange = (key) => setActiveKey(key);

//   return (
//     <>
//       <Row>
//         <Button
//           type="primary"
//           danger
//           className={dataModernizationCss.uploadTestData}
//           onClick={() => onKeyChange("1")}
//         >
//           Upload Test Data
//         </Button>
//         <Button
//           type="primary"
//           danger
//           className={dataModernizationCss.validate}
//           onClick={() => onKeyChange("2")}
//         >
//           Validate
//         </Button>
//       </Row>
//       <Tabs
//         centered
//         type="button"
//         defaultActiveKey="1"
//         activeKey={activeKey}
//         onChange={onKeyChange}
//       >
//         <TabPane tab="" key="1" disabled>
//           <Col>
//             <Row style={{ justifyContent: "flex-end" }}>
//               <Button
//                 type="primary"
//                 className={dataModernizationCss.downloadData}
//               >
//                 Download Data Input Sheet
//                 <DownloadOutlined />
//               </Button>
//             </Row>

//             <Row>
//               <Card className={dataModernizationCss.tab}>
//                 <Table dataSource={dataSource2} columns={columns2} />
//               </Card>
//             </Row>

//             <Row>
//               <Card className={dataModernizationCss.tab}>
//                 <Table dataSource={dataSource3} columns={columns3} />
//               </Card>
//             </Row>

//             <div className={dataModernizationCss.nextExitBtn}>
//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.nextBtn}
//                 htmlType="submit"
//               >
//                 Upload Data Sheet
//               </Button>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.nextBtn}
//                 htmlType="submit"
//               >
//                 Validate
//               </Button>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.exitBtn}
//               >
//                 Save & Exit
//               </Button>
//             </div>
//           </Col>
//         </TabPane>
//         <TabPane tab="" key="2" disabled>
//           <Col>
//             <Row style={{ justifyContent: "flex-end" }}>
//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.downloadData}
//               >
//                 Run
//               </Button>
//             </Row>
//             <Row
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "30vh",
//               }}
//             >
//               <b>Input Graph</b>
//             </Row>
//             <div className={dataModernizationCss.nextExitBtn}>
//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.nextBtn}
//                 htmlType="submit"
//               >
//                 Signoff & Approve
//               </Button>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.nextBtn}
//                 htmlType="submit"
//               >
//                 Rollout
//               </Button>

//               <Button
//                 type="primary"
//                 danger
//                 className={dataModernizationCss.exitBtn}
//               >
//                 Save & Exit
//               </Button>
//             </div>
//           </Col>
//         </TabPane>
//       </Tabs>
//     </>
//   );
// }
