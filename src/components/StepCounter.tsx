import React, { useState, useEffect } from 'react';
import { IonButton, IonText } from '@ionic/react';
import { Pedometer } from '@ionic-native/pedometer';
import { Device } from '@capacitor/device';

const StepCounter: React.FC = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);

  useEffect(() => {
    const checkPedometerAvailability = async () => {
      const info = await Device.getInfo();
      console.log('info : ', info);
      if (info.platform !== 'web') {
        Pedometer.isStepCountingAvailable()
          .then((available) => {
            setIsPedometerAvailable(available);
          })
          .catch((error) => {
            console.error('Pedometer not available:', error);
          });
      }
    };
    checkPedometerAvailability();
  }, []);

  const startStepCounting = () => {
    Pedometer.startPedometerUpdates()
      .subscribe((data) => {
        setStepCount(data.numberOfSteps);
      });
  };

  return (
    <>
      {isPedometerAvailable ? (
        <>
          <IonButton onClick={startStepCounting}>Démarrer le comptage des pas</IonButton>
          <IonText>
            <h2>Nombre de pas : {stepCount}</h2>
          </IonText>
        </>
      ) : (
        <IonText>
          <h2>Le pédomètre n'est pas disponible sur cet appareil.</h2>
        </IonText>
      )}
    </>
  );
};

export default StepCounter;
