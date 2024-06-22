import { AirqualityProps } from "../types/DashboardTypes";

export const Airquality: React.FC<AirqualityProps> = (props: AirqualityProps) => {
  

  return (
    <>
      <div className="my-Airquality-container">
        <div className="Airquality-inner">
          <div className="text-value">
            <p>Niveau moyen de la qualité de l'air</p>
            <span className="value">{props.avg}</span>
            <p>Date {props.day}</p>
          </div>
        </div>
      </div>
    </>
  );
};
