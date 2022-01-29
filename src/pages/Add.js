import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import SwipeableViews from 'react-swipeable-views';
import { MainArea, TabArea, StyledTabs, StyledTab, StyledCard, CardInner, AddUl} from "../components";
import { postEventCat, getEventCats, postPlaceCat, getPlaceCats } from "../apis";

import { EventAddPage } from "./event";
import { PlaceAddPage } from "./place";
import { TourAddPage } from "./tour";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




function EventCatAddPage({}) {  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const [ eventCats, setEventCats] = useState(null);

  const onSubmit = data => { 
    //console.log(data);
    postEventCat(data, 'add');
  }
  
  useEffect(() => {
    getEventCats().then((data) => {
      setEventCats(data);
    });
  }, []); 

  return (
    <>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <h2 className="font_main">イベントカテゴリー</h2>
          <p className="font_add_cat">現在のカテゴリー:
          {eventCats && eventCats.map((eventCat) => {
            return <span> {eventCat.name}</span>;
          })}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="追加するカテゴリー"
                  fullWidth
                  required
                  variant="standard"
                  {...register("name", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && "必須・10文字以内"}
                />
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                新規登録
              </Button>
            </AddUl>
          </form>
        </CardInner>
      </StyledCard>
    </>
  );
}


function PlaceCatAddPage({}) {  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const [ placeCats, setPlaceCats] = useState(null);

  const onSubmit = data => { 
    //console.log(data);
    postPlaceCat(data, 'add');
  }
  
  useEffect(() => {
    getPlaceCats().then((data) => {
      setPlaceCats(data);
    });
  }, []); 

  return (
    <>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <h2 className="font_main">イベントカテゴリー</h2>
          <p className="font_add_cat">現在のカテゴリー:
          {placeCats && placeCats.map((placeCat) => {
            return <span> {placeCat.name}</span>;
          })}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="追加するカテゴリー"
                  fullWidth
                  required
                  variant="standard"
                  {...register("name", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && "必須・10文字以内"}
                />
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                新規登録
              </Button>
            </AddUl>
          </form>
        </CardInner>
      </StyledCard>
    </>
  );
}



function OtherAddPage({ setHdTitle }) {
  
  return (
    <MainArea>
      <TourAddPage />
      <EventCatAddPage />
      <PlaceCatAddPage />
    </MainArea>
  );
}


export function AddPage({ setHdTitle }) {
  
  const [index, setIndex] = useState(0);
  const handleChange = (ind) => {
    setIndex(ind)
  }
  
  useEffect(() => {
    setHdTitle('新規登録')
  }, []);

  return (
    <>
      <TabArea>
        <StyledTabs
          value={index}
          onChange={(e,value)=>handleChange(value)}
          indicatorColor="primary"
          variant="scrollable"
          //scrollButtons
          //allowScrollButtonsMobile
        >
          <StyledTab label="イベント" />
          <StyledTab label="会場" />
          <StyledTab label="その他" />
          {/* <StyledTab label="その他" /> */}
        </StyledTabs>
        
      </TabArea>
      
      <SwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={(index) => handleChange(index)}
      >
        <EventAddPage/>
        <PlaceAddPage/>
        
        <OtherAddPage/>
      </SwipeableViews> 
    </>
  );
}