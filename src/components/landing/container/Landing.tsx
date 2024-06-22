import { useEffect, useState } from "react";
import { Reward } from "../../dashboard/components/Reward";
import { DashboardRoot } from "../../dashboard/container/DashboardRoot";
import { ItemJardin } from "../../jardin/types/JardinType";

interface LandingState {
  newDay: number;
}
const initialState: LandingState = {
  newDay: -1,
};
export const Landing: React.FC = () => {
  const [state, setState] = useState<LandingState>(initialState);
  useEffect(() => {
    // TODO: comment this
    // localStorage.setItem("pas", "80");
    // localStorage.setItem("old_pas", "90");
    // localStorage.setItem("points", "1000");
    // localStorage.setItem("level", "0");
    localStorage.setItem("carbone", "0");
    // localStorage.setItem("old_carbone", "5");
    const myitems: ItemJardin[] = [
      {
        x: 0,
        y: 1,
        url: "a1.png",
      },
      {
        x: 0,
        y: 6,
        url: "a2.png",
      },
      {
        x: 1,
        y: 0,
        url: "a1.png",
      },
      {
        x: 11,
        y: 9,
        url: "a3.png",
      },
      {
        x: 0,
        y: 9,
        url: "a3.png",
      },
      {
        x: 11,
        y: 6,
        url: "a5.png",
      },
      {
        x: 11,
        y: 2,
        url: "a5.png",
      },
      {
        x: 11,
        y: 4,
        url: "a5.png",
      },
      {
        x: 5,
        y: 5,
        url: "fountain2.png",
      },
      {
        x: 7,
        y: 7,
        url: "a8.png",
      },
      {
        x: 6,
        y: 7,
        url: "a8.png",
      },
      {
        x: 2,
        y: 7,
        url: "a8.png",
      },
      {
        x: 3,
        y: 4,
        url: "a8.png",
      },
      {
        x: 9,
        y: 0,
        url: "a6.png",
      },
      {
        x: 10,
        y: 0,
        url: "a6.png",
      },
      {
        x: 11,
        y: 0,
        url: "a8.png",
      },
      {
        x: 5,
        y: 7,
        url: "a8.png",
      },
      {
        x:11,
        y:3,
        url:"lake1.png"
      }
    ];
    localStorage.setItem("myitems", JSON.stringify(myitems));
    const lastVisitKey = "lastVisit";
    const storedDate = localStorage.getItem(lastVisitKey);
    console.log(storedDate);
    if (storedDate != null) {
      if (storedDate.localeCompare(new Date().toLocaleDateString()) == 0) {
        setState((prevState) => ({
          ...prevState,
          newDay: 0,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          newDay: 1,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        newDay: 1,
      }));
    }
  }, []);
  return (
    <>
      {state.newDay == 1 && <Reward />}
      {state.newDay == 0 && <DashboardRoot></DashboardRoot>}
    </>
  );
};
