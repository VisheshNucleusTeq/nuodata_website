import ArcCard from "../arcCard";
export default function SixFoundations({ DataGovernanceCss }) {
  const timelineData = [
    {
      mainTitle: "Built on the 6 foundations",
      arcData: [
        // {
        //   imageSrc: "/data_governance/data_discovery.svg",
        //   title: "Data Discovery",
        // },
        // {
        //   imageSrc: "/data_governance/data_collaboration.svg",
        //   title: "Data Collaboration",
        // },
        // {
        //   imageSrc: "/data_governance/data_quality.svg",
        //   title: "Data Quality and Profiler",
        // },
        // {
        //   imageSrc: "/data_governance/data_lineage.svg",
        //   title: "Data Lineage",
        // },
        // {
        //   imageSrc: "/data_governance/data_insights.svg",
        //   title: "Data Insights",
        // },
        // {
        //   imageSrc: "/data_governance/data_governance.svg",
        //   title: "Data Governance",
        // },
      ],
    },
  ];
  return (
    <>
      {timelineData.map((data, index) => (
        <ArcCard
          key={index}
          DataManagementCss={DataGovernanceCss}
          mainImage={data.mainImage}
          mainTitle={data.mainTitle}
          arcData={data.arcData}
        />
      ))}
    </>
  );
}
