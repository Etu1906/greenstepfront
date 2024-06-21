import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { DashboardHead } from "../components/DashboardHead";
import "../style/dashboard.css";
import { GreenDashboard } from "../components/GreenDashboard";
import { RedDashboard } from "../components/RedDashboard";
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
      <div className="dashboard">
        <DashboardHead/>
        <Tabs
          className="tabs"
          value={state.tab.toString()}
          onChange={handleTabChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="1" label="Mes pas" />
          <Tab value="2" label="Empreinte Carbone" />
        </Tabs>
        {state.tab==1 && <GreenDashboard/>}
        {state.tab==2 && <RedDashboard/>}

      </div>
    </>
  );
};
