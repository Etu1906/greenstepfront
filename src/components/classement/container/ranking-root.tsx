import { IonContent, IonMenuButton } from "@ionic/react";
import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import "../../../theme/variables.scss";
import { GradientCircularProgress } from "../../transport/components/AjoutMoyenTransport";
import RankingComponent from "../components/ranking-component";
import {
  internationalRanking,
  nationalRanking,
} from "../services/ranking.service";
import { Ranking } from "../types/ranking.type";
import "./ranking-root.scss";

interface RankingState {
  ranking: Ranking[];
  loading: boolean;
  type: string;
}

const initialState: RankingState = {
  ranking: [],
  loading: true,
  type: "0",
};

const RankingRoot = () => {
  const [state, setState] = useState<RankingState>(initialState);

  useEffect(() => {
    console.log("haha");

    setState((state) => ({
      ...state,
      loading: true,
    }));

    setTimeout(() => {
      let rank: Ranking[] = [];
      if (state.type == "0") {
        rank = internationalRanking;
      } else {
        rank = nationalRanking;
      }
      setState((state) => ({
        ...state,
        ranking: rank,
        loading: false,
      }));
    }, 500);
  }, [state.type]);

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setState((state) => ({
      ...state,
      type: newValue,
    }));
  };

  return (
    <div id="ranking-root">
      <div className="dashboard-head padding-head" style={{paddingLeft:"4vh", paddingRight: "4vh"}} >
        <IonMenuButton />
        <span style={{display:"flex" , alignItems:"center"}} ><img src="./R.jfif" height={50} alt="" />  Leaderboard</span>
        <div className="my-button">Lv10</div>
      </div>
      <Tabs
        value={state.type}
        onChange={handleTabChange}
        allowScrollButtonsMobile
        scrollButtons="auto"
        className="tabs"
      >
        <Tab className="tab-element" value="0" label="International" />
        <Tab className="tab-element" value="1" label="Mon pays" />
      </Tabs>
      {state.loading ? (
        <div className="loader-container" style={{ textAlign: "center" }}>
          <GradientCircularProgress />
        </div>
      ) : (
        <IonContent>
          <RankingComponent ranking={state.ranking} />
        </IonContent>
      )}
    </div>
  );
};

export default RankingRoot;
