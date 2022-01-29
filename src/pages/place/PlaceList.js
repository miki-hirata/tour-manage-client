import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Loading, MainArea, StyledCard, CardInnerHead, HeadMainFont } from "../../components";
import { getPlaces } from "../../apis";
import MediaQuery from "react-responsive";
import { notSP } from "../../setting"
import styled from "styled-components";
import { blueGrey, red, green, orange } from '@mui/material/colors';

import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SchoolIcon from '@mui/icons-material/School';
import ParkIcon from '@mui/icons-material/Park';
import FestivalIcon from '@mui/icons-material/Festival';
import CircleIcon from '@mui/icons-material/Circle';

function PlaceIcon({ cat }) {
  if (cat == 1){
    return <FestivalIcon sx={{ color: blueGrey[500] }}/>;
  } else if (cat == 2) {
    return <SchoolIcon sx={{ color: blueGrey[500] }}/>;
  } else if (cat == 3) {
    return <ParkIcon sx={{ color: blueGrey[500] }}/>;
  } else {
    return <CircleIcon sx={{ color: blueGrey[500] }}/>;
  }
}

function PlaceList({ place }) {
  return (
    <StyledCard>
      <Link
        key={place.id}
        className="card link"
        to={`/places/${place.id}`}
      >
        <CardInnerHead>
          <div className="inner_flex">
            <h2 className="font_main">
              {place.name.substr( 0, 20 )}
            </h2>
            <MediaQuery query={notSP}>
              <div className="info">
                <p className="font_sub">
                  <span>{place.prefecture}</span>
                  <span>{place.city}</span>
                </p>
                
                {place.memo != null &&
                  <p className="font_sub">
                    <span>{place.memo.substr( 0, 20 )}</span>
                  </p>
                }
              </div>
            </MediaQuery>
          </div>
          
          <PlaceIcon cat={place.PlaceCatId}/>
        </CardInnerHead>
      </Link>
    </StyledCard>
  );
}/* 

const CardInnerPlace = styled(CardInnerHead)`
justify-content: space-between;
align-items: flex-start;
.inner_flex{
  width: 100%;
  display: flex;
  margin-right: 2em;
  align-items: center;
  justify-content: space-between;
}

.info{
  text-align: end;
  ${tab`
    width: 50%;
  `}
}

`;
 */


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
