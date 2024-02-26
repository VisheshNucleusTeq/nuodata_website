import ArcCard from "../arcCard";
export default function SixFoundations({ DataGovernanceCss }) {
  const timelineData = [
    {
      mainTitle: "Built on the 6 foundations",
      arcData: [
        {
          imageSrc: "/Data Management/Data Discovery.svg",
          title: "Data Discovery",
        },
        {
          imageSrc: "/Data Management/Data Collaboration.svg",
          title: "Data Collaboration",
        },
        {
          imageSrc: "/Data Management/Data Quality.svg",
          title: "Data Quality and Profiler",
        },
        {
          imageSrc: "/Data Management/Data Lineage.svg",
          title: "Data Lineage",
        },
        {
          imageSrc: "/Data Management/Data Insights.svg",
          title: "Data Insights",
        },
        {
          imageSrc: "/Data Management/Data Governance.svg",
          title: "Data Governance",
        },
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
