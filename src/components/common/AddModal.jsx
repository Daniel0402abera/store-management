import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid whiteSmoke',
  boxShadow: 24,
  p: 4,
};

export default function AddModal({ buttonName, title, inputFields, actionLabel, onAdd }) {
  const initialInputValues = inputFields.reduce((acc, field) => {
    acc[field.stateVariable] = '';
    return acc;
  }, {});

  const [inputValues, setInputValues] = useState(initialInputValues);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInputValues(initialInputValues); 
    setOpen(false)
  };

  const handleAdd = () => {
    onAdd(inputValues);
    handleClose();
  };

  return (
    
   <div>
    <Button onClick={handleOpen}>{buttonName}</Button>
     <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {inputFields.map((field, index) => (
           <div key={index}>
           {field.type === 'date' && (
             <Typography variant="body1" sx={{ mt: 2 }}>
               {field.label}
             </Typography>
           )}
           <TextField
             label={field.type !== 'date' ? field.label : ''}
             value={inputValues[field.stateVariable]}
             type={field.type || 'text'}
             onChange={(e) => {
               const newValue = e.target.value;
               setInputValues((prevValues) => ({
                 ...prevValues,
                 [field.stateVariable]: newValue,
               }));
             }}
             fullWidth
             sx={{ mt: field.type !== 'date' ? 2 : 0 }} // Adjust the mt (margin-top) as needed
           />
         </div>
        ))}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            {actionLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
   </div>
  );
}
