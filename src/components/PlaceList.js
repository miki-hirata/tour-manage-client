import { Link } from "react-router-dom";
import { FormatDate, StyledCard, CardInnerHead, HeadMainFont, HeadSubFont } from "./index";

export function PlaceList({ place }) {
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
