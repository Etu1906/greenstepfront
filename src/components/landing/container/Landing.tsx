import { useEffect, useState } from "react";
import { Reward } from "../../dashboard/components/Reward";
import { DashboardRoot } from "../../dashboard/container/DashboardRoot";

interface LandingState {
  newDay: number;
}
const initialState: LandingState = {
  newDay: -1,
};
export const Landing: React.FC = () => {
  const [state, setState] = useState<LandingState>(initialState);
  useEffect(() => {
    // TODO: comment this
    localStorage.setItem("pas", "80");
    localStorage.setItem("old_pas", "90");
    localStorage.setItem("points", "1000");
    localStorage.setItem("level", "0");
    localStorage.setItem("carbone", "4");
    localStorage.setItem("old_carbone", "5");

    const lastVisitKey = "lastVisit";
    const storedDate = localStorage.getItem(lastVisitKey);
    console.log(storedDate);
    if (storedDate != null) {
      if (storedDate.localeCompare(new Date().toLocaleDateString()) == 0) {
        setState((prevState) => ({
          ...prevState,
          newDay: 0,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          newDay: 1,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        newDay: 1,
      }));
    }
  }, []);
  return (
    <>
      {state.newDay == 1 && <Reward />}
      {state.newDay == 0 && <DashboardRoot></DashboardRoot>}
    </>
  );
};
