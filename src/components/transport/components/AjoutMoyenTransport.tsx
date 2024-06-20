import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const AjoutMoyenTransport: React.FC = () => {
  const type = [{label: 'vélo'}, {label: 'voiture'},{label: 'moto'}]
  return (
    <>
      <div className="container__moyen-transport">
        <div className="title__container">
          <div className="back">
            <ArrowBackIcon/>
          </div>
          <div className="">
            Ajouter moyen de transport
          </div>
          <div className="empty">
            
          </div>
        </div>
        <div className="moyen__section">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={type}
          sx={{
            width: 300,
            border: '1px solid rgba(0,0,0,.25)',
            outline:'none',
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

          renderInput={(params) => <TextField
            sx={{
              borderRadius: '25px'
            }}
             {...params} label="Type" />}
        />
        </div>
      </div>
    </>
  );
}

export default AjoutMoyenTransport;