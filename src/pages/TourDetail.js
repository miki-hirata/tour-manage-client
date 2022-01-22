import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Breadcrumb, Loading, FormatDate, FormatUpdate, SelectPlace, EventList} from "../components";
import { getTour, handleDeleteTour, handleEditTour, getTourEvents } from "../apis";


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
        <div className="card flex">
          <div className="head_main">
            <input type="text" name="name" defaultValue={tour.name} className="name_small" disabled={!edit}/>
          </div>
        </div>
        <div className="card">
          <div className="num">
            <span>ID</span>
            <span>{tour.id}</span>
          </div>
          <div className="memo">
            <textarea type="text" name="memo" defaultValue={tour.memo} disabled={!edit}/>
          </div>
        </div>
        {/* <SelectPlace /> */}
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

  const params = useParams();

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
      <div className="tour_section">
        {tour == null ? (
          <Loading />
        ) : (
          <>
          <TourDetail
            tour={tour}
          />
          {events && events.map((event) => {
            return <EventList key={event.id} event={event} tour={tour}/>;
          })}
          {/* {tour.Events[0] && <TourEvent tour={tour}/>} */}
          </>
        )}
        
      </div>
    </>
  );
}
