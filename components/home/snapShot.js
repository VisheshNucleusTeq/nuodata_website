import React from "react";
import SnapShotRightImage from "./snapShotRightImage";
import SnapShotLeftImage from "./snapShotLeftImage";

const SnapShotData = [
  {
    title: "Catalog",
    description:
      "Our intuitive system allows you to seamlessly categorize, classify, and manage your data assets, empowering you to unlock valuable insights with ease. Say goodbye to data chaos and hello to streamlined data governance with our comprehensive cataloging and data discovery solution.",
    imageSrc: "/newAssets/home/snapshot/CatalogImg.png",
    iconSrc: "/newAssets/home/snapshot/CatalogIcon.svg",
  },
  {
    title: "Lineage",
    description:
      "Experience the power of transparency and traceability. Traces the path of your data across tables, pipelines, and dashboards. Gain confidence in your data's journey and make informed decisions with clarity and precision",
    imageSrc: "/newAssets/home/snapshot/LineageImg.png",
    iconSrc: "/newAssets/home/snapshot/LineageIcon.svg",
  },
  {
    title: "Governance",
    description:
      "From a secure SSO to all NuoData platforms to enforcing compliance, we provide the tools needed to ensure data integrity, security, and regulatory adherence. Elevate your organization's data stewardship practices and embark on a journey towards trustworthy, actionable insights.",
    imageSrc: "/newAssets/home/snapshot/GovernanceImg.png",
    iconSrc: "/newAssets/home/snapshot/GovernanceIcon.svg",
  },
  {
    title: "MDM & Customer 360",
    description:
      "O An end-to-end experience! Seamlessly integrate, explore, manipulate, and govern your data from start to finish, without leaving the NuoData platform.",
    imageSrc: "/newAssets/home/snapshot/MDM & Customer 360Img.png",
    iconSrc: "/newAssets/home/snapshot/MDM & Customer 360Icon.svg",
  },
  {
    title: "Data AI/ML",
    description:
      "Unlock the potential of your data with our AI/ML studio, equipped with a user-friendly drag-and-drop interface. Harness the power of machine learning effortlessly—create, analyze, and receive business recommendations using our robust ML models, all without the need for coding expertise. Streamline your journey from data to insights and make informed decisions with ease.",
    imageSrc: "/newAssets/home/snapshot/Data AIMLImg.png",
    iconSrc: "/newAssets/home/snapshot/Data AIMLIcon.svg",
  },
  {
    title: "Data Operations",
    description:
      " An end-to-end experience! Seamlessly integrate, explore, manipulate, and govern your data from start to finish, without leaving the NuoData platform.",
    imageSrc: "/newAssets/home/snapshot/Data OperationsImg.png",
    iconSrc: "/newAssets/home/snapshot/Data OperationsIcon.svg",
  },
  {
    title: "Data Engineering",
    description:
      "Unlock the potential of your data with our AI/ML studio, equipped with a user-friendly drag-and-drop interface. Harness the power of machine learning effortlessly—create, analyze, and receive business recommendations using our robust ML models, all without the need for coding expertise. Streamline your journey from data to insights and make informed decisions with ease.",
    imageSrc: "/newAssets/home/snapshot/Data EngineeringImg.png",
    iconSrc: "/newAssets/home/snapshot/Data EngineeringIcon.svg",
  },
];

function SnapShot({HomeCss}) {
  return (
    <>
      {SnapShotData.map((val, index) => {
        return index % 2 == 0 ? (
          <SnapShotRightImage
            key={index}
            HomeCss={HomeCss}
            title={val.title}
            description={val.description}
            iconSrc={val.iconSrc}
            imageSrc={val.imageSrc}
          />
        ) : (
          <SnapShotLeftImage
            key={index}
            HomeCss={HomeCss}
            title={val.title}
            description={val.description}
            iconSrc={val.iconSrc}
            imageSrc={val.imageSrc}
          />
        );
      })}
    </>
  );
}

export default SnapShot;
