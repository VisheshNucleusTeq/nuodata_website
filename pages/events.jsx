import Events from "../components/events";
import EventsCss from "../styles/event.module.css"
function New_Events(props) {
  return (
    <>
      <title>NuoData | New Events</title>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NuoData" />
      <meta
        property="og:description"
        content="ONE PLATFORM FOR ALL ENTERPRISE DATA MODERNIZATION & MANAGEMENT NEEDS."
      />
      <meta property="og:site_name" content="NuoData" />
      <meta property="og:url" content="https://nuodata.io/" />
      <meta
        property="og:image"
        itemProp="image"
        content="https://nuodata.io/logo.png"
      />
      <meta property="og:image:type" content="image/png" />
      <Events EventsCss={EventsCss}/>
    </>
  );
}

export default New_Events;
