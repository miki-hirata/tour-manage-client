import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Loading, MainArea,  StyledCard, CardInnerHead, HeadMainFont } from "../../components";
import { getTours } from "../../apis";
import MediaQuery from "react-responsive";
import { onlyPC, notSP } from "../../setting"
import { blueGrey, red, yellow, green, blue } from '@mui/material/colors';
import CircleIcon from '@mui/icons-material/Circle';

//iconColor 1 赤　2 黄色 3 緑 4 青

function TourIcon({ iconColor }) {
  if (iconColor == 1){
    return <CircleIcon sx={{ color: red[500] }}/>;
  } else if (iconColor == 2) {
    return <CircleIcon sx={{ color: yellow[500] }}/>;
  } else if (iconColor == 3) {
    return <CircleIcon sx={{ color: green[500] }}/>;
  } else if (iconColor == 4) {
    return <CircleIcon sx={{ color: blue[500] }}/>;
  } else {
    return <CircleIcon sx={{ color: blueGrey[500] }}/>;
  }
}

function TourList({ tour }) {
  return (    
    <StyledCard>
      <Link
        key={tour.id}
        to={`/tours/${tour.id}`}
      >
        <CardInnerHead>
          <div className="inner_flex">
            <h2 className="font_main">
              {tour.name.substr( 0, 20 )}
            </h2>
            
            {tour.memo != null &&
              <MediaQuery query={notSP}>
                <div className="info">
                  <p className="font_sub">
                    <span>{tour.memo.substr( 0, 20 )}</span>
                  </p>
                </div>
              </MediaQuery>
            }
          </div>
          
          <TourIcon iconColor={tour.iconColor}/>
        </CardInnerHead>
      </Link>
    </StyledCard>
  );
}

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

