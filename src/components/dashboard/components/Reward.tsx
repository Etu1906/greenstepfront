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
          <div className="sentence-rewards pulsate">
            {" "}
            <div className="">
              Bravo, grâce à la diminution de votre empreinte carbone de 10% vous
              êtes maintenant au <div className="points__rewards">level {state.level} </div>
              <br />
              Touchez pour continuer...
            </div>
          </div>
        )}
        {state.tab == 1 && (
          <div className="sentence-rewards">
            {" "}
            <div className="">
              vous avez fait plus de 200 pas hier.
              <div className="bonus__rewards" >Bonus :  <div className="points__rewards">{state.new_pas - state.old_pas}</div> points!!</div>
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
