import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainArea, StyledCard, CardInner, AddUl, FormatDate, FormatUpdate, EventSches, StyledEditButton } from "./index";
import styled from "styled-components";

import { postEvent, getPlaces, getEventCats, getTours } from "../apis";
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import NotesIcon from '@mui/icons-material/Notes';
import { useForm, Controller } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import { blueGrey } from '@mui/material/colors';

export function EventDetail({ event, sches }) {
  //編集モードかどうかによる出し分け(独立コンポーネントにするとエラー)
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  function EditButton() {
    if(edit){
      return <button type="submit">更新</button>
    } else {
      return (
        <StyledEditButton toggleEdit={toggleEdit}/>
      );
    }
  }
  
  let defaultDate = new Date(event.date);//日付を何とかしてデフォルトセットしたい
  
  const [eventCats, setEventCats] = useState(null);
  const [tours, setTours] = useState(null);
  
  const [places, setPlaces] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  //const { register, handleSubmit, errors, control, setValue } = useForm();

  const history= useHistory();
   
  const onSubmit = data => { 
    data.id = event.id;
    console.log(data);
    postEvent(data, 'edit').then(()=>{
      history.go(0);//レンダリング
    });
  }

  const onDelete = data => { 
    data.id = event.id;
    data.removed = true;
    console.log(data);
    postEvent(data, 'edit').then(()=>{
      history.push({ pathname: '/', state: { rootIndex: 3 }});
      //遷移先にrootIndexを渡す　→　イベント一覧に飛ぶ
    });
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
                    defaultValue={defaultDate}
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
                    defaultValue={event.name}
                    required
                    margin="normal"
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
                    margin="normal"
                    id="select"
                    defaultValue={event.memo}
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
                    error={Boolean(errors.memo)}
                    helperText={errors.memo && errors.memo.message}
                  />
                </li>
                <li>
                  <TextField
                    fullWidth
                    {...register("EventCatId", { required: true })}
                    className="three"
                    margin="normal"
                    variant="standard"
                    defaultValue={event.EventCatId}
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
                    defaultValue={event.TourId}
                    variant="standard"
                    select
                    onChange={e => setValue('TourId', e.target.value, true)}
                    label="ツアー"
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
                    defaultValue={event.PlaceId}
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
                  更新
                </Button>
              </AddUl>
            </form>
            <form onSubmit={handleSubmit(onDelete)} className="bin_icon">
              <button type="submit"><DeleteIcon sx={{ color: blueGrey[500] }}/></button>
            </form>
          </LocalizationProvider>
          <FormatUpdate updateAt={event.updatedAt}/>
        </CardInner>
      </StyledCard>
      {/* <EventSches event={event}/> herokuでエラーが起きるので保留*/}
    </MainArea>
  );
}

