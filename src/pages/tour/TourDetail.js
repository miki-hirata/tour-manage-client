import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainArea, Loading, FormatUpdate, EventList, TabArea, StyledTabs, StyledTab,StyledCard, CardInner} from "../../components";
import { getTour, handleDeleteTour, handleEditTour, getTourEvents } from "../../apis";
import SwipeableViews from 'react-swipeable-views';


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
  //編集モードかどうかによる出し分け(独立コンポーネントにするとエラー)
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  function EditButton() {
    if(edit){
      return <button type="submit">更新</button>
    } else {
      return <button onClick={toggleEdit}>編集</button>
    }
  }

  return (
    <>
      <form onSubmit={handleEditTour}> 
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
      <TourDeleteButton tour={tour}/>
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
    getTour(params.tourId).then((data) => {
      setTour(data);
      setHdTitle(data.name)
    });
    getTourEvents(params.tourId).then((data) => {
      setEvents(data);
      console.log(data);
    });
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
              <StyledTab label="ツアースケジュール" />
              <StyledTab label="ツアー情報" />
            </StyledTabs>
          </TabArea>
          <SwipeableViews
            enableMouseEvents
            index={index}
            onChangeIndex={(index) => handleChange(index)}
          >
            <MainArea>
              {events && events.map((event) => {
                return <EventList key={event.id} event={event} tour={tour}/>;
              })}
            </MainArea>
          
            <MainArea>
              <TourDetail tour={tour}/>
            </MainArea>
          </SwipeableViews> 
        </>
      )}
    </>
  );
}
