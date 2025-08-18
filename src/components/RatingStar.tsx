import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

interface RatingStarProps {
  rating?: number | undefined;
  gap?: string;
  size?: string;
}

const RatingStar = ({ rating, gap = "", size = "" }: RatingStarProps) => {
  const maxRating = 5;
  const starElements = [];

  if (!rating) {
    starElements.push(
      <FontAwesomeIcon
        key={0}
        icon={fas.faStar}
        style={{ color: "#ECEEF0" }}
        className="text-lg"
      />
    );
  }

  if (rating) {
    for (let i = 1; i <= maxRating; i++) {
      const starColor = i <= rating ? "#F59E0B" : "#ECEEF0";

      starElements.push(
        <FontAwesomeIcon
          key={i}
          icon={fas.faStar}
          style={{ color: starColor }}
          className="text-lg"
        />
      );
    }
  }

  return (
    <div className={`flex ${gap} ${size} items-center`}>
      {starElements}
      {rating ? <span>{rating}</span> : "No Rating Yet"}
    </div>
  );
};

export default RatingStar;
