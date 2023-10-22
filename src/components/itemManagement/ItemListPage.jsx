import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';


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
    gap: '40px',
  },
  actionButton: {
    backgroundColor: 'whiteSmoke',
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
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    []
  );

  const [data, setData] = useState(initialData);

  return (
    <div className={classes.root}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowActions
        tableClassName={classes.tableContainer}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
            }}
          >
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
    </div>
  );
};

export default ItemList;
