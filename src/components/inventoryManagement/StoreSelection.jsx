import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useGet from '../../services/useGet';
import { baseURL } from '../../constants';

const options = ['Option 1', 'Option 2','Option 2','Option 2',];

export default function ControllableStates() {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const {data} = useGet(`${baseURL}api/v1/stores`,'');
  console.log(data)

  return (
    <div style={{display:'flex'}}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Store" />}
      />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Store" />}
      />
     <TextField
          id=""
          label="Quantity"
          type='number'
        />
    </div>
  );
}