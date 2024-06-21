import { useState } from "react";
import { DashboardComponent } from "../components/DashboardComponent";
import { DashboardHead } from "../components/DashboardHead";
import { IonContent, IonPage } from "@ionic/react";
import "../style/dashboard.css";

interface DashboardState {
  tab: number;
}
const initialState = {
  tab: 1,
};
export const DashboardRoot: React.FC = () => {
  const [state, setState] = useState<DashboardState>(initialState);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setState((state) => ({
      ...state,
      tab: parseInt(newValue),
    }));
  };
  return (
    <>
        <IonContent>
          <div className="dashboard">
            <DashboardHead />
            <DashboardComponent />
          </div>
        </IonContent>
    </>
  );
};
