import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography, Paper, MenuItem } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import AddModal from "../common/AddModal";
import { darken } from "@mui/material";
import useGet from "../../services/useGet";
import { baseURL } from "../../constants";

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

export const ItemList = () => {
  const classes = useStyles();
  const { data, isLoading } = useGet(`${baseURL}api/v1/items`, "");
  const {data:categories, isLoading:isLoadingCategories } = useGet(`${baseURL}api/v1/categories`,"");

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  }, [data]);



  const categoryOptions = useMemo(() => {
    if (isLoadingCategories || !categories) {
      return [];
    }
  
    return categories.map((category) => ({
      value: category?.categoryId?.toString(),
      label: category?.categoryName,
    }));
  }, [categories, isLoadingCategories]);
  // const initialData = [
  //   {
  //     firstName: 'Dylan',
  //     lastName: 'Murray',
  //     address: '261 Erdman Ford',
  //     city: 'East Daphne',
  //     state: 'Kentucky',
  //   },
  //   {
  //     firstName: 'Raquel',
  //     lastName: 'Kohler',
  //     address: '769 Dominic Grove',
  //     city: 'Columbus',
  //     state: 'Ohio',
  //   },
  //   // ... (other data entries)
  // ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemName",
        header: "Item Name",
      },
      {
        accessorKey: "category",
        header: "Category",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: categoryOptions?.map((option,index) => (
            <MenuItem key={index} value={option?.value}>
              {option?.label}
            </MenuItem>
          )),
        },
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "initialQuantity",
        header: "Initial Quantity",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    []
  );

  const handleAddItem = () => {
    // Add a new item to the data array
    // const newItem = {
    //   firstName: 'New',
    //   lastName: 'Item',
    //   address: '123 New Address',
    //   city: 'New City',
    //   state: 'New State',
    // };
    // setTableData([...tableData, newItem]);
  };

  return (
    <div className={classes.root}>
      <AddModal
        buttonName="Add Category "
        title="Add Category"
        inputFields={[
          { label: "Category Name", stateVariable: "categoryName" },
        ]}
        actionLabel="Add"
        onAdd={handleAddItem}
        endpoint={`${baseURL}api/v1/categories`}
      />

      <Box mt={2} textAlign="center">
        <AddModal
          buttonName="Add Item"
          title="Add Item"
          inputFields={[
            { label: "Name", stateVariable: "itemName" },
            { label: "Price", stateVariable: "price" },
            { label: "Quantity", stateVariable: "initialQuantity" },
            { label: "Description", stateVariable: "description" },
            {
              type: "select",
              label: "Category",
              stateVariable: "categoryId",
              options: categoryOptions
            },
          ]}
          actionLabel="Add"
          onAdd={handleAddItem}
          endpoint={`${baseURL}api/v1/items`}
        />
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

export default ItemList;
