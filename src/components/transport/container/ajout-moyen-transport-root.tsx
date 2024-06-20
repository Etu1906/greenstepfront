import React from "react";
import AjoutMoyenTransport from "../components/AjoutMoyenTransport";
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './moyen-transport.scss';
const AjoutMoyenTransportRoot: React.FC = () => {
  return (
    <>
    <IonPage>
      <AjoutMoyenTransport />
    </IonPage>
    </>
  );
}

export default AjoutMoyenTransportRoot;
