import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Loading, MainArea, StyledCard, CardInnerHead, HeadMainFont } from "../../components";
import { getPlaces } from "../../apis";

function PlaceList({ place }) {
  return (
    <StyledCard>
      <Link
        key={place.id}
        className="card link"
        to={`/places/${place.id}`}
      >
        <CardInnerHead>
          <HeadMainFont>{place.name}</HeadMainFont>
        </CardInnerHead>
      </Link>
    </StyledCard>
  );
}


export function PlaceListPage({ setHdTitle }) {
  const [places, setPlaces] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;
  
  useEffect(() => {
    getPlaces({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setPlaces(data);
    });
  }, [page]); 


  return (
    <>
      {places == null ? (
        <Loading />
      ) : (
        <MainArea>
          {places.map((place) => {
            return <PlaceList key={place.id} place={place} />;
          })}
        </MainArea>
      )}
    </>
  );
}
