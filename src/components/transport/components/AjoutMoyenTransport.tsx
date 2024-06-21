import { IonToast } from "@ionic/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormGroup } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import Marque from "../../../shared/components/Marque";
import Modele from "../../../shared/components/Modele";
import MoyenTransport from "../../../shared/components/MoyenTransport";
import Type from "../../../shared/components/Type";
import ColorButton from "../../../shared/hooks/ColorButton";
import IOSSwitch from "../../../shared/hooks/IOSSwitch";
import SelectAutocomplete from "../../form/Select";
import "./toast.scss";
interface MoyenTransportState {
  moyenTransport: MoyenTransport;
  on_load: boolean;
  success: boolean;
}

export function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

const AjoutMoyenTransport: React.FC = () => {
  const [state, setState] = useState<MoyenTransportState>({
    moyenTransport: {
      type: { nom: "", id: 0 },
      marque: null,
      modele: null,
      transportCommun: false,
      personnel: false,
    },
    on_load: true,
    success: false,
  });
  const [types, setTypes] = useState<Type[]>([]);
  const [marques, setMarques] = useState<Marque[]>([]);
  const [modeles, setModeles] = useState<Modele[]>([]);

  useEffect(() => {
    fetch("/type.json")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
        return fetch("/data.json");
      })
      .then((response) => response.json())
      .then((data) => {
        setMarques(data.voitures.map((voiture: any) => voiture.marques).flat());
        setState((prevState) => ({ ...prevState, on_load: false }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleTypeChange = (event: any, value: any) => {
    setState({
      ...state,
      moyenTransport: {
        ...state.moyenTransport,
        type: { nom: value.label, id: value.id },
        marque: null,
        modele: null,
      },
    });
  };

  const handleMarqueChange = (event: any, value: any) => {
    setState({
      ...state,
      moyenTransport: {
        ...state.moyenTransport,
        marque: { nom: value.label, id: value.id, modeles: [] },
        modele: null,
      },
    });

    const selectedMarque = marques.find((marque) => marque.id === value.id);
    if (selectedMarque) {
      setModeles(selectedMarque.modeles);
    }
  };

  const handleModeleChange = (event: any, value: any) => {
    setState({
      ...state,
      moyenTransport: {
        ...state.moyenTransport,
        modele: { nom: value.label, id: value.id },
      },
    });
  };

  const handleTransportCommunChange = (event: any) => {
    setState({
      ...state,
      moyenTransport: {
        ...state.moyenTransport,
        transportCommun: event.target.checked,
      },
    });
  };

  const handlePersonnelChange = (event: any) => {
    setState({
      ...state,
      moyenTransport: {
        ...state.moyenTransport,
        personnel: event.target.checked,
      },
    });
  };

  const handleValider = () => {
    const moyenTransportsFromLocalStorage = JSON.parse(
      localStorage.getItem("moyenTransports") || "[]"
    );

    moyenTransportsFromLocalStorage.push(state.moyenTransport);

    localStorage.setItem(
      "moyenTransports",
      JSON.stringify(moyenTransportsFromLocalStorage)
    );
    console.log("tonga");
    setState((prevState) => ({ ...prevState, success: true }));
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, success: false }));
    }, 3000);
    // setState({
    //   moyenTransport: {
    //     type: { nom: '', id: 0 },
    //     marque: null,
    //     modele: null,
    //     transportCommun: false,
    //     personnel: false
    //   },
    //   on_load: false
    // });
  };
  return (
    <>
      <div className="container__moyen-transport">
        <div className="title__container">
          <div className="back">
            <ArrowBackIcon />
          </div>
          <div className="moyen__title">Ajouter moyen de transport</div>
        </div>
        {state.on_load ? (
          <div className="loader-container">
            <GradientCircularProgress />
          </div>
        ) : (
          <div className="moyen__section">
            <SelectAutocomplete
              label="Type"
              options={types.map((type) => ({ id: type.id, label: type.nom }))}
              onChange={handleTypeChange}
            />
            {state.moyenTransport.type.nom === "voiture" && (
              <SelectAutocomplete
                label="Marque"
                options={marques.map((marque) => ({
                  id: marque.id,
                  label: marque.nom,
                }))}
                onChange={handleMarqueChange}
              />
            )}
            {state.moyenTransport.marque && (
              <SelectAutocomplete
                label="Modèle"
                options={modeles.map((modele) => ({
                  id: modele.id,
                  label: modele.nom,
                }))}
                onChange={handleModeleChange}
              />
            )}
            <FormGroup>
              <FormControlLabel
                sx={{
                  marginBottom: "10px",
                }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={state.moyenTransport.transportCommun}
                    onChange={handleTransportCommunChange}
                  />
                }
                label="Transport en commun"
              />
              <FormControlLabel
                sx={{
                  marginBottom: "20px",
                }}
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={state.moyenTransport.personnel}
                    onChange={handlePersonnelChange}
                  />
                }
                label="Personnel"
              />
            </FormGroup>
            <ColorButton onClick={handleValider}>Valider</ColorButton>
            {state.success && (
              <IonToast
                isOpen={state.success}
                message="Moyen de transport ajouté!"
                position="bottom"
                className="custom-toast"
                onDidDismiss={() => console.log("Toast dismissed")}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AjoutMoyenTransport;
