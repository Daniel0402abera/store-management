import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography, Paper, MenuItem } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { darken } from "@mui/material";
import useGet from "../../services/useGet";
import { baseURL } from "../../constants";
import PurchaseOrderModal from "./PurchaseOrderModal";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  tableContainer: {
    backgroundColor: "red",
    marginBottom: theme.spacing(2),
  },
  rowActions: {
    display: "flex",
    flexWrap: "nowrap",
    gap: "20px",
  },
  actionButton: {
    backgroundColor: "whiteSmoke",
  },
  tablePaper: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  rowBackground: {
    borderRadius: "8px",
    padding: "8px",
  },
  addButton: {
    backgroundColor: "primary",
    color: "white",
  },
}));

export const PurchaseOrderList = () => {
  const classes = useStyles();
  const { data, isLoading } = useGet(`${baseURL}api/v1/purchase-orders`, "");
  const [tableData, setTableData] = useState([]);

  const reformattedData = data?.map((order) => ({
    storeName: order.store.storeName,
    itemName: order.item.itemName,
    quantity: order.quantity,
    supplierName: order.supplier.supplierName,
    orderStatus: order.purchaseOrderStatus,
    orderNumber: order.orderNumber,
  }));

  useEffect(() => {
    setTableData(reformattedData);
  }, [data, reformattedData]);
  const status = ['PENDING','APPROVED','DELIVERED']
  const columns = useMemo(
    () => [
      {
        accessorKey: "storeName",
        header: "Store Name",
      },
      {
        accessorKey: "itemName",
        header: "Item list",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "orderNumber",
        header: "Purchase order number",
      },
      {
        accessorKey: "orderStatus",
        header: "Order Status",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: status?.map((status,index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          )),
        },
      },
    ],
    []
  );

  return (
    <div className={classes.root}>
      <Box mt={2} textAlign="center">
        <PurchaseOrderModal />
      </Box>
      <Paper className={classes.tablePaper}>
        <MaterialReactTable
          columns={columns}
          state={{ isLoading: isLoading }}
          data={tableData || []}
          enableRowActions
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              fontSize: "15px",
            },
          }}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              borderRadius: "0",
              border: "0.5px dashed #D5D7DF",
            },
          }}
          muiTableBodyProps={{
            sx: (theme) => ({
              "& tr:nth-of-type(odd)": {
                backgroundColor: darken(theme.palette.background.default, 0.04),
              },
            }),
          }}
          tableClassName={classes.tableContainer}
          renderDetailPanel={({ row }) => (
            <Box className={classes.rowBackground}>
              <Typography>Address: {row.original.address}</Typography>
              <Typography>City: {row.original.city}</Typography>
              <Typography>State: {row.original.state}</Typography>
            </Box>
          )}
          renderRowActions={({ row, table }) => (
            <Box className={classes.rowActions}>
              <IconButton
                className={classes.actionButton}
                color="secondary"
                onClick={() => {
                  table.setEditingRow(row);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className={classes.actionButton}
                color="error"
                onClick={() => {
                  const newData = tableData.filter(
                    (item, index) => index !== row.index
                  );
                  setTableData(newData);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      </Paper>
    </div>
  );
};

export default PurchaseOrderList;
