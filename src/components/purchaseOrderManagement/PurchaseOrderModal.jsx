import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PurchaseOrderCreationPage from "./PurchaseOrderCreationPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid whiteSmoke",
  boxShadow: 24,
  p: 4,
};

export default function PurchaseOrderModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>ADD PURCHASE</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography style={{textAlign:'center'}} variant="h6" component="h2">
             ADD PURCHASE
          </Typography>
          <PurchaseOrderCreationPage handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
