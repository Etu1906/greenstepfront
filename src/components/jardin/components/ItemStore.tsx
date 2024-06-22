import { IonToast } from "@ionic/react";
import { useState } from "react";
import { Item, ItemJardin } from "../types/JardinType";

interface StoreProps {
  items: Item[];
  points: number;
  level: number;
  itemJardin: ItemJardin[];
  selected: Item;
  handleSelect: (item: Item) => void;
  handleSubmit: () => void;
  handleMoveNew: (move: string) => void;
}
interface StoreState {
  showToast: boolean;
  message: string;
  status: number;
}
const initialState: StoreState = {
  showToast: false,
  message: "",
  status: 0,
};
export const ItemStore: React.FC<StoreProps> = (props: StoreProps) => {
  const [state, setState] = useState<StoreState>(initialState);
  const handleSelectItem = (item: Item) => {
    if (props.level >= item.level) {
      if (props.points >= item.price) {
        props.handleSelect(item);
        setState((prevState) => ({
          ...prevState,
          status: 1,
        }));
        console.log(props.selected.url);
      } else {
        setState((prevState) => ({
          ...prevState,
          showToast: true,
          message: `Il vous manque ${item.price - props.points} points`,
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        showToast: true,
        message: `Level ${item.level} requis`,
      }));
    }
  };
  const handleButtonClick = (move: string) => {
    props.handleMoveNew(move);
  };
  const handleSubmit = () => {
    props.handleSubmit();
    setState((prevState) => ({ ...prevState, status: 0 }));
  };

  return (
    <>
      <div className="store">
        <div className="store-details">
          <div className="title-store">Achetez des items</div>
          <div className="points-store">{props.points}p</div>
        </div>
        {state.status == 0 && (
          <div className="store-main">
            {props.items.map((item, index) => (
              <div
                key={`${index}-container`}
                className="itemstore"
                onClick={() => handleSelectItem(item)}
                // style={{
                //   border:
                //     item.url.localeCompare(props.selected.url) == 0
                //       ? "2px solid white"
                //       : "none",
                // }}
              >
                <img
                  key={index}
                  src={item.url}
                  alt={`Item ${index}`}
                  className="store-item"
                  style={{
                    filter:
                      item.level > props.level ? "grayscale(100%)" : "none",
                  }}
                />
                <div
                  className={item.level < props.level ? "price" : "level-store"}
                >
                  {item.level < props.level
                    ? `${item.price}p`
                    : `Lv${item.level}`}
                </div>
              </div>
            ))}
          </div>
        )}
        {state.status == 1 && (
          <div className="store-buy">
            <div className="left-store">
              <img src={props.selected.url} alt="" />
            </div>
            <div className="right-store">
              <div className="button-container">
                <div className="row-top">
                  <button
                    className="button-store top"
                    onClick={() => handleButtonClick("up")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    >
                      <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM7.994 9.422 10 6.938l2.01 2.484 2.008 2.484h-8.03z" />
                    </svg>
                  </button>
                </div>
                <div className="row-middle">
                  <button
                    className="button-store left"
                    onClick={() => handleButtonClick("left")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 100 125"
                      width="25"
                      height="25"
                    >
                      <path d="M50,2A48,48,0,1,0,98,50,48,48,0,0,0,50,2ZM67.17,70.84a2,2,0,0,1-3,1.74L27.7,51.74a2,2,0,0,1,0-3.48L64.17,27.42a2,2,0,0,1,3,1.74Z" />
                    </svg>
                  </button>
                  <button
                    className="button-store submit-store"
                    onClick={handleSubmit}
                  >
                    OK
                  </button>
                  <button
                    className="button-store right"
                    onClick={() => handleButtonClick("right")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 100 125"
                      width="25"
                      height="25"
                    >
                      <path d="M50,0h0A50,50,0,0,0,0,50H0a50,50,0,0,0,50,50h0a50,50,0,0,0,50-50h0A50,50,0,0,0,50,0ZM67.94,51,33.41,74.79a1.18,1.18,0,0,1-.67.21,1.25,1.25,0,0,1-.56-.14,1.18,1.18,0,0,1-.63-1V26.19a1.19,1.19,0,0,1,1.86-1L67.94,49a1.2,1.2,0,0,1,0,2Z" />
                    </svg>
                  </button>
                </div>
                <div className="row-last">
                  <button
                    className="button-store bottom"
                    onClick={() => handleButtonClick("down")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                    >
                      <path d="M0 10A10 10 0 1 0 10 0 10 10 0 0 0 0 10zm14.021-1.943-2.008 2.484L10 13.024l-2.01-2.483-2-2.484h8.033z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <IonToast
          isOpen={state.showToast}
          message={state.message}
          onDidDismiss={() =>
            setState((prevState) => ({ ...prevState, showToast: false }))
          }
          duration={2000}
        ></IonToast>
      </div>
    </>
  );
};
