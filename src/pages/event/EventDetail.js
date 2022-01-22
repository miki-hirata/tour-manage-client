import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb, Loading, EventDetail} from "../../components";
import { getEvent } from "../../apis";


export function EventDetailPage({ setHdTitle }) {
  
  const [event, setEvent] = useState(null);
  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getEvent(params.eventId).then((data) => {
      setEvent(data);
      setHdTitle(data.name);
    });
  }, [params.eventId]);

  return (
    <>
      <div className="event_section">
        {event == null ? (
          <Loading />
        ) : (
          <EventDetail
            event={event}
          />
        )}
      </div>
    </>
  );
}
