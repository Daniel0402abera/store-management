import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Typography } from '@mui/material';
import AddModal from '../common/AddModal';
import { Edit as EditIcon, Delete as DeleteIcon , Email as EmailIcon } from '@mui/icons-material';
// import { data as initialData } from './makeData';




export const StoreListPage = () => {
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
        {
          firstName: 'Ervin',
          lastName: 'Reinger',
          address: '566 Brakus Inlet',
          city: 'South Linda',
          state: 'West Virginia',
        },
        {
          firstName: 'Brittany',
          lastName: 'McCullough',
          address: '722 Emie Stream',
          city: 'Lincoln',
          state: 'Nebraska',
        },
        {
          firstName: 'Branson',
          lastName: 'Frami',
          address: '32188 Larkin Turnpike',
          city: 'Charleston',
          state: 'South Carolina',
        },
        {
            firstName: 'Branson',
            lastName: 'Frami',
            address: '32188 Larkin Turnpike',
            city: 'Charleston',
            state: 'South Carolina',
          },
          {
            firstName: 'Branson',
            lastName: 'Frami',
            address: '32188 Larkin Turnpike',
            city: 'Charleston',
            state: 'South Carolina',
          },
      ];

  const columns = useMemo(
    //column definitions...
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
    [],
    //end
  );

  const [data, setData] = useState(initialData);
  const handleAddStore = () => {
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
    <div>
       <Box mt={2} textAlign="center">
        <AddModal
            buttonName='Add Store'
            title="Add New Store"
            inputFields={[
                { label: 'Name', stateVariable: 'itemName' },
                { label: 'Location', stateVariable: 'location' },
                { label: 'Contact', stateVariable: 'Contact' },
                { label: 'Opening Date', stateVariable: 'Open Date', type: 'date' },
            ]}
            actionLabel="Add"
            onAdd={handleAddStore}
        />

        </Box>
      <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
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
          <Typography>Country: {row.original.country}</Typography>
        </Box>
      )}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <IconButton
            color="primary"
            onClick={() =>
              window.open(
                `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
              )
            }
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              data.splice(row.index, 1); //assuming simple data table
              setData([...data]);
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

export default StoreListPage;
