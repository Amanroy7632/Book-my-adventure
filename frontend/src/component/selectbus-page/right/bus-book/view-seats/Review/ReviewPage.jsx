const RatingBar = ({ rating, onRatingChange }) => {
  const handleClick = (ratingValue) => {
    onRatingChange(ratingValue);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 cursor-pointer ${
      filled ? "text-yellow-400" : "text-gray-300"
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="none"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const RatingDisplay = ({ rating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((value) => (
      <svg
        key={value}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 ${
          value <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="none"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../../utils/axiosInstance";
import { useCurrentUser } from "../../../../../../context/userContext";
import SelectBus from "../../../../SelectBus";
import Alert from "../../../../../CustomAlert/Alert";
import { Button } from "../../../../../commonUi";
import logo from "./logo.png";
import { useRef } from "react";

const ReviewPage = ({ busDetails }) => {
  const { currentUser, alertMessage, setAlertMessage } = useCurrentUser();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: currentUser ? currentUser.fullname : "",
    review: "",
    rating: 0,
  });
  const reviewSectionRef = useRef(null);
  const [page, setPage] = useState(1); // Page state for pagination
  const [hasMore, setHasMore] = useState(true); // To check if more data is available

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review && newReview.rating > 0) {
      try {
        const response = await axiosInstance.post("/feedback/register", {
          userId: currentUser?._id,
          username: newReview.name,
          review: newReview.review,
          rating: newReview.rating,
          route: busDetails?._id,
        });
        console.log(response);
        if (response.status === 201) {
          setAlertMessage("Review submitted successfully");
          setNewReview({ name: "", review: "", rating: 0 });
        }
      } catch (error) {
        setAlertMessage("Something went wrong " + error.message);
      }
      setReviews([
        ...reviews,
        {
          name: newReview.name,
          review: newReview.review,
          rating: newReview.rating,
        },
      ]);

      // console.log(reviews);
    }
  };

  const fetchFeedback = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/feedback?page=${page}&limit=5`
      );
      const data = await response.json();
      // console.log(data);
      setReviews((prev) => [...prev, ...data.data]); // Append new reviews
      if (data.data.length === 0 || data.data.length < 5) {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      fetchFeedback(page);
    }, [1500]);
    return () => clearTimeout(interval);
  }, [page]);

  const handleScroll = () => {
    const reviewSection = reviewSectionRef.current;
    if (
      reviewSection.scrollTop + reviewSection.clientHeight >=
        reviewSection.scrollHeight &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
    // console.log("Top Scroll: " + reviewSection.scrollTop);
    // console.log("Client height: " + reviewSection.clientHeight);
    // console.log("Scroll height: " + reviewSection.scrollHeigh);
    // console.log(
    //   reviewSection.scrollTop + reviewSection.clientHeight,
    //   reviewSection.scrollHeight
    // );
  };

  useEffect(() => {
    const reviewSection = reviewSectionRef.current;
    reviewSection.addEventListener("scroll", handleScroll);
    return () => {
      reviewSection.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <div className="max-w-4xl mx-auto p-8 pt-2">
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
      )}
      <section className="mb-8 form-section">
        <h2 className="text-2xl font-semibold mb-4">Add Your Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-lg">Name</label>
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-2 outline-none border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Review</label>
            <textarea
              name="review"
              value={newReview.review}
              onChange={handleInputChange}
              className="w-full p-2 outline-none border border-gray-300 rounded"
              rows="4"
              placeholder="Feedback"
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-lg">Rate Our Service</label>
            <RatingBar
              rating={newReview.rating}
              onRatingChange={handleRatingChange}
            />
          </div>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Review
          </Button>
        </form>
      </section>

      <section
        ref={reviewSectionRef}
        className=" relative mt-12 review-section min-h-[30vh] max-h-[72vh] overflow-y-scroll"
      >
        <h2 className=" sticky backdrop-blur-md top-0 text-2xl font-semibold mb-4">
          Customer Reviews
        </h2>
        <ul className="space-y-6 ">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="p-4 border border-gray-200 rounded flex items-center gap-2"
            >
              <div className="border w-12 h-12 rounded-full bg-gray-300">
                {logo && <img src={logo} alt="" />}
              </div>
              <div>
                <p className="text-lg font-semibold">{review.username}</p>
                <RatingDisplay rating={review.rating} />
                <p className="mt-2">{review.review}</p>
              </div>
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className=" flex items-center gap-1 justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-green-600"></div>
            <p className=" text-green-500 text-xl p-8">Loading more reviews...</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewPage;
