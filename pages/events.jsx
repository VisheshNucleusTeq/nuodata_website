import Events from "../components/events";
import EventsCss from "../styles/event.module.css"
function New_Events(props) {
  return (
    <>
      <title>NuoData | New Events</title>
      <Events EventsCss={EventsCss}/>
    </>
  );
}

export default New_Events;
