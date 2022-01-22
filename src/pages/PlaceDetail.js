import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Header, Loading, EventList, FormatUpdate, StyledTabs, StyledTab} from "../components";
import { getPlace, getPlaceEvents, getPlaceMemos, handleDeletePlace, handleEditPlace } from "../apis";
import SwipeableViews from 'react-swipeable-views';

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
      return <button type="submit">更新</button>
    } else {
      return <button onClick={toggleEdit}>編集</button>
    }
  }

  return (
    <>
      <form onSubmit={handleEditPlace}> 
        <div className="card">
          <div className="head_main">
            <input type="text" name="name" defaultValue={place.name} className="name_large" disabled={!edit}/>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="num">
              <span>ID</span>
              <span>{place.id}</span>
            </div>
            <div className="memo">
              <textarea type="text" name="memo" defaultValue={place.memo} disabled={!edit}/>
            </div>
          </div>
        </div>
        <input type="hidden" name="id" value={place.id}/>
        <EditButton />
      </form>
      <FormatUpdate updateAt={place.updatedAt}/>
      <PlaceDeleteButton place={place}/>
    </>
  );
}


export function PlaceDetailPage({ setHdTitle }) {
  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState(null);
  const [placeMemos, setPlaceMemos] = useState(null);

  const [index, setIndex] = useState(1);
  const params = useParams();

  
  const handleChange = (ind) => {
    setIndex(ind)
  }

  useEffect(() => {
    getPlace(params.placeId).then((data) => {
      setPlace(data);
      setHdTitle(data.name)
    });
    getPlaceEvents(params.placeId).then((data) => {
      setEvents(data);
    });
    getPlaceMemos(params.placeId).then((data) => {
      setPlaceMemos(data);
    });
  }, [params.placeId]);

  useEffect(() => {
  }, [params.placeId])
  

  return (
    <>
      {place == null ? (
        <Loading />
      ) : (
        <>
          {/* <Header title={place.name}/> */}
          <StyledTabs
            value={index}
            //fullWidth
            onChange={(e,value)=>handleChange(value)}
            //style={styles.tabs}
            variant="fullWidth"
            indicatorColor="primary"
          >
            {events && <StyledTab label="公演履歴" /> }
            <StyledTab label="詳細情報" />
            {placeMemos && <StyledTab label="メモ" /> }
          </StyledTabs>
          <SwipeableViews
            enableMouseEvents
            resistance
            animateHeight
            index={index}
            onChangeIndex={(index) => handleChange(index)}
          >
            {events && (
              <div style={Object.assign({}, styles.slide)}>
                {events.map((event) => {
                  return <EventList key={event.id} event={event} />;
                })}
              </div>
            )}
            
            <div style={Object.assign({}, styles.slide)}>
              <PlaceDetail place = {place}/>
            </div>
          </SwipeableViews> 
        </>
      )}
    </>
  );
}

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    //padding: 15,
    //minHeight: 100,
    //color: '#fff',
  }
};
