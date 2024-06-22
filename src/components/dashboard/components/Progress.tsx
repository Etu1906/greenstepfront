import { ProgressProps } from "../types/DashboardTypes";

export const Progress: React.FC<ProgressProps> = (props: ProgressProps) => {
  var percentage;
  var status = 0;
  if (props.old_value == 0) {
    percentage = 0;
  } else {
    percentage = props.actual_value / props.old_value;
  }
  var borderRadius = "20px 0px 0px 20px";
  if (props.old_value <= props.actual_value) {
    percentage = 1;
    borderRadius = "20px";
  }
  var color;

  if (props.type == 1) {
    if (percentage >= 0 && percentage <= 0.25) {
      status = 0;
      color = "danger";
    } else if (percentage > 0.25 && percentage <= 0.5) {
      status = 1;
      color = "warning";
    } else if (percentage > 0.5 && percentage <= 0.75) {
      status = 2;
      color = "secondary";
    } else {
      status = 3;
      color = "success";
    }
  } else {
    if (percentage >= 0 && percentage <= 0.25) {
      status = 3;
      color = "success";
    } else if (percentage > 0.25 && percentage <= 0.5) {
      status = 2;
      color = "secondary";
    } else if (percentage > 0.5 && percentage <= 0.75) {
      status = 1;
      color = "warning";
    } else {
      status = 0;
      color = "danger";
    }
  }
  var sentence_pas;
  var sentence_carbone;
  if (props.actual_value < props.old_value) {
    sentence_pas = `${
      props.old_value - props.actual_value
    } pas de plus pour atteindre votre score d'hier`;
    sentence_carbone = `Vous avez émis ${
      props.old_value - props.actual_value
    }kg de carbone en moins`;
  } else {
    sentence_pas = `Bravo! Vous avez fait ${
      props.actual_value - props.old_value
    } de pas qu'hier`;
    sentence_carbone = `Vous avez émis ${
      props.actual_value - props.old_value
    }kg de plus aujourd'hui`;
  }

  return (
    <>
      <div className="my-progress-container">
        <div
          className="my-progress"
          style={{
            width: `${percentage * 100}%`,
            backgroundColor: `var(--ion-color-${color})`,
            borderRadius: `${borderRadius}`,
          }}
        ></div>
        <div className="progress-inner">
          <div className="text-value">
            <span className="value">{props.actual_value}</span>
            {props.type == 1 && <span className="unit">pas</span>}
            {props.type == 2 && <span className="unit">kg</span>}
          </div>
          <div className="sentence">
            {props.type == 1 && <>{sentence_pas}</>}
            {props.type == 2 && <>{sentence_carbone}</>}
          </div>
        </div>
      </div>
    </>
  );
};
