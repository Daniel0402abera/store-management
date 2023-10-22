import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Typography, Paper, } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon,  } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import AddModal from '../common/AddModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  tableContainer: {
    marginBottom: theme.spacing(2),
  },
  rowActions: {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '20px',
  },
  actionButton: {
    backgroundColor: 'whiteSmoke',
  },
  tablePaper: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  rowBackground: {
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '8px',
  },
  addButton: {
    backgroundColor: 'primary',
    color: 'white',
  },
}));

export const ItemList = () => {
  const classes = useStyles();

  const initialData = [
    {
      firstName: 'Dylan',
      lastName: 'Murray',
      address: '261 Erdman Ford',
      city: 'East Daphne',
      state: 'Kentucky',
    },
    {
      firstName: 'Raquel',
      lastName: 'Kohler',
      address: '769 Dominic Grove',
      city: 'Columbus',
      state: 'Ohio',
    },
    // ... (other data entries)
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Price',
      },
      {
        accessorKey: 'address',
        header: 'Quantity',
      },
      {
        accessorKey: 'city',
        header: 'Description',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    []
  );

  const [data, setData] = useState(initialData);

  const handleAddItem = () => {
    // Add a new item to the data array
    const newItem = {
      firstName: 'New',
      lastName: 'Item',
      address: '123 New Address',
      city: 'New City',
      state: 'New State',
    };
    setData([...data, newItem]);
  };

  return (
    <div className={classes.root}>
        <Box mt={2} textAlign="center">
        <AddModal
            buttonName='Add Item'
            title="Add Item"
            inputFields={[
                { label: 'Name', stateVariable: 'itemName' },
                { label: 'Price', stateVariable: 'itemPrice' },
                { label: 'Quantity', stateVariable: 'itemQuantity' },
                { label: 'Description', stateVariable: 'itemDescription' },
            ]}
            actionLabel="Add"
            onAdd={handleAddItem}
/>

        </Box>
      <Paper className={classes.tablePaper}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowActions
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
                  const newData = data.filter((item, index) => index !== row.index);
                  setData(newData);
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
