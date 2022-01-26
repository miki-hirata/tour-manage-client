import { Link } from "react-router-dom";
import { FormatDate, StyledCard, CardInnerHead, HeadMainFont, HeadSubFont } from "./index";
import styled from "styled-components";
import { pc, sp, tab, shadow, mixinMaxWidth } from '../setting';

export function EventList({ event, tour }) {
  return (
    
    <StyledCard>
      <Link
      key={event.id}
      to={tour ? `/tours/events/${tour.id}` : `/events/${event.id}`}
      >
        <CardInnerHead>
          <FormatDate date={event.date} />
          
          <HeadMainArea>
            <HeadSubFont>{event.name}</HeadSubFont>
            {event.Place && 
              <HeadMainFont>{event.Place.name}</HeadMainFont>}
          </HeadMainArea>
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