import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Header, Loading, EventList } from "../../components";
import { getEvents } from "../../apis";


export function EventListPage({ setHdTitle }) {
  const [events, setEvents] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  setHdTitle('イベント一覧')
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
      {/* <Header /> */}
      <main>
        {events == null ? (
          <Loading />
        ) : (
          <section className="event_section">
            {events.map((event) => {
              return <EventList key={event.id} event={event} />;
            })}
          </section>
        )}
      </main>
    </>
  );
}
