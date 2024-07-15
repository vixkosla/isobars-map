import myJson from "./data/xyf.json";
import {
  featureEach,
  interpolate,
  isolines,
  randomPoint,
  point,
  pointGrid,
  featureCollection,
} from "@turf/turf";

function normalizeData(array) {
  let x = array.map((i) => i.X);
  let y = array.map((i) => i.Y);

  x = normalize(x);
  y = normalize(y);

  //   console.log(x, y);

  const normalized = myJson.map((i, j) => {
    const lati = x[j] * 360;
    const long = y[j] * 360;

    return {
      X: +lati.toFixed(5),
      //   X: -70.9,
      //   Y: 42.35,

      Y: +long.toFixed(5),
      F: i.F,
    };
  });

  return normalized;
}

function normalize(array) {
  //   console.log(array);

  const max = Math.max(...array);
  const min = Math.min(...array);

  //   console.log(max, min);

  const arr = array.map((value) => {
    return (value - min) / (max - min);
  });

  return arr;
}

export default function prepareData() {
  console.log("Hello world");

  //   console.log(myJson);

  //   const randomPoint = point([34.2, 32.4])

  //   const points = turf.randomPoint(25, { bbox: [-180, -90, 180, 90] });

  //   points.features.forEach(feature => )

  const data = normalizeData(myJson).map((item) => {
    return point([item.X, item.Y], { fff: item.F });
  });

  console.log(data);

  const extent = [0, 30, 20, 50];
  const cellWidth = 100;
  const grid = pointGrid(extent, cellWidth, { units: "miles" });
//   console.log(points);

  //   const options = { gridType: "points", property: "fff" , units: "miles"};
  let options = { gridType: "points", property: "solRad", units: "miles" };

  //   const result = featureCollection(data);

  featureEach(grid, function (point) {
    point.properties.solRad = Math.random() * 50;
  });

//   const grid = interpolate(points, 100, options);

  //   console.log(grid);

  const breaks = [9, 20, 30, 40, 10, 5];

  const resultGrid = isolines(grid, breaks, { zProperty: "solRad" });

  console.log(resultGrid);

  return resultGrid;
}
