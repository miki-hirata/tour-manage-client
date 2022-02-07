import { Link } from "react-router-dom";
import { FormatDate, StyledCard, CardInnerHead } from "./index";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { notSP, sp } from "../setting"
import { blueGrey } from '@mui/material/colors';
import StarsIcon from '@mui/icons-material/Stars';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import CircleIcon from '@mui/icons-material/Circle';

function EventIcon({ cat }) {
  if (cat == 1){
    return <StarsIcon sx={{ color: blueGrey[500] }}/>;
  } else if (cat == 2) {
    return <DirectionsBusIcon sx={{ color: blueGrey[500] }}/>;
  } else if (cat == 3) {
    return <ModeNightIcon sx={{ color: blueGrey[500] }}/>;
  } else {
    return <CircleIcon sx={{ color: blueGrey[500] }}/>;
  }
}
export function EventList({ event, tour, order}) {
  return (
    
    <StyledCard>
      <Link
      key={event.id}
      //to={tour ? `/tours/events/${tour.id}` : `/events/${event.id}`}
      to={tour ? { pathname: `/tours/events/${tour.id}`, state: { eventIndex: order } } : `/events/${event.id}`}
      >
        <CardInnerHead>
          <div className="inner_flex">
            <div className="main">
              <FormatDate date={event.date} />
              <div className="name">
                <h2 className="font_main">
                  {event.name != null && event.name.substr( 0, 20 )}
                </h2>
                {event.Place != null && 
                  <p className="font_sub">
                  <span>{event.Place.name.substr( 0, 20 )}</span>
                  </p>
                }
              </div>
            </div>
            {event.memo != null &&
              <MediaQuery query={notSP}>
                <div className="info">
                  <p className="font_sub">
                    <span>{event.memo.substr( 0, 20 )}</span>
                  </p>
                </div>
              </MediaQuery>
            }
          </div>
          <EventIcon cat={event.EventCatId}/>
        </CardInnerHead>
      </Link>
    </StyledCard>
  );
}

const HeadMainArea = styled.div`
  margin-left: 40px;
  ${sp`
    margin-left: 20px;
  `}
`;