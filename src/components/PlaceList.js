import { Link } from "react-router-dom";

export function PlaceList({ place }) {
  return (    
    <Link
      key={place.id}
      className="card link"
      to={`/places/${place.id}`}
    >
      <div className="head_main">
          <p className="name_large"><span>{place.name}</span></p>
      </div>
    </Link>
  );
}
