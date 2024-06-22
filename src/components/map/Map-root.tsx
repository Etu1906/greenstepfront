import { IonContent, IonPage } from "@ionic/react";
import Map from "./MapComponent";

const MapRoot: React.FC = () => {
    return (
        <>
        <IonContent>
            <Map/>
        </IonContent>
        </>
    )
};

export default MapRoot;