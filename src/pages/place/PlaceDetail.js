import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { MainArea, Loading, EventList, PlaceMemoList, FormatUpdate, TabArea, StyledTabs, 
  StyledTab, StyledCard, CardInner, StyledEditButton, StyledDeleteButton, AddUl } from "../../components";
import { getPlace, getPlaceEvents, getPlaceMemos, postPlace, getPlaceCats, handleDeletePlace, handleEditPlace } from "../../apis";
import SwipeableViews from 'react-swipeable-views';
import styled from "styled-components";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import CallIcon from '@mui/icons-material/Call';
import FaxIcon from '@mui/icons-material/Fax';
import NotesIcon from '@mui/icons-material/Notes';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

function PlaceDeleteButton({ place }) {
  return (
    <>
      <form onSubmit={handleDeletePlace}>
        <input type="hidden" name="id" value={place.id}/>
        <button type="submit">削除</button>
      </form>
    </>
  );
}

function PlaceDetail({ place }) {
  
  //編集モードかどうかによる出し分け(独立コンポーネントにするとエラー)
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  function EditButton() {
    if(edit){
      return <button type="submit" onClick={toggleEdit}>更新</button>
    } else {
      return (
        {/* <StyledEditButton toggleEdit={toggleEdit}/> */}
      );
    }
  }
  
  
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlaceCats().then((data) =>{ 
      if (!unmounted) {
        setPlaceCats(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const [placeCats, setPlaceCats] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  
  const onSubmit = data => { 
    //県・市が一度クリックしないと読み込めない
    //document.getElementById('prefecture').click();
    let PostalCodeH = document.getElementById('postalCodeH').value;
    let PostalCodeF = document.getElementById('postalCodeF').value;
    data.postalCode = `${PostalCodeH}-${PostalCodeF}`;
    //console.log(data);
    postPlace(data, 'add');
  }


  return (
    <>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleEditPlace();
            }}
          >
            <AddUl>
              <li>
                <TextField
                  label="会場名"
                  fullWidth
                  defaultValue={place.name}
                  //disabled={!edit}
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
                  defaultValue={place.memo}
                  //multiline
                  //rows={2}
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
                  label="TEL"
                  margin="normal"
                  className="three"
                  defaultValue={place.tel}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("tel")}
                  error={Boolean(errors.tel)}
                  helperText={errors.tel && errors.tel.message}
                />
                <TextField
                  label="FAX"
                  margin="normal"
                  variant="standard"
                  className="three"
                  defaultValue={place.fax}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaxIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("fax")}
                  error={Boolean(errors.fax)}
                  helperText={errors.fax && errors.fax.message}
                />
              </li>
              <li>
                <Controller
                  name="PlaceCatId"
                  control={control}
                  defaultValue="1"
                  rules={{ required: "required!" }}
                  variant="standard"
                  render={({field}) => {
                    return (
                    <TextField
                      select
                      label="カテゴリー"
                      className="three"
                      required
                      margin="normal"
                      defaultValue={place.PlaceCat}
                      id="select"
                      variant="standard"
                      error={Boolean(errors.PlaceCatId)}
                      helperText={errors.PlaceCatId && errors.PlaceCatId.message}
                    >
                      {placeCats && placeCats.map((placeCat) => (
                        <MenuItem value={placeCat.id} key={placeCat.id}>
                          {placeCat.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    )
                  }}
                />
                <TextField
                  label="国"
                  variant="standard"
                  defaultValue="日本"
                  margin="normal"
                  className="three"
                  defaultValue={place.country}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...register("country")}
                  error={Boolean(errors.country)}
                  helperText={errors.country && errors.country.message}
                />
                <TextField
                  label="郵便番号"
                  margin="normal"
                  className="three"
                  defaultValue={place.postalCode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("postalCode")}
                  error={Boolean(errors.postalCode)}
                  helperText={errors.postalCode&& errors.postalCode.message}
                />
              </li>
              <li>
                <TextField
                  label="都道府県"
                  name="prefecture"
                  id="prefecture"
                  margin="normal"
                  className="three"
                  defaultValue={place.prefecture}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("prefecture")}
                  error={Boolean(errors.prefecture)}
                  helperText={errors.prefecture && errors.prefecture.message}
                />
                <TextField
                  name="city"
                  id="city"
                  label="市町村区"
                  margin="normal"
                  defaultValue={place.city}
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("city")}
                  error={Boolean(errors.city)}
                  helperText={errors.city && errors.city.message}
                />
                <TextField
                  name="street"
                  id="street"
                  label="番地"
                  margin="normal"
                  defaultValue={place.street}
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapsHomeWorkIcon  />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("street")}
                  error={Boolean(errors.street)}
                  helperText={errors.street && errors.street.message}
                />
              </li>
              <Button 
                type="submit" 
                variant="contained"
                color="primary" 
                className='submit_button'
                onClick={toggleEdit}
               >
                更新
              </Button>
            </AddUl>
            <input type="hidden" name="id" value={place.id}/>
              {/* <EditButton /> */}
          </form>
          <StyledDeleteButton handleDelete={handleDeletePlace} id={place.id}/>
          <FormatUpdate updateAt={place.updatedAt}/>
        </CardInner>
      </StyledCard>
      {/* <PlaceDeleteButton place={place}/> */}
    </>
  );
}


export function PlaceDetailPage({ setHdTitle }) {
  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState(null);
  const [placeMemos, setPlaceMemos] = useState(null);
  const [index, setIndex] = useState(0);
  const params = useParams();

  const handleChange = (ind) => {
    setIndex(ind)
  }


  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlaceEvents(params.placeId).then((data) => {
      if (!unmounted) {
        setEvents(data);
      }
    });
    getPlaceMemos(params.placeId).then((data) => {
      if (!unmounted) {
        setPlaceMemos(data);
      }
    });
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
              {events && <StyledTab label="公演履歴" />}
              {placeMemos && <StyledTab label="メモ" />}
            </StyledTabs>
          </TabArea>
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={(index) => handleChange(index)}
          >
            <MainArea>
              <PlaceDetail place = {place}/>
            </MainArea>
            <MainArea>
              {events ? (
                <StyledCard
                  variant="outlined"
                >
                  <CardInner>
                    <p>この会場での公演履歴はありません</p>
                  </CardInner>
                </StyledCard>
              ):(<>
                {events.map((event) => {
                  return <EventList key={event.id} event={event} />;
                })}
              </>)}
            </MainArea>
            <MainArea>
              {placeMemos ? (
                <StyledCard
                  variant="outlined"
                >
                  <CardInner>
                    <p>この会場についてのメモはありません</p>
                  </CardInner>
                </StyledCard>
              ):(<>
                {placeMemos.map((placeMemo) => {
                  return <PlaceMemoList key={placeMemo.id} placeMemo={placeMemo} />;
                })}
              </>)}
            </MainArea>
          </SwipeableViews> 
        </>
      )}
    </>
  );
}