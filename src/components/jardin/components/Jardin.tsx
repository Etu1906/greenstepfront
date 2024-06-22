import { ItemJardin } from "../types/JardinType";

interface JardinProps {
  myitems: ItemJardin[];
  new: ItemJardin;
}
export const Jardin: React.FC<JardinProps> = (props: JardinProps) => {
  return (
    <>
      <div className="jardin">
        {props.myitems.map((item, index) => (
          <img
            key={index}
            src={item.url}
            alt={`Item ${index}`}
            className="jardin-item"
            style={{
              marginLeft: `${item.x * 7}vw`,
              marginTop: `${item.y * 7}vw`,
            }}
          />
        ))}
        {props.new.url != "" && (
          <img
            key={`${new Date().toLocaleDateString()}`}
            src={props.new.url}
            style={{
              marginLeft: `${props.new.x * 7}vw`,
              marginTop: `${props.new.y * 7}vw`,
            }}
          ></img>
        )}
      </div>
    </>
  );
};
