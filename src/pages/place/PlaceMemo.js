import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainArea, Loading, StyledCard, CardInner, CardInnerHead, HeadSubFont, AddUl } from "../../components";
import { getPlaceMemos, postPlaceMemo } from "../../apis";
import { useForm, Controller } from "react-hook-form";


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function AddPlaceMemo({ place }) {  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const onSubmit = data => { 
    data.UserId = 1
    data.PlaceId = place.id;
    console.log(data);
    postPlaceMemo(data, 'add');
  }
  return (
    <>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
          <h2 className="font_main">メモ追加</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AddUl>
              <li>
                <TextField
                  label="会場についてのメモを記載"
                  fullWidth
                  required
                  variant="standard"
                  {...register("memo", { required: true })}
                  error={Boolean(errors.memo)}
                  helperText={errors.memo && "必須・100文字以内"}
                />
              </li>
              <Button type="submit" variant="contained" color="primary" className='submit_button'>
                追加
              </Button>
            </AddUl>
          </form>
        </CardInner>
      </StyledCard>
    </>
  );
}


function PlaceMemoList({ placeMemo }) {
  return (
    <StyledCard
      variant="outlined"
      key={placeMemo.id}
    >
      <CardInnerHead>
        <p className="sub_font">{placeMemo.memo}</p>
        <div className="memo_user">
          <AccountCircleIcon/>
          <p className="font_small">{placeMemo.User.name}</p>
        </div>
      </CardInnerHead>
    </StyledCard>
  );
}


export function PlaceMemoPage({ place }) {
  const [placeMemos, setPlaceMemos] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getPlaceMemos(params.placeId).then((data) => {
      if (!unmounted) {
        setPlaceMemos(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);


  return (
    <MainArea>
      <AddPlaceMemo place = {place}/>
      {placeMemos == null ? (
        <Loading />
      ) : (
        <>
          {placeMemos[0] == null ? (
            <StyledCard
              variant="outlined"
            >
              <CardInner>
                <p>会場メモが登録されていません</p>
              </CardInner>
            </StyledCard>
          ) : (
            placeMemos.map((placeMemo) => {
              return <PlaceMemoList key={placeMemo.id} placeMemo={placeMemo} />;
          })
          )}
        </>
      )}
    </MainArea>
  );
}

