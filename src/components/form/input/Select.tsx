import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface SelectProps {
  options: any;
}

const Select: React.FC<SelectProps> = ({ options }) => {
  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 4 }}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{
          width: 300,
          border: '1px solid rgba(0,0,0,.25)',
          outline: 'none',
          listStyle: 'none',
          backgroundColor: 'white', // Changer la couleur de fond
          borderRadius: '25px', // Ajouter des bordures arrondies
          '& .MuiInputBase-root': {
            color: 'blue', // Changer la couleur du texte
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '25px',
              borderColor: 'gray', // Changer la couleur de la bordure
            },
            '&:hover fieldset': {
              borderColor: 'black', // Changer la couleur de la bordure au survol
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green', // Changer la couleur de la bordure lorsque le champ est focalisé
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Type"
            sx={{
              borderRadius: '25px',
            }}
          />
        )}
      />
    </Box>
  );
};

export default Select;
