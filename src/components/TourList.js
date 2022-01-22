import { Link } from "react-router-dom";

export function TourList({ tour }) {
  return (    
    <Link
      key={tour.id}
      className="card link"
      to={`/tours/${tour.id}`}
    >
      <div className="head_main">
          <p className="name_large"><span>{tour.name}</span></p>
      </div>
    </Link>
  );
}
