import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MainArea, Loading, EventList } from "../../components";
import { getEvents } from "../../apis";


export function EventListPage({ setHdTitle }) {
  const [events, setEvents] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  
  useEffect(() => {
    getEvents({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setEvents(data);
    });
  }, [page]);

  return (
    <>
    {events == null ? (
      <Loading />
    ) : (
      <MainArea>
        {events.map((event) => {
          return <EventList key={event.id} event={event} />;
        })}
      </MainArea>
    )}
    </>
  );
}
