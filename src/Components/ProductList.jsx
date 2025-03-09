import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import MetaData from "./MetaData";
import Sidebar from "./Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { DELETE_PRODUCT_RESET } from "../constants/productConstants";
import toast from "react-hot-toast";

export default function ProductList() {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const navigateTo = useNavigate();

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      toast.error(error);
    }
    if (deleteError) {
      dispatch(clearErrors());
      toast.error(deleteError);
    }
    if (isDeleted) {
      toast.success("Product delete successfully.");
      navigateTo("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, toast, error, deleteError, navigateTo, isDeleted]);

  return (
    <>
      <MetaData title={`Admin Products`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
          />
        </div>
      </div>
    </>
  );
}
