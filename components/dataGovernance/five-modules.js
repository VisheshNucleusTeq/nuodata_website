import { Col, Row, Image, Space, Card } from "antd";

export default function FiveModules({ DataGovernanceCss }) {
  const moduleData = [
    {
      imageSrc: "/Data Governance/Explore.png",
      title: "Explore",
      description:
        "Explore your data assets to gain a deeper understanding of it with our filters",
    },
    {
      imageSrc: "/Data Governance/Quality.png",
      title: "Quality",
      description:
        "See the numbers of test cases run to segregate the success and failure cases.",
    },
    {
      imageSrc: "/Data Governance/Insights.png",
      title: "Insights",
      description:
        "Centralized location to access and analyze key metrics and insights related to data assets and user activity",
    },
    {
      imageSrc: "/Data Governance/Domains.png",
      title: "Domains",
      description:
        "Have your own subdomains and regulate the level of access even within the organization",
    },
    {
      imageSrc: "/Data Governance/Govern.png",
      title: "Govern",
      description:
        "Handle sensitive information in accordance with regulatory compliances with our algorithms that intelligently mark Personally Identifiable Information (PII).",
    },
  ];

  return (
    <div className={DataGovernanceCss.fiveModMainDiv}>
      <Space
        direction="vertical"
        className={DataGovernanceCss.fiveModMainSpace}
      >
        <h1>5 modules</h1>
        <Image
          src="/Data Management/yellow-horizontal-pipeline.png"
          preview={false}
        />
        <Row
          justify={"center"}
          align={"middle"}
          gutter={[24, 24]}
          className={DataGovernanceCss.fiveModRow}
        >
          {moduleData.map((module, index) => (
            <Col key={index} xs={24} sm={24} md={module.title === "Govern" ? 24 : 12}>
              <Card hoverable className={DataGovernanceCss.fiveModCard}>
                <Space
                  direction="vertical"
                  className={DataGovernanceCss.fiveModSpace}
                >
                  <Space direction="horizontal">
                    <Image preview={false} src={module.imageSrc} />
                    <h1>{module.title}</h1>
                  </Space>
                  {module.description}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
}
