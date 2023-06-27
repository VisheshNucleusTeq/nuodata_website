import { Card, Col, Row, Image, Tooltip } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TargetPlatform = ({ RepoSettingsCss }) => {
  const router = useRouter();

  const [accountList, setAccountList] = useState([
    {
      name: "Databricks-Lakehouse",
      image: "/account_and_settings/databricks.png",
      url: "#",
      isDisable: true,
    },
    {
      name: "Google Cloud Platform",
      image: "/account_and_settings/Google-cloud.png",
      url: "#",
      isDisable: true,
    },
    {
      name: "AWS",
      image: "/account_and_settings/aws.png",
      url: "#",
      isDisable: true,
    },
    {
      name: "Azure",
      image: "/account_and_settings/azure.png",
      url: "#",
      isDisable: true,
    },
    {
      name: "Snowflake",
      image: "/account_and_settings/snowflake.png",
      url: "#",
      isDisable: true,
    },
    {
      name: "IBM Watsonx.data",
      image: "/account_and_settings/IBM-watsonx.data.png",
      url: "#",
      isDisable: true,
    },
  ]);

  return (
    <div className={RepoSettingsCss.main}>
      <h1>Repo Settings</h1>
      <Card className="demoCard">
        <Row align={"center"}>
          {accountList.map((e) => {
            return (
              <Col span={6}>
                <div
                  className={
                    e.isDisable
                      ? RepoSettingsCss.notClickDiv
                      : RepoSettingsCss.clickDiv
                  }
                >
                  <div>
                    <Tooltip title={e.name} color="#0c3246">
                      <Image
                        alt="sdfsdf"
                        onClick={() => {
                          !e.isDisable ? router.push(e.url) : null;
                        }}
                        src={e.image}
                        preview={false}
                      />
                    </Tooltip>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};

export default TargetPlatform;
