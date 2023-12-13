import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DataProvider} from "./DataProvider";
import {RadarQuadrant, WriteLock} from "./d";
import * as domain from "domain";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const callbacks = {
  onMouseEnter: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    console.log("onMouseEnter", event);
  },
  onMouseLeave: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    console.log("onMouseLeave", event);
  },
  onClick: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    console.log("onClick", event);
  },
  onEditItem: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    console.log("onEditItem", event);
  },
  onEditQuadrant: (event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    console.log("onEditQuadrant", event);
    let lock: WriteLock<RadarQuadrant> = {
        id: "1",
        lock_expires: new Date().setMinutes(),
        items: [],
      },
    }

  },
}
root.render(
  <React.StrictMode>
    <App data={new DataProvider("./data.json").props} callbacks={callbacks}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
