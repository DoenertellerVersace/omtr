import {JSX} from "react";

function Circle(props: { color: string }): JSX.Element {
  return (
      <div className={"circle-canvas"} color={props.color}>
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill={props.color}/>
        </svg>
      </div>
  );
}

export default Circle;