import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainArea, Loading, EventList, StyledCard, CardInner} from "../../components";
import { getTourEvents } from "../../apis";

export function TourEventPage({ tour }) {
  const [events, setEvents] = useState(null);
  const params = useParams();
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getTourEvents(params.tourId).then((data) => {
      if (!unmounted) {
        setEvents(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [params.tourId]);

  return (
    <MainArea>
      {events == null ? (
        <Loading />
      ) : (
        <>
          {events[0] == null ? (
            <StyledCard
              variant="outlined"
            >
              <CardInner>
                <p>イベントが登録されていません</p>
              </CardInner>
            </StyledCard>
          ) : (
            events.map((event) => {
              return <EventList key={event.id} event={event} tour={tour}/>;
            })
          )}
        </>
      )}
    </MainArea>
  );
}

