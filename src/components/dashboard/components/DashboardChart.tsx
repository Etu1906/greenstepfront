import { BarChart } from "@mui/x-charts/BarChart";
import { useState } from "react";

interface DashboardChartProps {
  type: string;
  greendata: number[];
  reddata: number[];
}
const initialState: DashboardChartProps = {
  type: "month",
  greendata: [],
  reddata: [],
};
export const DashboardChart: React.FC<DashboardChartProps> = (props) => {
  const [state, setState] = useState<DashboardChartProps>(initialState);

  var labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  if (props.type == "month") {
    labels = [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Aoû",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];
  }
  return (
    <>
      <div className="dashboard-week">
      {props.type=="week" && <span className="my-title">Cette semaine</span>}
      {props.type=="month" && <span className="my-title">Ce mois</span>}

          

        <div className="legends">
          <div className="legend">
            <div className="color" id="legend-pas-color"></div>
            <div className="legend-label">Pas</div>
          </div>
          <div className="legend">
            <div className="color" id="legend-carbone-color"></div>
            <div className="legend-label">Emp. Carb.</div>
          </div>
        </div>
        <div className="dashboard-chart">
          <BarChart
            borderRadius={20}
            series={[
              {
                data: props.greendata,
                label: "pas",
                id: "pas",
                color: "#588157",
              },
              {
                data: props.reddata,
                label: "empreinte carbone",
                id: "carbone",
                color: "#faa5a5",
              },
            ]}
            xAxis={[{ data: labels, scaleType: "band" }]}
          />
        </div>
      </div>
  
    </>
  );
};
