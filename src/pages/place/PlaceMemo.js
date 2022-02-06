import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainArea, Loading, StyledCard, CardInner, CardInnerHead, HeadSubFont, AddUl } from "../../components";
import { getPlaceMemos, postPlaceMemo } from "../../apis";
import { useForm, Controller } from "react-hook-form";

import { format } from 'date-fns';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styled from "styled-components";
import { pc, sp, tab, mixinMaxWidth } from '../../setting';

function AddPlaceMemo({ place, submit, setSubmit }) {  
  const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm();
  const onSubmit = data => { 
    data.UserId = 1
    data.PlaceId = place.id;
    console.log(data);
    postPlaceMemo(data, 'add').then(()=>{
      setSubmit(submit + 1);
      console.log(submit);
      reset();//全てリセット
    });
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


function PlaceMemoList({ placeMemo, submit, setSubmit  }) {
  const createdDate = format(new Date(placeMemo.createdAt), 'yyyy/MM/dd HH:mm:ss');

  const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm();
  const onDelete = data => { 
    data.id= placeMemo.id;
    console.log(data);
    postPlaceMemo(data, 'delete').then(()=>{
      setSubmit(submit + 1);
    });
  }
  return (
    <StyledCard
      variant="outlined"
      key={placeMemo.id}
    >
      <CardInnerHead>
        <MemoStyle>
          <div className="content">
            <p className="date">{createdDate}</p>
            <p className="font_sub">{placeMemo.memo}</p>
          </div> 
          <div className="user">
            <p className="name">{placeMemo.User.name}</p>
            <AccountCircleIcon/>
          </div>
          <form onSubmit={handleSubmit(onDelete)} className="delete">
            <button type="submit">&times;</button>
          </form>
        </MemoStyle>
      </CardInnerHead>
    </StyledCard>
  );
}


export function PlaceMemoPage({ place }) {
  const [placeMemos, setPlaceMemos] = useState(null);
  const [submit, setSubmit] = useState(0);
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
  }, [submit]);

  return (
    <MainArea>
      <AddPlaceMemo 
        place = {place} 
        submit={submit} 
        setSubmit={setSubmit}
      />
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
              return <PlaceMemoList
                      key={placeMemo.id}
                      placeMemo={placeMemo}
                      submit={submit}
                      setSubmit={setSubmit}
                    />;
          })
          )}
        </>
      )}
    </MainArea>
  );
}



const MemoStyle = styled.div`
position: relative;
display: flex;
justify-content: space-between;
width: 100%;
${sp`
  flex-direction: column;
`}


.content{
  flex: 1;
  .date{
    font-size: 14px;
    padding-bottom: 0.5em;
  }
}
.user{
  display: flex;
  align-items: flex-end;
  padding-top: 10px;
  
  ${sp`
    justify-content: flex-end;
  `}
  .name{
    font-size: 12px;
    margin-right: 0.5em;
    padding-bottom: 0.1em;
  }
}

.delete{
  position: absolute;
  right: -30px;
  top: -20px;
    
  ${sp`
    right: -10px;
    top: -14px;
  `}
  button{
    padding: 10px;
  }
}

.font_main{
  font-size: 18px;
  font-weight: bold;
  ${sp`
    font-size: 16px;
  `}
}

`;