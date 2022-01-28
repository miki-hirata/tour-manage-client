import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { PlaceDetailPage, PlaceEventPage, PlaceMemoPage } from "./index";
import { Loading, TabArea, StyledTabs, StyledTab } from "../../components";
import SwipeableViews from 'react-swipeable-views';
import { getPlace } from "../../apis";

export function PlacePage({ setHdTitle }) {
  
  const [place, setPlace] = useState(null);
  const [index, setIndex] = useState(0);
  const handleChange = (ind) => {
    setIndex(ind)
  }
  const params = useParams();
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlace(params.placeId).then((data) => {
      if (!unmounted) {
        setPlace(data);
        setHdTitle(data.name)
      }
    });
    return () => {
      unmounted = true;
    };
  }, [params.placeId]);

  return (
    <>
    {place == null ? (
      <Loading />
    ) : (
    <>
      <TabArea>
        <StyledTabs
          value={index}
          onChange={(e,value)=>handleChange(value)}
          indicatorColor="primary"
        >
          <StyledTab label="会場情報" />
          <StyledTab label="公演履歴" />
          <StyledTab label="会場メモ" />
        </StyledTabs>
      </TabArea>
      <SwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={(index) => handleChange(index)}
      >
        <PlaceDetailPage place = {place}/>
        <PlaceEventPage/>
        <PlaceMemoPage/>
      </SwipeableViews> 
      </>
      )}
    </>
  );
}