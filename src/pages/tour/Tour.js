import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading, TabArea, StyledTabs, StyledTab} from "../../components";
import { getTour } from "../../apis";
import SwipeableViews from 'react-swipeable-views';
import { TourDetailPage, TourEventPage} from "./index";


export function TourPage({ setHdTitle }) {
  const [tour, setTour] = useState(null);
  const params = useParams();

  const [index, setIndex] = useState(0);
  const handleChange = (ind) => {
    setIndex(ind)
  }

  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getTour(params.tourId).then((data) => {
      if (!unmounted) {
        setTour(data);
        setHdTitle(data.name)
      }
    });
    return () => {
      unmounted = true;
    };
  }, [params.tourId]);

  return (
    <>
      {tour == null ? (
        <Loading />
      ) : (
        <>
          <TabArea>
            <StyledTabs
              value={index}
              onChange={(e,value)=>handleChange(value)}
              indicatorColor="primary"
            >
              <StyledTab label="スケジュール" />
              <StyledTab label="ツアー情報" />
            </StyledTabs>
          </TabArea>
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={(index) => handleChange(index)}
          >
            <TourEventPage tour={tour}/>
            <TourDetailPage tour={tour}/>
          </SwipeableViews> 
        </>
      )}
    </>
  );
}
