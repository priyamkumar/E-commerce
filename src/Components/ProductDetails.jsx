import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../actions/productAction";
import { useParams } from "react-router-dom";
import MetaData from "./MetaData";
import ReviewCard from "./ReviewCard";
import Loader from "./Loader";
import { addItemsToCart } from "../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../constants/productConstants";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  function decreaseQuantity() {
    if (quantity === 1) return;
    setQuantity((quantity) => quantity - 1);
  }

  function increaseQuantity() {
    if (product.stock <= quantity) return;
    setQuantity((quantity) => quantity + 1);
  }

  function addToCartHandler() {
    dispatch(addItemsToCart(params.id, quantity));
    toast.success("Item added to cart.");
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  function reviewSubmitHandler() {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      toast.error(error);
    }
    if (reviewError) {
      dispatch(clearErrors());
      toast.error(reviewError);
    }
    if (success) {
      toast.success("Review submitted successfully.");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, reviewError, success, toast]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={`${product.name} -- E-Commerce`} />
      <div className="productDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="carouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product #{product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Rating
              key={`stars_${product.ratings}`}
              {...options}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#0dcaf0",
                },
              }}
            />{" "}
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>₹{product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input value={quantity} type="number" readOnly />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                disabled={product.stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
            <p>
              Status:{" "}
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      <h3 className="reviewsHeading">Reviews</h3>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#0dcaf0",
              },
              "& .MuiRating-iconHover": {
                color: "#0dcaf0",
              },
            }}
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </>
  );
}
