import { IonProgressBar } from "@ionic/react";
import { ProgressProps } from "../types/DashboardTypes";

export const Progress: React.FC<ProgressProps> = (props: ProgressProps) => {
  var percentage;
  var status = 0;
  if (props.old_value == 0) {
    percentage = 0;
  } else {
    percentage = props.actual_value / props.old_value;
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
  return (
    <>
        <IonProgressBar
          value={percentage}
          className=" my-progress"
          color={color}
        ></IonProgressBar>      
    </>
  );
};
