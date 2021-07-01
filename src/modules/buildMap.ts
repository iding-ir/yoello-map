import mapboxgl, { Map } from "mapbox-gl";

import * as iOptions from "../constants/iOptions";

export const buildMap = (map: Map) => {
  if (iOptions.iControls.fullscreen) {
    const fullscreenControl = new mapboxgl.FullscreenControl({});

    map.addControl(fullscreenControl, "top-right");
  }

  if (iOptions.iControls.geolocation) {
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: false,
    });

    map.addControl(geolocateControl, "bottom-right");
  }

  if (iOptions.iControls.navigation) {
    const navigationControl = new mapboxgl.NavigationControl({});

    map.addControl(navigationControl, "top-right");
  }

  return new Promise<void>((resolve, reject) => {
    map.on("style.load", () => {
      if (map.getLayer("background")) {
        map.setPaintProperty(
          "background",
          "background-color",
          iOptions.iMapColors[iOptions.iDefaultStyle].background
        );
      }

      if (map.getLayer("country-fills")) {
        map.setPaintProperty(
          "country-fills",
          "fill-color",
          iOptions.iMapColors[iOptions.iDefaultStyle].fill
        );
      }

      if (map.getLayer("country-lines")) {
        map.setPaintProperty(
          "country-lines",
          "line-color",
          iOptions.iMapColors[iOptions.iDefaultStyle].line
        );
      }

      if (map.getLayer("country-symbols")) {
        map.setPaintProperty(
          "country-symbols",
          "text-color",
          iOptions.iMapColors[iOptions.iDefaultStyle].text
        );
      }
    });

    map.on("load", () => {
      resolve();
    });
  });
};
