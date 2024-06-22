import { IonMenuButton } from "@ionic/react";

export const ActuHead: React.FC = () => {
  return (
    <>
      <div className="actus-head">
        <IonMenuButton />
        <span>Les actus</span>
        <div className="my-button">Lv10</div>
      </div>
    </>
  );
};
