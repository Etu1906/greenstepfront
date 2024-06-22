import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Ranking } from "../types/ranking.type";
import "./ranking-component.scss";

interface RankingProps {
  ranking: Ranking[];
}

const RankingComponent = (props: RankingProps) => {
  return (
    <div id="ranking-component">
      <div className="rankings">
        {props.ranking.map((r: Ranking, i: number) => (
          <div key={r.pseudo}>
            <IonGrid className={`rank-element ${i + 1 <= 3 && "colored"}`}>
              <IonRow>
                <IonCol className="rank-numero">
                  <h2>{i + 1}</h2>
                </IonCol>
                <IonCol className="rank-flag">
                  <img
                    src={`https://flagsapi.com/${r.codeCountry}/shiny/64.png`}
                  />
                </IonCol>
                <IonCol className="rank-pseudo">
                <p style={{ display:"flex", alignItems:"center" }} >
                  {r.pseudo}
                  {i === 0 && (
                    <img
                      src="./medaille.png" 
                      alt="Special icon"
                      style={{ marginLeft: '10px', height: '35px' }} // Ajoutez vos styles ici
                    />
                  )}
                </p>
                </IonCol>
                <IonCol>
                  <div className="rank-pts">
                    <p>
                      <span className="green circle"></span>
                      <span>{r.greenPoints}</span>
                    </p>
                    <p>
                      <span className="red circle"></span>
                      <span>{r.redPoints}</span>
                    </p>
                    {/* <p>
                      <span > <img src="./chaussure.jfif" /> </span>
                      <span>{r.greenPoints}</span>
                    </p>
                    <p>
                      <span ><img src="./fumee.avif" /></span>
                      <span>{r.redPoints}</span>
                    </p> */}
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingComponent;
