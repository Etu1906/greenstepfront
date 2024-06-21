import { Device } from "@capacitor/device";
import { Pedometer } from "@ionic-native/pedometer";
import { useEffect, useState } from "react";
import { DashboardChart } from "./DashboardChart";
import { Progress } from "./Progress";
import { IonText } from "@ionic/react";

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
    });
  } else {
    return (
      <IonText>
        <h2>Le pédomètre n'est pas disponible sur cet appareil.</h2>
      </IonText>
    );
  }

  return (
    <>
      <div className="inner-dashboard">
        <Progress old_value={650} actual_value={stepCount} type={1}></Progress>
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
