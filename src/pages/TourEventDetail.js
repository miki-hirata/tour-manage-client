import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading, EventDetail, StyledTabs, StyledTab } from "../components";
import { getTour, getTourEvents } from "../apis";

import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export function TourEventDetailPage({ setHdTitle }) {
  //このページはevent一覧をずらっと並べて、ひとつづつ表示させる場所
  const [tour, setTour] = useState(null);
  const [events, setEvents] = useState(null);

  const params = useParams();
  
  useEffect(() => {
    getTour(params.tourId).then((data) => {
      setTour(data);
      setHdTitle(data.name);
    });
    getTourEvents(params.tourId).then((data) => {
      setEvents(data);
    });
  }, [params.tourId]);
  

  
  const [index, setIndex] = useState(0);

  const handleChange = (ind) => {
    setIndex(ind)
  }

  return (
    <>
      <div className="event_section">
        {events == null ? (
          <Loading />
        ) : (
          <>
            <StyledTabs
              value={index}
              //fullWidth
              onChange={(e,value)=>handleChange(value)}
              style={styles.tabs}
              variant="fullWidth"
              indicatorColor="primary"
            >
            {events.map((event) => {
              return (
                <StyledTab label={event.date} />
              );
            })}
            </StyledTabs>
            <SwipeableViews
              enableMouseEvents
              resistance
              animateHeight
              index={index}
              onChangeIndex={(index) => handleChange(index)}
            >
              {events.map((event) => {
                return (
                  <div style={Object.assign({}, styles.slide)}>
                    <EventDetail key={event.id} event={event}/>
                  </div>
                );
              })}
              
            </SwipeableViews>
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    //color: '#fff',
  }
};
