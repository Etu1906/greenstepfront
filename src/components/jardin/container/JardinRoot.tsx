import { IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { ItemStore } from "../components/ItemStore";
import { Jardin } from "../components/Jardin";
import { JardinHead } from "../components/JardinHead";
import { Item, ItemJardin } from "../types/JardinType";
import "./../style/jardin.css";

interface JardinState {
  items: Item[];
  itemjardin: ItemJardin[];
  selected: Item;
  new: ItemJardin;
  points: number;
}
const initialState: JardinState = {
  items: [],
  itemjardin: [],
  selected: {
    url: "",
    level: 0,
    price: 0,
  },
  new: {
    x: 0,
    y: 0,
    url: "",
  },
  points: 0
};
export const JardinRoot: React.FC = () => {
  const [state, setState] = useState<JardinState>(initialState);
  useEffect(() => {
    fetch("/items.json")
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          items: data,
          itemjardin: JSON.parse(localStorage.getItem("myitems") || ""),
          points: parseInt(localStorage.getItem("points")||"0")
        }));
      });
  }, []);
  const handleSelect = (item: Item) => {
    setState((prevState) => ({
      ...prevState,
      selected: item,
      new: {
        x: 0,
        y: 0,
        url: item.url,
      },
    }));
    console.log("here gain");
  };
  const handleSubmit = () => {
    const updatedItems = [...state.itemjardin, state.new];
    localStorage.setItem("myitems", JSON.stringify(updatedItems));
    const points = state.points - state.selected.price;
    localStorage.setItem("points",points.toString());
    setState((prevState) => ({
      ...prevState,
      new: initialState.new,
      selected: initialState.selected,
      itemjardin: [...prevState.itemjardin, state.new],
      points: points
    }));
  };
  const handleMoveNew = (move: string) => {
    setState((prevState) => {
      let newX = prevState.new.x;
      let newY = prevState.new.y;

      switch (move) {
        case "down":
          newY = Math.min(newY + 1, 9);
          break;
        case "up":
          newY = Math.max(newY - 1, 0);
          break;
        case "left":
          newX = Math.max(newX - 1, 0);
          break;
        case "right":
          newX = Math.min(newX + 1, 11);
          break;
        default:
          // Handle default case or throw error if needed
          break;
      }

      return {
        ...prevState,
        new: {
          ...prevState.new,
          x: newX,
          y: newY,
        },
      };
    });
  };

  return (
    <>
      <IonContent>
        <div className="jardin-root">
          <JardinHead />
          <Jardin myitems={state.itemjardin} new={state.new} />
          <ItemStore
            items={state.items}
            points={state.points}
            level={10}
            itemJardin={state.itemjardin}
            selected={state.selected}
            handleSelect={handleSelect} handleSubmit={handleSubmit} handleMoveNew={handleMoveNew}
          ></ItemStore>
        </div>
      </IonContent>
    </>
  );
};
