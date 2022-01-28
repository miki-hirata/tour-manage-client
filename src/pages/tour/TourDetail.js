import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainArea, Loading, FormatUpdate, EventList, AddUl, TabArea, StyledDeleteButton, StyledTabs, StyledTab,StyledCard, CardInner} from "../../components";
import { getTour, handleDeleteTour, handleEditTour, getTourEvents } from "../../apis";
import SwipeableViews from 'react-swipeable-views';
import { useForm, Controller } from "react-hook-form";
import { postTour } from "../../apis";
import TextField from '@mui/material/TextField';
import NotesIcon from '@mui/icons-material/Notes';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';



function TourDeleteButton({ tour }) {
  
  return (
    <>
      <form onSubmit={handleDeleteTour}>
        <input type="hidden" name="id" value={tour.id}/>
        <button type="submit">削除</button>
      </form>
    </>
  );
}

function TourDetail({ tour }) {
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  
  const onSubmit = data => { 
    data.id = tour.id;
    console.log(data);
    postTour(data, 'edit');
  }

/* 
  //編集モードかどうかによる出し分け(独立コンポーネントにするとエラー)
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  function EditButton() {
    if(edit){
      return <button type="submit">更新</button>
    } else {
      return <button onClick={toggleEdit}>編集</button>
    }
  } */

  return (
    <>
    <StyledCard
      variant="outlined"
      >
      <CardInner>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddUl>
            <li>
              <TextField
                label="ツアー名"
                fullWidth
                required
                margin="normal"
                variant="standard"
                defaultValue={tour.name}
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
                margin="normal"
                rows={3}
                variant="standard"
                defaultValue={tour.memo}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NotesIcon />
                    </InputAdornment>
                  ),
                }}
                {...register("memo")}
                error={Boolean(errors.memo)}
                helperText={errors.memo && errors.memo.message}
              />
            </li>
            <Button type="submit" variant="contained" color="primary" className='submit_button'>
              更新
            </Button>
          </AddUl>
        </form>
        {/* <StyledDeleteButton />作成中 */}
        <FormatUpdate updateAt={tour.updatedAt}/>
      </CardInner>
    </StyledCard>
      {/* <form onSubmit={handleEditTour}> 
        <StyledCard
          variant="outlined"
          >
          <CardInner>
            <dl>
              <dt>ID</dt>
              <dd>{tour.id}</dd>
            </dl>
            <dl>
              <dt>メモ</dt>
              <dd>{tour.memo}</dd>
            </dl>        
        </CardInner>
        </StyledCard>
        <input type="hidden" name="id" value={tour.id}/>
        <EditButton />
      </form>
      <FormatUpdate updateAt={tour.updatedAt}/>
      <TourDeleteButton tour={tour}/> */}
    </>
  );
}

export function TourDetailPage({ setHdTitle }) {
  const [tour, setTour] = useState(null);
  const [events, setEvents] = useState(null);

  const [index, setIndex] = useState(0);
  const params = useParams();
  
  const handleChange = (ind) => {
    setIndex(ind)
  }

  useEffect(() => {
    let unmounted = false;//メモリリーク防止
    getTourEvents(params.tourId).then((data) => {
      if (!unmounted) {
        setEvents(data);
        console.log(data);
      }
    });
    getTour(params.tourId).then((data) => {
      if (!unmounted) {
        setTour(data);
        setHdTitle(data.name)
      }
    });
    return () => {
      unmounted = true;
    };
  }, [params.tourId]);
  

  return (
    <>
      {tour == null ? (
        <Loading />
      ) : (
        <>
          <TabArea>
            <StyledTabs
              value={index}
              onChange={(e,value)=>handleChange(value)}
              indicatorColor="primary"
            >
              {events && <StyledTab label="スケジュール" />}
              <StyledTab label="ツアー情報" />
            </StyledTabs>
          </TabArea>
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={(index) => handleChange(index)}
          >
            {events &&
              <MainArea>
                {events.map((event) => {
                  return <EventList key={event.id} event={event} tour={tour}/>;
                })}
              </MainArea>
            }
          
            <MainArea>
              <TourDetail tour={tour}/>
            </MainArea>
          </SwipeableViews> 
        </>
      )}
    </>
  );
}
