import { DashboardChart } from "./DashboardChart";
import { Progress } from "./Progress";

export const DashboardComponent: React.FC = () => {
  return (
    <>
      <div className="inner-dashboard">
        <Progress old_value={34} actual_value={90} type={1}></Progress>
        <Progress old_value={20} actual_value={25} type={2}></Progress>
        <DashboardChart
          type={"week"}
          greendata={[1, 2, 3, 4, 5, 6, 7]}
          reddata={[7, 6, 5, 4, 3, 2, 1]}
        />
        <DashboardChart
          type={"month"}
          greendata={[1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 12]}
          reddata={[7, 6, 5, 4, 3, 2, 1, 2, 1, 2, 1, 2]}
        />
      </div>
    </>
  );
};
