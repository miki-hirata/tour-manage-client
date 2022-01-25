import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { MainArea, Loading, EventList, PlaceMemoList, FormatUpdate, TabArea, StyledTabs, StyledTab,StyledCard, CardInner} from "../../components";
import { getPlace, getPlaceEvents, getPlaceMemos, handleDeletePlace, handleEditPlace } from "../../apis";
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
      return <button type="submit" onClick={toggleEdit}>更新</button>
    } else {
      return <button onClick={toggleEdit}>編集</button>
    }
  }

  return (
    <>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleEditPlace();
        }}
      >       
        <StyledCard
          variant="outlined"
          >
          <CardInner>
            <dl>
              <dt>名前</dt>
              <dd><input type="text" name="name" defaultValue={place.name} disabled={!edit}/></dd>
            </dl>
            <dl>
              <dt>カテゴリー</dt>
              {place.PlaceCat ? <dd>{place.PlaceCat.name}</dd> : '未登録'}
            </dl>
            <dl>
              <dt>ID</dt>
              <dd>{place.id}</dd>
            </dl>
            <dl>
              <dt>国</dt>
              <dd>{place.country}</dd>
            </dl>
            <dl>
              <dt>郵便番号</dt>
              <dd>{place.postalCode}</dd>
            </dl>
            <dl>
              <dt>都道府県</dt>
              <dd>{place.prefecture}</dd>
            </dl>
            <dl>
              <dt>市区町村</dt>
              <dd>{place.city}</dd>
            </dl>
            <dl>
              <dt>番地</dt>
              <dd>{place.street}</dd>
            </dl>
            <dl>
              <dt>TEL</dt>
              <dd>{place.tel}</dd>
            </dl>
            <dl>
              <dt>FAX</dt>
              <dd>{place.fax}</dd>
            </dl>

          </CardInner>
        </StyledCard>
        {/* <div className="card">
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
        </div> */}
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
              {place.Events.length >= 1 && <StyledTab label="公演履歴" />}
              {place.PlaceMemos.length >= 1 && <StyledTab label="メモ" />}
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
            {place.Events.length >= 1 &&
              <MainArea>
              {events.map((event) => {
                return <EventList key={event.id} event={event} />;
              })}
              </MainArea>
            }
            {place.PlaceMemos.length >= 1 &&
              <MainArea>
                {placeMemos.map((placeMemo) => {
                  return <PlaceMemoList key={placeMemo.id} placeMemo={placeMemo} />;
                })}
              </MainArea>
            }
          </SwipeableViews> 
        </>
      )}
    </>
  );
}