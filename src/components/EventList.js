import { Link } from "react-router-dom";
import { FormatDate } from "./index";

export function EventList({ event, tour }) {
  console.log(event);
  return (
    <Link
      key={event.id}
      className="card link flex"
      to={tour ? `/tours/events/${tour.id}` : `/events/${event.id}`}
    >
      <FormatDate date={event.date} />
      <div className="head_main">
        <h2 className="name_small"><span>{event.name}</span></h2>
        {event.Place && <p className="name_large"><span>{event.Place.name}</span></p>}
      </div>
  </Link>
  );
}