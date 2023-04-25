import { Link } from "react-router-dom";
import "./animeCard.css";

export default ({ title, image, slug }) => {
  return (
    <Link to={`anime/${slug}`}>
      <div>
        <img src={image} />
      </div>
      <span className="anime__card__title">{title}</span>
    </Link>
  );
};
