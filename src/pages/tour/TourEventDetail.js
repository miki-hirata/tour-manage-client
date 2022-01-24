import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainArea, Loading, EventDetail, TabArea, StyledTabs, StyledTab } from "../../components";
import { getTour, getTourEvents, getEventSches } from "../../apis";
import { format } from 'date-fns';
import SwipeableViews from 'react-swipeable-views';


export function TourEventDetail({ event }) {
  const [sches, setSches] = useState(null);
  const params = useParams();

  useEffect(() => {
    console.log(event);
    setSches(event.EventSches);
  }, [params.tourId]);

  return (
    <>
      {sches == null ? (
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

export function TourEventDetailPage({ setHdTitle }) {
  //このページはevent一覧をずらっと並べて、ひとつづつ表示させる場所
  const [tour, setTour] = useState(null);
  const [events, setEvents] = useState(null);
  const [sches, setSches] = useState(null);
  const [index, setIndex] = useState(0);

  const params = useParams();
  const handleChange = (ind) => {
    setIndex(ind)
  }
  
  useEffect(() => {
    getTour(params.tourId).then((data) => {
      setTour(data);
      setHdTitle(data.name);
    });
    getTourEvents(params.tourId)
      .then((data) => {
      setEvents(data);
    });
  }, [params.tourId]);

  return (
    <>
      {events == null ? (
        <Loading />
      ) : (
        <>
          <TabArea>
            <StyledTabs
              value={index}
              onChange={(e,value)=>handleChange(value)}
            >
            {events.map((event) => {
              const tabDate = format(new Date(event.date), 'MM/dd');
              return (
                <StyledTab label={tabDate} key={event.id}/>
              );
            })}
            </StyledTabs>
          </TabArea> 
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={(index) => handleChange(index)}
          >
            {events.map((event) => {
              return (
                  <TourEventDetail
                    event = {event}
                    key={event.id}
                  />
              );
            })}
          </SwipeableViews>
        </>
      )}
    </>
  );
}