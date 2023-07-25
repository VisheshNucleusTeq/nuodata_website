import { Card, Col, Row, Image, Tooltip, message } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const RepoSettings = ({ RepoSettingsCss }) => {
  const router = useRouter();

  const [accountList, setAccountList] = useState([
    {
      name: "Github",
      image: "/account_and_settings/github.svg",
      url: "/account-and-settings/github-check-in/",
      isDisable: false,
    },
    {
      name: "GitLab",
      image: "/account_and_settings/gitlab.svg",
      url: "/account-and-settings/github-check-in/",
      isDisable: true,
    },
    {
      name: "BitBucket",
      image: "/account_and_settings/bitbucket.svg",
      url: "/account-and-settings/github-check-in/",
      isDisable: true,
    },
  ]);

  const redirectFun = (url) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (["nuodata_admin", "biz_master_admin"].includes(authData?.roleName)) {
      router.push(url);
    } else {
      message.info({
        key: "permission",
        content:
          "You don't have permission, Please contact your admin!",
        duration: 10,
      });
    }
  };

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
                          !e.isDisable ? redirectFun(e?.url) : null;
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
