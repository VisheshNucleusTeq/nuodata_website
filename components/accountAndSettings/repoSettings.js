import { Card, Col, Row, Image } from "antd";
import { useRouter } from "next/router";
import React from "react";

const RepoSettings = ({ RepoSettingsCss }) => {
  const router = useRouter();
  return (
    <div className={RepoSettingsCss.main}>
      <h1>Repo Settings</h1>
      <Card className="demoCard">
        <Row align={"centere"}>
          {
            //   Array(5)
            //     .fill(undefined)

            [
              {
                name: "github",
                image: "https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png",
                url: "http://localhost:4000/account-and-settings/github-check-in/",
                isDisable: false,
              },
              {
                name: "github",
                image: "https://placehold.co/500x500?text=GitLab",
                url: "http://localhost:4000/account-and-settings/github-check-in/",
                isDisable: true,
              },
              {
                name: "github",
                image: "https://placehold.co/500x500?text=BitBucket",
                url: "http://localhost:4000/account-and-settings/github-check-in/",
                isDisable: true,
              },
            ].map((e) => {
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
                    <Image
                      onClick={() => {
                        !e.isDisable ? router.push(e.url) : null;
                      }}
                      src={e.image}
                      preview={false}
                    />
                    </div>
                  </div>
                </Col>
              );
            })
          }
        </Row>
      </Card>
    </div>
  );
};

export default RepoSettings;
