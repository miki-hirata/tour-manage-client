import * as React from 'react';

import { useEffect, useState } from "react";
import { MainArea, StyledCard, CardInner, AddUl } from "../../components";

import { useForm, Controller } from "react-hook-form";
import { postEvent, getPlaces, getEventCats, getTours } from "../../apis";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export function EventAddPage({ setHdTitle }) {
  const [eventCats, setEventCats] = useState(null);
  const [Tours, setTours] = useState(null);
  
  const [Places, setPlaces] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  //const { register, handleSubmit, errors, control, setValue } = useForm();

  const onSubmit = data => { 
    console.log(data);
    postEvent(data, 'add');
  }

  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getEventCats().then((data) =>{ 
      if (!unmounted) {
        setEventCats(data);
      }
    });
    getTours().then((data) =>{ 
      if (!unmounted) {
        setTours(data);
      }
    });
    getPlaces().then((data) =>{ 
      if (!unmounted) {
        setPlaces(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <MainArea>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AddUl>
                <li>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => {
                      return (
                        <MobileDatePicker
                          {...field}
                          label="日付"
                          inputFormat="yyyy/MM/dd"
                          mask="____/__/__"
                          renderInput={(props) => <TextField {...props} variant="standard" fullWidth />}
                          onChange={(newValue) => {
                            setValue('date', newValue)
                          }}
                        />
                      )
                    }}
                  />
                </li>
                <li>
                  <TextField
                    label="イベント名"
                    fullWidth
                    variant="standard"
                    {...register("name", { required: true })}
                    error={Boolean(errors.name)}
                    helperText={errors.name && errors.name.message}
                  />
                </li>
                <li>
                  <TextField
                    label="メモ"
                    fullWidth
                    id="select"
                    rows={3}
                    variant="standard"
                    {...register("memo")}
                    error={Boolean(errors.memo)}
                    helperText={errors.memo && errors.memo.message}
                  />
                </li>
                <li>
                  <Controller
                    name="EventCatId"
                    control={control}
                    defaultValue="1"
                    rules={{ required: "required!" }}
                    variant="standard"
                    render={({field}) => {
                      return (
                      <TextField
                        select
                        label="カテゴリー"
                        fullWidth
                        id="select"
                        variant="standard"
                        error={Boolean(errors.EventCatId)}
                        helperText={errors.EventCatId && errors.EventCatId.message}
                      >
                        {eventCats && eventCats.map((eventCat) => (
                          <MenuItem value={eventCat.id} key={eventCat.id}>
                            {eventCat.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      )
                    }}
                  />
                </li>
                <li>
                  <Controller
                    name="TourId"
                    control={control}
                    defaultValue="1"
                    rules={{ required: "required!" }}
                    render={({field}) => {
                      return (
                      <TextField
                        select
                        label="ツアー"
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.TourId)}
                        helperText={errors.TourId && errors.TourId.message}
                      >
                        {Tours && Tours.map((tour) => (
                          <MenuItem value={tour.id} key={tour.id}>
                            {tour.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      )
                    }}
                  />
                </li>
                <li>
                  <Controller
                    name="PlaceId"
                    control={control}
                    defaultValue="1"
                    rules={{ required: "required!" }}
                    render={({field}) => {
                      return (
                      <TextField
                        select
                        label="会場"
                        fullWidth
                        error={Boolean(errors.PlaceId)}
                        helperText={errors.PlaceId && errors.PlaceId.message}
                        variant="standard"
                      >
                        {Places && Places.map((Place) => (
                          <MenuItem value={Place.id} key={Place.id}>
                            {Place.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      )
                    }}
                  />
                </li>
                <Button type="submit" variant="contained" color="primary" className='submit_button'>
                  新規登録
                </Button>
              </AddUl>
            </form>
          </LocalizationProvider>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}