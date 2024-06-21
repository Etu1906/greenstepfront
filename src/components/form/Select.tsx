import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Option {
  id: number;
  label: string;
}

interface SelectAutocompleteProps {
  label: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<{}>, value: Option | null) => void;
}

const SelectAutocomplete: React.FC<SelectAutocompleteProps> = ({ label, options, onChange }) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      onChange={onChange} 
      getOptionLabel={(option) => option.label}
      sx={{
        width: 300,
        backgroundColor: 'white',
        borderRadius: '25px',
        marginBottom: '20px',
        '& .MuiInputBase-root': {
          color: '#241f1d',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: '25px',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#a3b18a',
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{
            borderRadius: '25px',
            '& label': {
              color: 'gray',
            },
            '& label.Mui-focused': {
              color: '#344e41',
            },
          }}
        />
      )}
    />
  );
};

export default SelectAutocomplete;
