import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainArea, Loading, EventList, StyledCard, CardInner } from "../../components";
import { getPlaceEvents } from "../../apis";

export function PlaceEventPage({ }) {
  const [events, setEvents] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlaceEvents(params.placeId).then((data) => {
      if (!unmounted) {
        setEvents(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

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
                <p>この会場での公演履歴はありません</p>
              </CardInner>
            </StyledCard>
          ) : (
            events.map((event) => {
              return <EventList key={event.id} event={event} />;
            })
          )}
        </>
      )}
    </MainArea>
  );
}

