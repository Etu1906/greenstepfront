import React from "react";
import AjoutMoyenTransport from "../components/AjoutMoyenTransport";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import './moyen-transport.scss';
const AjoutMoyenTransportRoot: React.FC = () => {
  return (
    <>
    <IonContent>
      <AjoutMoyenTransport />
    </IonContent>
    </>
  );
}

export default AjoutMoyenTransportRoot;
