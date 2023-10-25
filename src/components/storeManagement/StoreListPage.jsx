import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import AddModal from "../common/AddModal";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
// import { data as initialData } from './makeData';
import { baseURL } from "../../constants";
import useGet from "../../services/useGet";
import usePutData from "../../services/usePut";
import makeApiRequest from '../../services/req'

export const StoreListPage = () => {

  const {data:data1,isLoading} = useGet(`${baseURL}api/v1/stores`,'');
  const columns = useMemo(
    //column definitions...
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

  const [data, setData] = useState([]);

  useEffect(()=>{
 setData(data1)
  },[data1])

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
        state={{ isLoading: isLoading }}
        columns={columns}
        data={data || []}
        editingMode="modal" //default
        enableEditing
        onEditingRowSave={handleSaveRow}
        enableRowActions
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
                console.log(table)
                table.setEditingRow(row);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                data1?.splice(row.index, 1); //assuming simple data table
                setData([...data1]);
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
