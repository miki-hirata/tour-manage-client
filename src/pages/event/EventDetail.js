import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MainArea, Loading, EventDetail} from "../../components";
import { getEvent, getEventSches } from "../../apis";


export function EventDetailPage({ setHdTitle }) {
  
  const [event, setEvent] = useState(null);
  const [sches, setSches] = useState(null);
  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getEventSches(params.eventId).then((data) =>{ 
      setSches(data);
    });
    getEvent(params.eventId).then((data) => {
      setEvent(data);
      setHdTitle(data.name);
    });
  }, [params.eventId]);

  return (
    <>
      {event == null ? (
        <Loading />
      ) : (
        <MainArea>
          <EventDetail
            event = {event}
            sches = {sches}
          />
        </MainArea>
      )}
    </>
  );
}
