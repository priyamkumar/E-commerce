import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import toast from "react-hot-toast";


export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      toast.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <div className="featured-products" id="featured-products">
      <h3 className="featured-products-heading">Featured Products</h3>
      <div className="featured-products-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
