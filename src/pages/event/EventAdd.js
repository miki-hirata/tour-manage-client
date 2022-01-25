import * as React from 'react';

import { useEffect, useState } from "react";
import { MainArea, StyledCard, CardInner} from "../../components";

import { useForm, Controller } from "react-hook-form";
import { postEvent, getEventCats, getTours } from "../../apis";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

export function EventAddPage({ setHdTitle }) {
  const [eventCats, setEventCats] = useState(null);
  const [Tours, setTours] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

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
            <dl>
              <dt>日付</dt>
              <dd>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()}
                  render={({field}) => {
                    return (
                      <DesktopDatePicker
                        {...field}
                        label="input"
                        inputFormat="yyyy/MM/dd"
                        mask="____/__/__"
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) => {
                          setValue('date', newValue)
                        }}
                      />
                    )
                  }}
                />
                {/* <input type="date" placeholder="date" {...register("date")} /> */}
              </dd>
            </dl>
            <dl>
              <dt>イベント名</dt>
              <dd>
                <input type="text" placeholder="name" {...register("name", {required: true, maxLength: 40})} />
                { errors.name && <span className="text-danger">必須・40文字以下</span> }
              </dd>
            </dl>
            <dl>
              <dt>メモ</dt>
              <dd>
              <input type="text" placeholder="memo" {...register("memo", { maxLength: 100})} />
                { errors.name && <span className="text-danger">100文字以下</span> }
              </dd>
            </dl>
            <dl>
              <dt>カテゴリー</dt>
              <dd>
                <select defaultValue='1' {...register("EventCatId")}>
                  {eventCats && eventCats.map((eventCat) => {
                    return <option key={eventCat.id} value={eventCat.id}>{eventCat.name}</option>;
                  })}
                </select>
              </dd>
            </dl>
            <dl>
              <dt>ツアー</dt>
              <dd>
                <select {...register("TourId")}>
                  <option hidden>選択してください</option>
                  {Tours && Tours.map((tour) => {
                    return <option key={tour.id} value={tour.id}>{tour.name}</option>;
                  })}
                </select>
              </dd>
            </dl>
            <input type="submit" />
          </form>
        </LocalizationProvider>
          {/* 
          <form onSubmit={handleAddEvent} className="card">
            <input type="date" name="date" placeholder="日付"/>
            <input type="text" name="name" placeholder="イベント名" className="name_large"/>
            <input type="number" name="placeId" placeholder="会場ID" className="name_large"/>
            <textarea type="text" name="memo" placeholder="メモ" />
            <button type="submit">追加</button>
          </form> */}
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}
