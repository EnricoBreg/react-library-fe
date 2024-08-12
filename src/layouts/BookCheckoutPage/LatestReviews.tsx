import { Link } from "react-router-dom";
import { ReviewModel } from "../../models/ReviewModel";
import { Review } from "../Commons/Review";

interface Props {
  reviews: ReviewModel[];
  bookId: number | undefined;
  mobile: boolean;
}

export const LatestReviews = ({ reviews, bookId, mobile }: Props) => {
  return (
    <div className={mobile ? "mt-3" : "row mt-5"}>
      <div className={mobile ? "" : "col-sm-2 col_md-2"}>
        <h2>Latest Reviews: </h2>
      </div>
      <div className="col-sm-10 cold-md-10">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((review) => (
              <Review review={review} key={review.id}></Review>
            ))}

            <div className="m-3">
              <Link
                type="button"
                className="btn main-color btn-md text-white"
                to="#"
              >
                Reach all reviews
              </Link>
            </div>
          </>
        ) : (
          <div className="m-3">
            <p className="lead">Currently there are no reviews for this book</p>
          </div>
        )}
      </div>
    </div>
  );
};
