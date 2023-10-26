import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  customButton: {
    margin: '10px',
    borderRadius: '10px', 
    backgroundColor: '#007BFF', 
    color: 'white', 
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)', 
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
    '&:hover': {
      backgroundColor: '#0056b3', 
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)', 
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', 
    },
  },
}));

const AddButton = ({ buttonName, onClickAction }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClickAction();
  };

  return (
    <Button
      className={classes.customButton}
      variant="contained"
      onClick={handleClick}
    >
      {buttonName}
    </Button>
  );
};

export default AddButton;
