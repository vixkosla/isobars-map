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
          "Имя точки": "#9738",
          "Давление в точке": "4.5",
          "Температура в точке": "-7.1",
          "Комментарий": "исследовательская"
        };
      })
    );

    // setData(fData)

    // d3.json("./data/xyf.json", d3.autoType).then(setData);
  }, []);

  useEffect(() => {
    if (data === undefined) return;

    console.log(data)

    const plot = Plot.plot({
      // grid: true,
      //   projection: "equal-earth",
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.85,
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
          blur: 5,
          stroke: "black",
          //   clip: "sphere",
        }),
        // Plot.text(data, {
        //   text: "F",
        //   fill: "F",
        //   x: "X",
        //   y: "Y",
        // }),
        Plot.dot(data, {
          x: "X",
          y: "Y",
          // f: "F",
          text: "Simple text",
          stroke: "F",
          fill: "white",
          channels: {
            "Имя точки": "Имя точки",
            "Давление в точке": "Давление в точке",
            "Температура в точке": "Температура в точке",
            "Комментарий": "Комментарий",
          },
          r: 2,
          tip: {
            format: {
              // x: "X",
              // y: "Y"
            }
          },
        }),
      ],
    });

    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} className="plot-container" />;
}
