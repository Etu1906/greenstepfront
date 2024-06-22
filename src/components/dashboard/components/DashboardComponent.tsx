import { Device } from "@capacitor/device";
import { Pedometer } from "@ionic-native/pedometer";
import { useEffect, useState } from "react";
import { DashboardChart } from "./DashboardChart";
import { Progress } from "./Progress";

export const DashboardComponent: React.FC = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  useEffect(() => {
    const checkPedometerAvailability = async () => {
      const info = await Device.getInfo();
      console.log("info : ", info);
      if (info.platform !== "web") {
        Pedometer.isStepCountingAvailable()
          .then((available) => {
            setIsPedometerAvailable(available);
          })
          .catch((error) => {
            console.error("Pedometer not available:", error);
          });
      }
    };
    checkPedometerAvailability();
  }, []);
  if (isPedometerAvailable) {
    Pedometer.startPedometerUpdates().subscribe((data) => {
      setStepCount(data.numberOfSteps);
      localStorage.setItem("pas", stepCount.toString());
    });
  }

  // } else {
  //   return (
  //     <IonText>
  //       <h2>Le pédomètre n'est pas disponible sur cet appareil.</h2>
  //     </IonText>
  //   );
  // }

  return (
    <>
      <div className="inner-dashboard">
        <Progress old_value={650} actual_value={stepCount} type={1}></Progress>
        <Progress
          old_value={20}
          actual_value={parseInt(localStorage.getItem("carbone") || "0")}
          type={2}
        ></Progress>
        <DashboardChart
          type={"week"}
          greendata={[1, 2, 3, 4, 5, 0, 0]}
          reddata={[7, 6, 5, 4, 3, 0, 0]}
        />
        <DashboardChart
          type={"month"}
          greendata={[1, 8, 4, 4.5, 5.8, 6, 0, 0, 0, 0, 0, 0]}
          reddata={[7, 6, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0]}
        />
      </div>
    </>
  );
};
