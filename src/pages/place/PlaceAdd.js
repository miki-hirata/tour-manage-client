import React from 'react';
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { handleAddPlace, postPlace, getPlaceCats } from "../../apis";

import { MainArea, StyledCard, CardInner, AddUl } from "../../components";

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

class AutoAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  handleChange = e => {
    const params = this.state.user;
    params[e.target.name] = e.target.value;
    this.setState({ user: params });
  };

  complementAddress = () => {
    const { AjaxZip3 } = window;
    AjaxZip3.zip2addr(
      'postalCodeH',
      'postalCodeF',
      'prefecture',
      'city',
      'street'
    );
  };

  onBlurZipcode = () => {
    this.setState({
      user: {
        ...this.state.user,
        prefecture: document.getElementById('prefecture').value,
        city: document.getElementById('city').value,
        street: document.getElementById('street').value
      }
    });
  };
  

  render() {
    return(
      <div className='postal_code'>
        <p>郵便番号を入力</p>
        <input
          id="postalCodeH"
          name="postalCodeH"
          size="3"
          maxLength="3"
          onChange={e => this.handleChange(e)}
        />
        -
        <input
          id="postalCodeF"
          name="postalCodeF"
          size="4"
          maxLength="4"
          onChange={e => this.handleChange(e)}
          onKeyUp={this.complementAddress}
          onBlur={this.onBlurZipcode}
        />
      </div>
    )  
  }
}
export default AutoAddress;

export function PlaceAddPage({ }) {
  
  const [placeCats, setPlaceCats] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  
  const onSubmit = data => { 
    //県・市が一度クリックしないと読み込めない
    //document.getElementById('prefecture').click();
    let PostalCodeH = document.getElementById('postalCodeH').value;
    let PostalCodeF = document.getElementById('postalCodeF').value;
    data.postalCode = `${PostalCodeH}-${PostalCodeF}`;
    console.log(data);
    //postPlace(data, 'add');
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


  return (
    <MainArea>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="会場名"
                  required
                  fullWidth
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
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && errors.memo.message}
                />
              </li>
              <li>
                <TextField
                  label="TEL"
                  margin="normal"
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("tel")}
                  error={Boolean(errors.fax)}
                  helperText={errors.fax && errors.fax.message}
                />
                <TextField
                  label="FAX"
                  margin="normal"
                  variant="standard"
                  className="three"
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
                <TextField
                  fullWidth
                  {...register("PlaceCatId", { required: true })}
                  className="three"
                  margin="normal"
                  variant="standard"
                  required
                  select
                  onChange={e => setValue('PlaceCatId', e.target.value, true)}
                  label="カテゴリー"
                  error={Boolean(errors.PlaceCatId)}
                  helperText={errors.PlaceCatId && '必須です'}
                >
                {placeCats && placeCats.map((placeCat) => (
                  <MenuItem value={placeCat.id} key={placeCat.id}>
                    {placeCat.name}
                  </MenuItem>
                ))}
                </TextField>{/* 
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
                      defaultValue="1"
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
                /> */}
                <TextField
                  label="国"
                  variant="standard"
                  defaultValue="日本"
                  margin="normal"
                  className="three"
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
              </li>
              <li>
                <AutoAddress register={register}/>
              </li>
              <li>
                <TextField
                  label="都道府県"
                  name="prefecture"
                  id="prefecture"
                  margin="normal"
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("prefecture")}
                  onChange={e => setValue('prefecture', e.target.value, true)}//うまくいかない
                />
                <TextField
                  name="city"
                  id="city"
                  label="市町村区"
                  margin="normal"
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
                  onChange={e => setValue('city', e.target.value, true)}//うまくいかない
                />
                <TextField
                  name="street"
                  id="street"
                  label="番地"
                  margin="normal"
                  className="three"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapsHomeWorkIcon  />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  {...register("street")}h
                  onChange={e => setValue('street', e.target.value, true)}
                />
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                新規登録
              </Button>
            </AddUl>
          </form>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}
