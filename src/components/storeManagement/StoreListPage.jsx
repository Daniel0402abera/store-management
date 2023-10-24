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


export const StoreListPage = () => {

  const {data:data1,isLoading} = useGet(`${baseURL}api/v1/stores`,'');
  const columns = useMemo(
    //column definitions...
    () => [
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
      },
      {
        accessorKey: "openingDate",
        header: "Opening Date",
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
            { label: "Store Type", stateVariable: "storeType", type: "select" },
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
              color="primary"
              onClick={() =>
                window.open(
                  `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`
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
