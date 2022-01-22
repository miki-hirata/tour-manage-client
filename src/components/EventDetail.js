import { useState } from "react";
import { Link } from "react-router-dom";
import { FormatDate, FormatUpdate } from "../components";
import { handleDeleteEvent, handleEditEvent } from "../apis";



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

export function EventDetail({ event }) {
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
    <>
      <form onSubmit={handleEditEvent}> 
        <div className="card flex">
          <FormatDate date={event.date} />
          {edit && <input type="date" name="date" defaultValue={defaultDate} disabled={!edit}/>}
          <div className="head_main">
            <input type="text" name="name" defaultValue={event.name} className="name_small" disabled={!edit}/>
            {event.Place &&
              <Link
                key={event.id}
                to={`/places/${event.Place.id}`}
              >
              <p className="name_large"><span>{event.Place.name}</span></p></Link>}
            {edit && <><label htmlFor="PlaceId">会場ID:</label><input type="number" name="PlaceId" defaultValue={event.PlaceId} placeholder="会場ID" /></>}
          </div>
        </div>
        <div className="card">
          <div className="num">
            <span>ID</span>
            <span>{event.id}</span>
          </div>
          <div className="memo">
            <textarea type="text" name="memo" defaultValue={event.memo} disabled={!edit}/>
          </div>
        </div>
        {/* <SelectPlace /> */}
        <input type="hidden" name="id" value={event.id}/>
        <EditButton />
      </form>
      <FormatUpdate updateAt={event.updatedAt}/>
      <EventDeleteButton event={event}/>
    </>
  );
}