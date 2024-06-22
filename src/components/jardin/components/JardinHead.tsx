import { IonMenuButton } from "@ionic/react";

export const JardinHead: React.FC = () => {
  return (
    <>
      <div className="jardin-head">
        <IonMenuButton />
        <span>Mon jardin</span>
        <div className="my-button">Lv10</div>
      </div>
    </>
  );
};
