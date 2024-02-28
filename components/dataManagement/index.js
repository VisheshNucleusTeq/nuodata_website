import DataManagementCss from "../../styles/dataManagement.module.css";
import Info from "./info";
import ArcCard from "../arcCard";
import Footer from "../common/footer";
export default function DataManagement() {
  const timelineData = [
    {
      mainImage: "/data_management/arc_card_icons/Data Catalog.svg",
      mainTitle: "Data Catalog",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Metadata Management.svg",
          title: "Metadata Management",
          text: "Understand your metadata landscape in the best possible way with our Governance module.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Data Discovery.svg",
          title: "Data Discovery",
          text: "Unlock the potential of your data by effortlessly locating and understanding relevant information with our intuitive data discovery tools.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Data Lineage.svg",
          title: "Data Lineage",
          text: "Trace the origins and transformations of your data with precision, ensuring transparency, compliance, and trustworthiness throughout its lifecycle, from source to destination.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Data Security.svg",
      mainTitle: "Data Security",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Role Based Access.svg",
          title: "Role Based Access",
          text: "Safeguard your data integrity and confidentiality by implementing role-based access controls, granting appropriate permissions to users based on their roles and responsibilities",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Compliance & PII.svg",
          title: "Compliance & PII",
          text: "Ensure adherence to regulatory standards with NuoData’s intelligent feature that automatically detects Personally Identifiable Information (PII)",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Policy Admin.svg",
          title: "Policy Admin",
          text: "Streamline administrative tasks by implementing efficient policies that govern data management processes.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Data Governance.svg",
      mainTitle: "Data Governance",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Data Stewardship.svg",
          title: "Data Stewardship",
          text: "Uphold the integrity and security of data assets throughout their lifecycle, assigning responsible stewards to oversee their usage, maintenance, and compliance.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Data Policy.svg",
          title: "Data Policy",
          text: "Establish comprehensive guidelines and protocols dictating the handling, storage, and utilization of data assets within your organization to ensure consistency and compliance.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Workflow.svg",
          title: "Workflow",
          text: "Optimize data workflows and automate its scheduling for smooth execution and transition between tasks.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Data Lineage.svg",
      mainTitle: "Data Lineage",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Graph Lineage.svg",
          title: "Graph Lineage",
          text: "Visualize the lineage of data elements through graphical representations, facilitating transparency and understanding of data origins and transformations.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Code Lineage.svg",
          title: "Code Lineage",
          text: "Track the lineage of code changes and implementations, ensuring accountability and facilitating the understanding of code evolution and dependencies.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Impact Analysis.svg",
          title: "Impact Analysis",
          text: "Assess the potential repercussions of data and system changes, enabling informed decision-making and risk mitigation strategies.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Data Quality.svg",
      mainTitle: "Data Quality",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Data Profiling.svg",
          title: "Data Profiling",
          text: "Gain insights into the characteristics and quality of data through our systematic examination, enabling better understanding and utilization of data assets.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Data Analysis.svg",
          title: "Data Analysis",
          text: "Uncover valuable insights and trends within datasets through advanced analytics techniques, empowering data-driven decision-making and strategy formulation.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Data Validation.svg",
          title: "Data Validation",
          text: "Ensure data integrity and reliability through systematic validation processes, minimizing errors to help you make decisions confidently.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Ingestion.svg",
      mainTitle: "Ingestion",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Batch Ingestion.svg",
          title: "Batch Ingestion",
          text: "Efficiently process large volumes of data at desired scheduled intervals, enabling systematic data collection and analysis.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Real-time ingestion.svg",
          title: "Real-time ingestion",
          text: "Capture and process data in near real-time, allowing organizations to react promptly to events and trends as they occur, enhancing agility and responsiveness.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/IoT.svg",
          title: "IoT",
          text: "Data transcends physical boundaries! Harness the power of connected devices to gather valuable data from the physical world, enabling insights and innovations across industries and applications.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Transformation.svg",
      mainTitle: "Transformation",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/No-Code Pipelines.svg",
          title: "No-Code Pipelines",
          text: " NuoData is a low code no code platform! Users can design and deploy data pipelines without extensive coding knowledge, accelerating time-to-insight and democratizing data access.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Wrangling.svg",
          title: "Wrangling",
          text: " Transform that raw, messy data into structured formats suitable for analysis, simplifying the data preparation process.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Refinement.svg",
          title: "Refinement",
          text: "Fine grain amelioration of the data quality and usability through iterative processes of cleaning, enriching, and organizing data, ensuring its suitability for analysis and decision-making.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Operations.svg",
      mainTitle: "Operations",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/Observability.svg",
          title: "Observability",
          text: "Gain a bird's eye view insights into the performance and health of systems and processes, facilitating proactive monitoring, troubleshooting, and optimization efforts.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/DevOps  CICD.svg",
          title: "DevOps / CICD",
          text: "Rapidly integrate development, operations, and continuous integration/continuous deployment practices to streamline software delivery pipelines and ensure reliable releases.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/AI  ML Ops.svg",
          title: "AI / ML Ops",
          text: "Manage and operationalize machine learning models and pipelines at scale, facilitating their deployment, monitoring, and maintenance in production environments.",
        },
      ],
    },
    {
      mainImage: "/data_management/arc_card_icons/Federation.svg",
      mainTitle: "Federation",
      arcData: [
        {
          imageSrc: "/data_management/arc_card_icons/APIs Dockers EKS.svg",
          title: "APIs Dockers / EKS",
          text: "Utilize containerization and orchestration technologies like Docker and Amazon EKS to deploy and manage scalable, portable applications and services.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/BI  Reporting.svg",
          title: "BI / Reporting",
          text: "Our AI/ML studio culminates into business intelligence! Generate actionable insights and visualizations from data to support decision-making processes, enabling stakeholders to extract value and drive business outcomes.",
        },
        {
          imageSrc: "/data_management/arc_card_icons/Self Service.svg",
          title: "Self Service",
          text: "Fostering a culture of self service and no external interference in your data-driven decision-making. The portal is self service, self sufficient and intuitive for users of all technical skills across your organization.",
        },
      ],
    },
  ];
  return (
    <>
      <Info DataManagementCss={DataManagementCss} />
      {timelineData.map((data) => (
        <ArcCard
          key={data.mainTitle}
          mainImage={data.mainImage}
          mainTitle={data.mainTitle}
          arcData={data.arcData}
        />
      ))}

      <Footer />
    </>
  );
}
