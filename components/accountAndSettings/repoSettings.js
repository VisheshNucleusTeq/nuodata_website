import { Card, Col, Row, Image, Tooltip } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RepoSettings = ({ RepoSettingsCss }) => {
  const router = useRouter();

  const [accountList, setAccountList] = useState([
    {
      name: "Github",
      image: "/account_and_settings/github.svg",
      url: "http://localhost:4000/account-and-settings/github-check-in/",
      isDisable: false,
    },
    {
      name: "GitLab",
      image: "/account_and_settings/gitlab.svg",
      url: "http://localhost:4000/account-and-settings/github-check-in/",
      isDisable: true,
    },
    {
      name: "BitBucket",
      image: "/account_and_settings/bitbucket.svg",
      url: "http://localhost:4000/account-and-settings/github-check-in/",
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
                        alt={e.name}
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

export default RepoSettings;
