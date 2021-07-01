import { Map } from "mapbox-gl";

import * as iOptions from "../constants/iOptions";

export const loadIcons = (map: Map) => {
  return new Promise<void>((resolve, reject) => {
    const promises: { [key: string]: Promise<void> } = {};

    for (let key in iOptions.iIcons) {
      const value = iOptions.iIcons[key];

      promises[key] = new Promise<void>((resolve, reject) => {
        map.loadImage(value, (error, image: any) => {
          if (error) {
            reject(error);
          } else {
            map.addImage(key, image);

            resolve();
          }
        });
      });
    }

    Promise.all(Object.values(promises))
      .then(() => {
        resolve();
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
};
