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
import InputAdornment from '@mui/material/InputAdornment';
import NotesIcon from '@mui/icons-material/Notes';

export function EventAddPage({ tour }) {
  const [eventCats, setEventCats] = useState(null);
  const [tours, setTours] = useState(null);
  const [places, setPlaces] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const defaultTour = tour && tour.id;//スケジュール一覧用

  const onSubmit = data => { 
    //console.log(data);
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
                          margin="normal"
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
                    required
                    margin="normal"
                    variant="standard"
                    {...register("name", { required: true })}
                    error={Boolean(errors.name)}
                    helperText={errors.name && '必須です（40文字以内）'}
                  />
                </li>
                <li>
                  <TextField
                    label="メモ"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NotesIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    {...register("memo")}
                  />
                </li>
                <li>
                  <TextField
                    fullWidth
                    {...register("EventCatId", { required: true })}
                    className="three"
                    margin="normal"
                    variant="standard"
                    required
                    select
                    onChange={e => setValue('EventCatId', e.target.value, true)}
                    label="カテゴリー"
                    error={Boolean(errors.EventCatId)}
                    helperText={errors.EventCatId && '必須です'}
                  >
                    {eventCats && eventCats.map((cat) => (
                      <MenuItem value={cat.id} key={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    {...register("TourId", { required: true })}
                    className="three"
                    margin="normal"
                    variant="standard"
                    select
                    onChange={e => setValue('TourId', e.target.value, true)}
                    label="ツアー"
                    defaultValue={defaultTour}
                  >
                    {tours && tours.map((tour) => (
                      <MenuItem value={tour.id} key={tour.id}>
                        {tour.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    {...register("PlaceId")}
                    className="three"
                    margin="normal"
                    variant="standard"
                    select
                    onChange={e => setValue('PlaceId', e.target.value, true)}
                    label="会場"
                  >
                    {places && places.map((place) => (
                      <MenuItem value={place.id} key={place.id}>
                        {place.name}
                      </MenuItem>
                    ))}
                  </TextField>
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