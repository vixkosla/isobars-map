import logo from "./logo.svg";
import "./App.css";

import Mapbox from "./Map.js";
import PlotMap from "./Plot.js"
import prepareData from "./prepareData.js";

const data = prepareData();

function App() {
  return (
    <div className="App">
      <PlotMap/>
      {/* <Mapbox dataSource={data} /> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
