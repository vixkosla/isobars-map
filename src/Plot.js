import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import "./Plot.css";

import myJson from "./data/xyf.json";

export default function PlotMap() {
  const containerRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    setData(
      myJson.map((d) => {
        return {
          X: +d.X,
          Y: +d.Y,
          F: +d.F,
        };
      })
    );

    // setData(fData)

    // d3.json("./data/xyf.json", d3.autoType).then(setData);
  }, []);

  useEffect(() => {
    if (data === undefined) return;

    // console.log(fData)

    const plot = Plot.plot({
      // grid: true,
      //   projection: "equal-earth",
      color: {
        scheme: "Viridis",
        legend: true,
        label: "F (who knows)",
        // type: "diverging"
      },
      marks: [
        Plot.contour(data, {
          x: "X",
          y: "Y",
          fill: "F",
          blur: 3,
          stroke: "black",
          //   clip: "sphere",
        }),
        // Plot.text(data, {
        //   text: "F",
        //   fill: "F",
        //   x: "X",
        //   y: "Y",
        // }),
        Plot.dot(data, ({
          x: "X",
          y: "Y",
          // f: "F",
          text: "Simple text",
          stroke: "F",
          fill: "white",
          r: 2,
          tip: "xy",
        })),
      ],
    });

    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} className="plot-container" />;
}
