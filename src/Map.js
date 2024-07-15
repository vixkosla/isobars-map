import React, { useRef, useEffect, useState } from "react";

import "./Map.css";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

export default function Mapbox({ dataSource }) {
  console.log("Here is your props, man", dataSource);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiaG9va2FobG9jYXRvciIsImEiOiI5WnJEQTBBIn0.DrAlI7fhFaYr2RcrWWocgw";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("points", {
        type: "geojson",
        data: dataSource,
      });

//       map.current.addLayer({
//         id: "points-layer",
//         type: "circle",
//         source: "points",
//         paint: {
//           "circle-radius": 3,
//           "circle-color": "red",
//         },
//       });

      map.current.addLayer({
        id: "multiPolyLayer",
        type: "line",
        source: "points",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });

      map.current.addLayer({
        'id': 'multiPolyLayer-fill',
        'type': 'fill',
        'source': 'points',
        'layout': {},
        'paint': {
            'fill-color': '#12eccc',  // change this to the color you want
            'fill-opacity': 0.5  // change this to the opacity you want
        }
    });
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
