import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import {
  carOutline,
  cloud,
  homeOutline,
  mailOutline,
  mapOutline,
  medalOutline,
  medalSharp,
  roseOutline,
} from "ionicons/icons";
import { useLocation } from "react-router-dom";
import "./Menu.css";
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    iosIcon: homeOutline,
    mdIcon: homeOutline,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    iosIcon: medalOutline,
    mdIcon: medalSharp,
  },

  {
    title: "Moyens de transport",
    url: "/moyen-transport",
    iosIcon: carOutline,
    mdIcon: carOutline,
  },
  {
    title: "Trajet",
    url: "/map",
    iosIcon: mapOutline,
    mdIcon: mapOutline,
  },
  {
    title: "Jardin",
    url: "/jardin",
    iosIcon: roseOutline,
    mdIcon: roseOutline,
  },
  {
    title: "Actualités",
    url: "/actus",
    iosIcon: mailOutline,
    mdIcon: mailOutline,
  },
  {
    title: "Qualité de l'air",
    url: "/qualite",
    iosIcon: cloud,
    mdIcon: cloud,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            <img src="logo.png" alt="" />
          </IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
