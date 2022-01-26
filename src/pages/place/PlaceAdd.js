import React from 'react';
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { handleAddPlace, postPlace, getPlaceCats } from "../../apis";

import { MainArea, StyledCard, CardInner, AddUl } from "../../components";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

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
      <>
        <li className='postal_code'>
          <p>郵便番号を入力</p>
          <input
            name="postalCodeH"
            size="3"
            maxLength="3"
            onChange={e => this.handleChange(e)}
          />
          -
          <input
            name="postalCodeF"
            size="4"
            maxLength="4"
            onChange={e => this.handleChange(e)}
            onKeyUp={this.complementAddress}
            onBlur={this.onBlurZipcode}
          />
        </li>
        <li>
          <TextField 
            fullWidth
            variant="standard"
            placeholder="都道府県"
            name="prefecture"
            id="prefecture"
            {...this.props.register("prefecture")}
            //わたせない！！！
            onChange={e => this.handleChange(e)}
          />
        </li>
        <li>
          <TextField 
            fullWidth
            variant="standard"
            name="city"
            id="city"
            placeholder="市町村"
            onChange={e => this.handleChange(e)}
          />
        </li>
        <li>
          <TextField 
            fullWidth
            variant="standard"
            name="street"
            id="street"
            placeholder="番地"
            onChange={e => this.handleChange(e)}
          />
        </li>
      </>
    )  
  }
}
export default AutoAddress;

export function PlaceAddPage({ setHdTitle }) {
  
  const [placeCats, setPlaceCats] = useState(null);
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const onSubmit = data => { 
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
                  fullWidth
                  variant="standard"
                  {...register("name", { required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && errors.name.message}
                />
              </li>
              <li>
                <TextField
                  label="TEL"
                  fullWidth
                  variant="standard"
                  {...register("tel")}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && errors.memo.message}
                />
              </li>
              <li>
                <TextField
                  label="FAX"
                  fullWidth
                  variant="standard"
                  {...register("fax")}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && errors.memo.message}
                />
              </li>
              <li>
                <TextField
                  label="メモ"
                  fullWidth
                  variant="standard"
                  {...register("memo")}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && errors.memo.message}
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
                      fullWidth
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
              </li>
              <li>
                <TextField
                  label="国"
                  fullWidth
                  variant="standard"
                  defaultValue="日本"
                  {...register("country")}
                  error={Boolean(errors.country)}
                  helperText={errors.country && errors.country.message}
                />
              </li>
              <AutoAddress register={register}/>
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
