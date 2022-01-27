import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';
import { TabArea, StyledTabs, StyledTab,StyledCard, CardInner} from "../components";
import { AboutPage } from "./About.js";

import { EventListPage, EventDetailPage, EventAddPage } from "./event";
import { PlaceListPage, PlaceDetailPage, PlaceAddPage } from "./place";
import { TourListPage, TourDetailPage, TourEventDetailPage } from "./tour";

export function RootPage({ setHdTitle }) {
  
  const [index, setIndex] = useState(0);
  const handleChange = (ind) => {
    setIndex(ind)
  }
  
  useEffect(() => {
    setHdTitle('トップページ')
  }, []);
  
  return (
    <>
      <TabArea>
        <StyledTabs
          value={index}
          onChange={(e,value)=>handleChange(value)}
          indicatorColor="primary"
        >
          <StyledTab label="紹介" />
          <StyledTab label="ツアー" />
          <StyledTab label="会場" />
          <StyledTab label="イベント" />
        </StyledTabs>
      </TabArea>
      <SwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={(index) => handleChange(index)}
      >
        <AboutPage/>
        <TourListPage/>
        <PlaceListPage/>
        <EventListPage/>
      </SwipeableViews> 
    </>
  );
}