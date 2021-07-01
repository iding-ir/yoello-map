import { Map } from "mapbox-gl";

import * as iOptions from "../constants/iOptions";

export const fetchGeoJsons = (map: Map) => {
  return new Promise((resolve, reject) => {
    const promises: { [key: string]: Promise<void> } = {};
    const geoJsons: { [key: string]: string } = {};

    for (let key in iOptions.iGeoJsons) {
      const value = iOptions.iGeoJsons[key];

      promises[key] = new Promise<void>((resolve, reject) => {
        fetch(value)
          .then((response) => response.json())
          .then((json) => {
            geoJsons[key] = json;

            geoJsons[key] = json;

            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    Promise.all(Object.values(promises))
      .then(() => {
        resolve(geoJsons);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
};
