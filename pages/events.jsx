import Events from "../components/events";
import EventNew from "../components/events/eventNew";
import EventsCss from "../styles/event.module.css"
// import EventsNewCss from "../styles/eventNew.module.css"
function New_Events(props) {
  return (
    <>
      <title>NuoData | New Events</title>
      <Events EventsCss={EventsCss}/>
      {/* <EventNew EventsCss={EventsNewCss}/> */}
    </>
  );
}

export default New_Events;
