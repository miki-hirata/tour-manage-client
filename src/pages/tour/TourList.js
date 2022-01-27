import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loading, MainArea, TourList } from "../../components";
import { getTours } from "../../apis";

export function TourListPage({ setHdTitle }) {
  const [tours, setTours] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getTours({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setTours(data);
      console.log(data);
    });
  }, [page]); 

  return (
    <>
      {tours == null ? (
        <Loading />
      ) : (
        <MainArea>
          {tours.map((tour) => {
            return <TourList key={tour.id} tour={tour} />;
          })}
        </MainArea>
      )}
      
    </>
  );
}

