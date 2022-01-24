import { Link } from "react-router-dom";
import { StyledCard, CardInnerHead, HeadMainFont, HeadSubFont } from "./index";

export function TourList({ tour }) {
  return (    
    <StyledCard>
      <Link
        key={tour.id}
        to={`/tours/${tour.id}`}
      >      
        <CardInnerHead>
          <HeadMainFont>{tour.name}</HeadMainFont>
        </CardInnerHead>
      </Link>
    </StyledCard>
  );
}
