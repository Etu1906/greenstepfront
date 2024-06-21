import { IonMenuButton } from "@ionic/react";
export const DashboardHead: React.FC = () => {
  return (
    <>
      <div className="dashboard-head">
        <IonMenuButton />

        <span>Mon tableau de bord</span>
        <div className="my-button">LV10</div>
      </div>
    </>
  );
};
