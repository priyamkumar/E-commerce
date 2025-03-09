import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../actions/orderAction";
import { Link } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';
import toast from "react-hot-toast";

export default function MyOrders() {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    ,
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
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
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.status,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, toast, error]);

  return (
    <>
      <MetaData title={`${user.name}'s Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            sx={{
              '& .MuiDataGrid-cell': {
                color: '#ffffff',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#ffffff',
              },
              // Pagination controls text color
              '& .MuiTablePagination-root': {
                color: '#ffffff',
              },
              '& .MuiTablePagination-selectLabel': {
                color: '#ffffff',
              },
              '& .MuiTablePagination-displayedRows': {
                color: '#ffffff',
              },
              '& .MuiTablePagination-select': {
                color: '#ffffff',
              },
              '& .MuiTablePagination-selectIcon': {
                color: '#ffffff',
              },
              // For icons in pagination
              '& .MuiIconButton-root': {
                color: '#ffffff',
              }
            }}
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </>
  );
}
