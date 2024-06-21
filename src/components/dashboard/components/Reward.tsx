import { useIonRouter } from "@ionic/react";
import { useState } from "react";

interface RewardState {
  levelup: number;
  level: number;
  earnpoints: number;
  points: number;
  tab: number;
  old_pas: number;
  new_pas: number;
}
const initialState: RewardState = {
  levelup: 1,
  level: 10,
  earnpoints: 1,
  points: 342,
  tab: 0,
  old_pas: 532,
  new_pas: 650,
};
export const Reward: React.FC = () => {
  const [state, setState] = useState<RewardState>(initialState);
  const lastVisitKey = "lastVisit";
  const navigation = useIonRouter();

  // TODO: uncomment
  // localStorage.setItem(lastVisitKey, new Date().toLocaleDateString());

  // useEffect(() => {
  //   var oldpas = parseInt(localStorage.getItem("old_pas") || "0");
  //   var pas = parseInt(localStorage.getItem("pas") || "0");
  //   localStorage.setItem("old_pas", pas.toString() || "0");
  //   if (oldpas < pas) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       points: oldpas-pas,
  //       earnpoints: 1
  //     }));
  //     var newpoints = parseInt(localStorage.getItem("points")||"0")+oldpas-pas;
  //     localStorage.setItem("points",newpoints.toString());
  //   }
  // }, []);
  const handleClick = () => {
    setState((prevState) => ({
      ...prevState,
      tab: prevState.tab + 1,
    }));
    console.log(state.tab);

    if (state.tab+1 == 2) {
      navigation.push("/dashboard");
    }
  };
  return (
    <>
      <div className="rewards-level-up" onClick={handleClick}>
        <img src="reward.gif" alt="" className="reward-gif" />
        {state.tab == 0 && (
          <span className="sentence-rewards">
            {" "}
            Bravo, grâce à la diminution de votre empreinte carbone de 10% vous
            êtes maintenant au level {state.level}.
            <br />
            Touchez pour continuer...
          </span>
        )}
        {state.tab == 1 && (
          <span className="sentence-rewards">
            {" "}
            Bravo, vous avez fait {state.new_pas - state.old_pas} pas en plus.
            Vous recevez donc {state.new_pas - state.old_pas} points!!
            <br />
            Touchez pour continuer...
          </span>
        )}
      </div>
    </>
  );
};
