import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { handleDeleteEvent, handleEditEvent, getEventSches } from "../apis";
import { FormatDate, FormatUpdate, StyledCard, CardInnerHead, CardInner, HeadMainFont, HeadSubFont } from "./index";
import styled from "styled-components";


function EventDeleteButton({ event }) {
  return (
    <>
      <form onSubmit={handleDeleteEvent}>
        <input type="hidden" name="id" value={event.id}/>
        <button type="submit">削除</button>
      </form>
    </>
  );
}

export function EventDetail({ event, sches }) {
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
  let defaultDate = new Date(event.date);//日付を何とかしてデフォルトセットしたい


  return (
    <div key={event.id}>
      <form onSubmit={handleEditEvent}> 
      
      <StyledCard
        variant="outlined"
      >
        <CardInnerHead>
          <FormatDate date={event.date} />
          {edit && <input type="date" name="date" defaultValue={defaultDate} disabled={!edit}/>}
          
          <HeadMainArea>
            <HeadSubFont>
              <input type="text" name="name" defaultValue={event.name} disabled={!edit}/>
            </HeadSubFont>
            {event.Place &&
              <Link
                key={event.id}
                to={`/places/${event.Place.id}`}
              >
                <HeadMainFont>{event.Place.name}</HeadMainFont>
              </Link>
            }
            {edit && <><label htmlFor="PlaceId">会場ID:</label><input type="number" name="PlaceId" defaultValue={event.PlaceId} placeholder="会場ID" /></>}
          </HeadMainArea>
        </CardInnerHead>
      </StyledCard>
      <StyledCard
        variant="outlined"
        >
        {event.EventSches.length >= 1 && 
          <CardInner>
            {sches.map((sche) => {
              return (
                <dl key={sche.id} >
                  <dt>{sche.time}</dt>
                  <dd>{sche.name}{sche.memo}</dd>
                </dl>
              );
            })}
          </CardInner>
        }
        <CardInner>
          <dl>
            <dt>ID</dt>
            <dd>{event.id}</dd>
          </dl>
          <dl>
            <dt>カテゴリー</dt>
            <dd>{event.EventCat.name}</dd>
          </dl>
          <dl>
            <dt>メモ</dt>
            <dd>{event.memo}</dd>
          </dl>
        </CardInner>
      </StyledCard>

        <div className="card">
          <div className="num">
            <span>ID</span>
            <span>{event.id}</span>
          </div>
        </div>
        {/* <SelectPlace /> */}
        <input type="hidden" name="id" value={event.id}/>
        <EditButton />
      </form>
      <FormatUpdate updateAt={event.updatedAt}/>
      <EventDeleteButton event={event}/>
    </div>
  );
}


const HeadMainArea = styled.div`
  margin-left: 40px;
`;

