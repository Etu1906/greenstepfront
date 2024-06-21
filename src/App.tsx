import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./app.scss";
import Menu from "./components/Menu";
import { DashboardRoot } from "./components/dashboard/container/DashboardRoot";
import AjoutMoyenTransportRoot from "./components/transport/container/ajout-moyen-transport-root";
import Page from "./pages/Page";
import "./theme/variables.css";
import MapRoot from "./components/map/Map-root";

setupIonicReact();

const App: React.FC = () => {
  const lastVisitKey = "lastVisit";
  const storedDate = localStorage.getItem(lastVisitKey);
  var newDay = false;
  if (storedDate !== null) {
    if (storedDate.localeCompare(new Date().toLocaleDateString()) == 0) {
      newDay = false;
    } else {
      newDay = true;
      localStorage.setItem(lastVisitKey, new Date().toLocaleDateString());
    }
  } else {
    newDay = true;
    localStorage.setItem(lastVisitKey, new Date().toLocaleDateString());
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/moyen-transport">
              <AjoutMoyenTransportRoot />
            </Route>
            <Route exact path="/">
              <DashboardRoot newDay={newDay} />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/map" >
              <MapRoot />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
