import React, { useState } from "react";
import { Row, Col, Tree, Input } from "antd";
import {
  ArrowRightOutlined,
  DownOutlined,
  FolderOutlined,
} from "@ant-design/icons";

import AnalyzeDetailPopup from "../analyzeDetailPopup";

const GraphView = ({ modalData, showPopUp }) => {
  const [outputFileId, setOutputFileId] = useState();
  const [treeData, setTreeData] = useState([
    {
      title: "aa",
      key: (Math.random() + 1).toString(36).substring(7),
      children: [
        {
          title: "bb",
          key: (Math.random() + 1).toString(36).substring(7),
          children: [
            {
              title: "cc",
              key: (Math.random() + 1).toString(36).substring(7),
            },
            {
              title: "dd",
              key: (Math.random() + 1).toString(36).substring(7),
            },
            {
              title: "ee",
              key: (Math.random() + 1).toString(36).substring(7),
              children: [
                {
                  title: "ff",
                  key: (Math.random() + 1).toString(36).substring(7),
                },
                {
                  title: "gg",
                  key: (Math.random() + 1).toString(36).substring(7),
                  children: [
                    {
                      title: "ii",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "jj",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "kk",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                  ],
                },
                {
                  title: "hh",
                  key: (Math.random() + 1).toString(36).substring(7),
                  children: [
                    {
                      title: "ll",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "mm",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "aaa",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "sdf",
      key: (Math.random() + 1).toString(36).substring(7),
      children: [
        {
          title: "sd55f456sd",
          key: (Math.random() + 1).toString(36).substring(7),
          children: [
            {
              title: "r8vb",
              key: (Math.random() + 1).toString(36).substring(7),
            },
            {
              title: "cvb4cv9",
              key: (Math.random() + 1).toString(36).substring(7),
            },
            {
              title: "hk8m54",
              key: (Math.random() + 1).toString(36).substring(7),
              children: [
                {
                  title: "awds",
                  key: (Math.random() + 1).toString(36).substring(7),
                },
                {
                  title: "sdcl",
                  key: (Math.random() + 1).toString(36).substring(7),
                  children: [
                    {
                      title: "spod",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "vjoidjf",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "qplm",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                  ],
                },
                {
                  title: "fpopskd",
                  key: (Math.random() + 1).toString(36).substring(7),
                  children: [
                    {
                      title: "dkfkd",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "fgkbbdfj",
                      key: (Math.random() + 1).toString(36).substring(7),
                    },
                    {
                      title: "0000",
                      key: (Math.random() + 1).toString(36).substring(7),
                      children: [
                        {
                          title: "787878",
                          key: (Math.random() + 1).toString(36).substring(7),
                        },
                      ],
                    },
                  ],
                },
              ],
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
          <Col span={6} style={{ backgroundColor: "#0c3246", height: "90vh" }}>
            <Input
              placeholder="Search"
              onKeyUp={(e) => {
                const tDdata = JSON.parse(JSON.stringify(treeDataDefault));
                const filterData = filter(tDdata, e.target.value);
                setTreeData(filterData);
              }}
              style={{ height: "5vh" }}
            />
            <Tree
              className="treeCss"
              defaultExpandAll={true}
              style={{
                color: "#FFF",
                padding: "5vh",
                backgroundColor: "#0c3246",
                height: "85vh",
                overflow: "scroll",
              }}
              showLine
              switcherIcon={<DownOutlined />}
              onSelect={(e) => {
                alert(e);
              }}
              treeData={treeData}
            />
          </Col>
          <Col span={18} style={{ height: "90vh" }}>
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
