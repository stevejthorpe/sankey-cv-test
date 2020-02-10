import React from "react";
import { render } from "react-dom";

import Example from "./Example";
import CircularExample from "./CircularExample";

import energyData from "./data/energy";
import circularData from "./data/circular";
import cvData from "./data/cv";

const App = () => (
  <div>
    <h2>Example</h2>
    <Example data={cvData} width={960} height={500} />
    <Example data={energyData} width={960} height={500} />

    <h2>Circular Example</h2>
    <CircularExample data={circularData} width={960} height={500} />
  </div>
);

render(<App />, document.getElementById("root"));
