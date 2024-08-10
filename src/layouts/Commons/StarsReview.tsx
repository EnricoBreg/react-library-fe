import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface Props {
  rating: number;
  size: number;
}

export const StarsReview = ({ rating, size }: Props) => {
  let fullStars = 0;
  let halfStars = 0;
  let emptyStars = 0;

  // Guard clause
  if (rating !== undefined && rating > 0 && rating <= 5) {
    for (let i = 0; i < 5; i++) {
      if (rating - 1 >= 0) {
        fullStars += 1;
        rating = rating - 1;
      } else if (rating === 0.5) {
        halfStars += 1;
        rating = rating - 0.5;
      } else if (rating === 0) {
        emptyStars += 1;
      } else {
        break;
      }
    }
  } else {
    emptyStars = 5;
  }

  return (
    <>
      {Array(fullStars)
        .fill(null)
        .map((_, i) => (
          <BsStarFill key={i} color="gold" size={size} />
        ))}
      {Array(halfStars)
        .fill(null)
        .map((_, i) => (
          <BsStarHalf key={i} color="gold" size={size} />
        ))}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <BsStar key={i} color="gold" size={size} />
        ))}
    </>
  );
};
