import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { ReviewAPIResponse, ReviewModel } from "../../models/ReviewModel";
import { SpinnerLoading } from "../Commons/SpinnerLoading";
import { StarsReview } from "../Commons/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      const url = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error("Something went wrong :(");

      const responseJSON: BookModel = await response.json();

      setBook(responseJSON);
      setIsLoading(false);
    };

    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchBookReview = async () => {
      const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) throw new Error("Something went wrong!");

      const responseJsonReviews: ReviewAPIResponse =
        await responseReviews.json();

      const loadedReviews = responseJsonReviews._embedded.reviews;

      let weightedStarReviews = loadedReviews.reduce(
        (acc, currBook) => acc + currBook.rating,
        0
      );

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2.0) / 2.0
        ).toFixed(2);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReview().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading || isLoadingReview) return <SpinnerLoading />;

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          {/* immagine */}
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book.img} width="226" height="349" alt={book.title} />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          {/* titolo - autore - descrizione - valutazione */}
          <div className="container col-4 col-md-4">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          {/* Checkout - Review Box */}
          <CheckoutAndReviewBox mobile={false} book={book} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      {/* Mobile */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book.img} width="226" height="349" alt={book.title} />
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        {/* titolo - autore - descrizione - valutazione */}
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        {/* Checkout - Review Box */}
        <CheckoutAndReviewBox mobile={true} book={book} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
