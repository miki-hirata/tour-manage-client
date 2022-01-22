import { Link } from "react-router-dom";

export function Breadcrumb({ links }) {
  return (
    <nav className="bread_area">
      <ul>
        {links.map(({ href, content, active }, i) => {
          return (
            <li key={i} className={active ? "is-active" : ""}>
              <Link to={href}>{content}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
