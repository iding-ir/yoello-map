import { useState, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import { loadIcons } from "../modules/loadIcons";
import { buildMap } from "../modules/buildMap";
import { fetchGeoJsons } from "../modules/fetchGeoJsons";
import { renderGeoJsons } from "../modules/renderGeoJsons";
import * as iOptions from "../constants/iOptions";

export const useMap = () => {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

    const map: Map = new Map({
      container: iOptions.iMap.container,
      center: iOptions.iMap.center,
      zoom: iOptions.iMap.zoom,
      minZoom: iOptions.iMap.minZoom,
      maxZoom: iOptions.iMap.maxZoom,
      pitch: iOptions.iMap.pitch,
      bearing: iOptions.iMap.bearing,
      hash: iOptions.iMap.hash,
      style: iOptions.iStyles[iOptions.iDefaultStyle],
    });

    buildMap(map).then(() => {
      loadIcons(map).then(() => {
        fetchGeoJsons(map).then((geoJsons) => {
          renderGeoJsons(map, geoJsons).then(() => {
            setMap(map);
          });
        });
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { map };
};
