import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../actions/productAction";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import MetaData from "./MetaData";

const categories = [
  "Clothing",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "SmartPhones",
];

export default function Products() {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState([0]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { loading, error, products, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  const { keyword } = params;
  const alert = useAlert();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handlePrice = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      alert.error(error);
    }
    dispatch(getProduct(keyword, page, price, category, ratings));
  }, [dispatch, keyword, page, price, category, ratings, alert, error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title={"Products - E-Commerce"} />
      <div className="products">
        <h3 className="productsHeading">Products</h3>
        <div className="products-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />
          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => setRatings(newRating)}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
            />
          </fieldset>
        </div>

        {resultPerPage < filteredProductsCount && (
          <div className="pagination-container">
            <Pagination
              color="primary"
              sx={{ button: { color: "#ffffff" } }}
              count={10}
              page={page}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
