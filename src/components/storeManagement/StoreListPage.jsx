import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import AddModal from "../common/AddModal";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
// import { data as initialData } from './makeData';
import { baseURL } from "../../constants";
// import useGet from "../../services/useGet";
import makeApiRequest from '../../services/req'

export const StoreListPage = () => {

  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }
  
      const url = new URL(`${baseURL}api/v1/stores/search`);
      url.searchParams.set('query', JSON.stringify(columnFilters ?? []));
      url.searchParams.set('query', globalFilter ?? '');
      try {
        const response = await fetch(url.href);
        const json = await response.json();

        setData(json || []); 
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, globalFilter]);
  


  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        muiTableBodyCellEditTextFieldProps: {
          disabled: true,

        },
      },
      {
        accessorKey: "storeName",
        header: "Store Name",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "contactInformation",
        header: "Contact",
      },
      {
        accessorKey: "storeType",
        header: "Store Type",
        muiTableBodyCellEditTextFieldProps: {
          disabled: true,
        
        },
      },
      {
        accessorKey: "openingDate",
        header: "Opening Date",
        muiTableBodyCellEditTextFieldProps: {
          disabled: true,
        
        },
      },
    ],
    []
  );



 

  const handleAddStore = () => {
    
  };
  const [id, setId] = useState(1);

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    try {
      const updatedData = await makeApiRequest(
        `${baseURL}api/v1/stores/${values.id}`,
        "PUT",
        values
      );

      if (updatedData) {
        data[row.index] = values;
        setId(row.index);
      }

      exitEditingMode();
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div>
      <Box mt={2} textAlign="center">
        <AddModal
          buttonName="Add Store"
          title="Add New Store"
          inputFields={[
            { label: "Name", stateVariable: "storeName" },
            { label: "Location", stateVariable: "location" },
            { label: "Contact", stateVariable: "contactInformation" },
            {
              label: "Opening Date",
              stateVariable: "openingDate",
              type: "date",
            },
            {
              type: "select",
              label: "Store Type",
              stateVariable: "storeType",
              options: [
                { value: "RETAIL", label: "RETAIL" },
                { value: "ONLINE", label: "ONLINE" },
                { value: "WHOLESALE", label: "WHOLESALE" },
              ],
            },
          ]}
          actionLabel="Add Store"
          onAdd={handleAddStore}
          endpoint={`${baseURL}api/v1/stores`}
        />
      </Box>
      
      <MaterialReactTable
        columns={columns}
        editingMode="modal" //default
        enableEditing={true? true : false}
        onEditingRowSave={handleSaveRow}
        enableRowActions
        data={data}
        // initialState={{ showColumnFilters: true }}
        manualFiltering={true}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'Error loading data',
              }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          
        }}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: "grid",
              margin: "auto",
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
            }}
          >
            <Typography>Address: {row.original.address}</Typography>
            <Typography>City: {row.original.city}</Typography>
            <Typography>State: {row.original.state}</Typography>
            <Typography>Country: {row.original.country}</Typography>
          </Box>
        )}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
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
                data?.splice(row.index, 1);
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
