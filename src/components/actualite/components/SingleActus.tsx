import React from "react";
import { Actu } from "../types/ActusTypes";
interface SingleActusProps {
  actu: Actu;
}
export const SingleActus: React.FC<SingleActusProps> = (
  props: SingleActusProps
) => {
  return (
    <>
      <div className="single-actu">
        <div
          className="image-container"
          style={{ backgroundImage: `url('${props.actu.urlToImage}')` }}
        ></div>
        <div className="infos">
          <div className="title">{props.actu.title}</div>
        </div>
      </div>
    </>
  );
};
