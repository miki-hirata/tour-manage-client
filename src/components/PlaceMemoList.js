import { Link } from "react-router-dom";
import { FormatDate, StyledCard, CardInner, HeadSubFont } from "./index";

export function PlaceMemoList({ placeMemo }) {
  return (    
    <StyledCard
      variant="outlined"
      key={placeMemo.id}
    >
      <Link
        className="card link"
        to={`/places/${placeMemo.id}`}
      >
        <CardInner>
          <HeadSubFont>{placeMemo.memo}</HeadSubFont>
          <HeadSubFont>{placeMemo.User.name}</HeadSubFont>
        </CardInner>
      </Link>
    </StyledCard>
  );
}
