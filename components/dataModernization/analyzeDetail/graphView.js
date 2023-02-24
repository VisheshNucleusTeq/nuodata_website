import React, { useState } from "react";
import { Row, Col, Tree, Input } from "antd";
import {
  FormOutlined,
  DownOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

import AnalyzeDetailPopup from "../analyzeDetailPopup";

const GraphView = ({ modalData, showPopUp }) => {
  const [outputFileId, setOutputFileId] = useState();
  const [treeData, setTreeData] = useState([
    {
      title: "parent 1",
      key: "0-0",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          icon: <CarryOutOutlined />,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              icon: <CarryOutOutlined />,
            },
            {
              title: "demo",
              key: "0-0-0-1",
              icon: <CarryOutOutlined />,
            },
            {
              title: "leaf",
              key: "0-0-0-2",
              icon: <CarryOutOutlined />,
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          icon: <CarryOutOutlined />,
          children: [
            {
              title: "leaf",
              key: "0-0-1-0",
              icon: <CarryOutOutlined />,
            },
          ],
        },
        {
          title: "parent 1-2",
          key: "0-0-2",
          icon: <CarryOutOutlined />,
          children: [
            {
              title: "leaf",
              key: "0-0-2-0",
              icon: <CarryOutOutlined />,
            },
            {
              title: "leaf",
              key: "0-0-2-1",
              icon: <CarryOutOutlined />,
              switcherIcon: <FormOutlined />,
            },
          ],
        },
      ],
    },
    {
      title: "parent 2",
      key: "0-1",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "parent 2-0",
          key: "0-1-0",
          icon: <CarryOutOutlined />,
          children: [
            {
              title: "leaf",
              key: "0-1-0-0",
              icon: <CarryOutOutlined />,
            },
            {
              title: "leaf",
              key: "0-1-0-1",
              icon: <CarryOutOutlined />,
            },
          ],
        },
      ],
    },
  ]);

  const [treeDataDefault, setTreeDataDefault] = useState(treeData);

  const filter = (array, text) => {
    const getNodes = (result, object) => {
      if (object.title.toLowerCase().includes(text.toLowerCase())) {
        result.push(object);
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

  return (
    <>
      {modalData ? (
        <Row>
          {/* <Col span={4} style={{ backgroundColor: "#0c3246", height: "85vh" }}>
            <Input
              placeholder="Search"
              onKeyUp={(e) => {
                const filterData = filter(treeDataDefault, e.target.value);
                setTreeData(filterData);
              }}
              style={{ height: "5vh", border: "1px solid #0c3246" }}
            />
            <Tree
              className="treeCss"
              defaultExpandAll={true}
              style={{
                color: "#FFF",
                paddingTop: "2vh",
                backgroundColor: "#0c3246",
                height: "80vh",
                overflowY: "scroll",
              }}
              showLine
              switcherIcon={<DownOutlined />}
              onSelect={(e) => {
                alert(e);
              }}
              treeData={treeData}
            />
          </Col> */}
          <Col span={24} style={{ height: "85vh", paddingLeft: "1vw" }}>
            <AnalyzeDetailPopup
              outputFileId={outputFileId}
              data={modalData}
              showPopUp={showPopUp}
            />
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default GraphView;
