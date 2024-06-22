import { useEffect, useState } from "react";
import { GradientCircularProgress } from "../../transport/components/AjoutMoyenTransport";
import { Actu } from "../types/ActusTypes";
import { SingleActus } from "./SingleActus";

interface ActusComponentsState {
  actus: Actu[];
  loading: boolean;
}
const initialState: ActusComponentsState = {
  actus: [],
  loading: true,
};
export const ActusComponents: React.FC = () => {
  const [state, setState] = useState<ActusComponentsState>(initialState);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=empreinte+carbone&sortBy=popularity&apiKey=3039446f25c14aa6b99d8043af4081d5"
    )
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          actus: data.articles,
          loading: false,
        }));
      });
      console.log(state.actus);
  }, []);

  return (
    <>
      {state.loading == true && (
        <div className="loader-container" style={{ textAlign: "center" }}>
          <GradientCircularProgress />
        </div>
      )}
      {state.loading == false && (
        <div className="actu-container">
          {state.actus.map((item, index) => (
            <SingleActus actu={item} key={index}/>
          ))}
        </div>
      )}
    </>
  );
};
