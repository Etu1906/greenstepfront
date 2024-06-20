import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from "../../form/input/Select";
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
        <Select options={type} />
        </div>
      </div>
    </>
  );
}

export default AjoutMoyenTransport;