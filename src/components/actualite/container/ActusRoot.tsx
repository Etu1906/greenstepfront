import { IonContent } from "@ionic/react";
import { ActuHead } from "../components/ActuHead";
import { ActusComponents } from "../components/ActusComponents";
import "../style/actus.css";
export const ActusRoot: React.FC = () => {
  return (
    <>
      <IonContent>
        <ActuHead></ActuHead>
        <ActusComponents />
      </IonContent>
    </>
  );
};
