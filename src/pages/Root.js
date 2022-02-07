import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';
import { TabArea, StyledTabs, StyledTab } from "../components";
import { AboutPage } from "./About.js";

import { EventListPage } from "./event";
import { PlaceListPage } from "./place";
import { TourListPage } from "./tour";

export function RootPage({ setHdTitle }) {
  
  const [index, setIndex] = useState(0);
  const handleChange = (ind) => {
    setIndex(ind)
    window.scrollTo(0, 0);//遷移時に画面上部へ
  }
  
  const location = useLocation();

  useEffect(() => {
    setHdTitle('トップページ')
    if(location.state){
      setIndex(location.state.rootIndex);
    }
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