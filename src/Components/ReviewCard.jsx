import React from "react";
import Rating from "@mui/material/Rating";

export default function ReviewCard({ review }) {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={"/Profile.png"} alt="User" />
      <p>{review.name}</p>
      <Rating
        {...options}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#0dcaf0",
          },
        }}
      />{" "}
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
}
