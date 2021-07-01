import { Map, MapMouseEvent } from "mapbox-gl";

import * as iOptions from "../constants/iOptions";

export const prepareSource = (map: Map, suffix: string) => {
  const prefix = iOptions.iSourcePrefix;
  const source = prefix + suffix;

  if (map.getSource(source)) map.removeSource(source);

  return source;
};

export const prepareLayers = (map: Map, suffix: string) => {
  const prefixes: any = iOptions.iLayersPrefixes;
  const layers: { [key: string]: any } = {};

  for (let featureKey in prefixes) {
    const featureValue: any = prefixes[featureKey];

    layers[featureKey] = {};

    for (const typeKey in featureValue) {
      const layer = featureValue[typeKey] + suffix;

      layers[featureKey][typeKey] = layer;

      if (map.getLayer(layer)) map.removeLayer(layer);
    }
  }

  return layers;
};

export const makeLayerInteractive = (map: Map, layer: any) => {
  map.on("mousemove", layer, (event: MapMouseEvent) => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", layer, (event: MapMouseEvent) => {
    map.getCanvas().style.cursor = "grab";
  });
};

export const renderGeoJsons = (map: Map, geoJsons: any) => {
  return new Promise((resolve, reject) => {
    for (let key in iOptions.iGeoJsons) {
      const value = iOptions.iGeoJsons[key];

      const source = prepareSource(map, key);
      const layers = prepareLayers(map, key);

      const primaryColor =
        iOptions.iFeatureColors[iOptions.iDefaultStyle].primary;
      const secondaryColor =
        iOptions.iFeatureColors[iOptions.iDefaultStyle].secondary;

      map.addSource(source, {
        type: "geojson",
        data: value,
      });

      if (iOptions.iLayers.polygon.fill) {
        map.addLayer({
          id: layers.polygon.fill,
          type: "fill",
          minzoom: 1,
          source: source,
          filter: [
            "any",
            ["==", ["geometry-type"], "Polygon"],
            ["==", ["geometry-type"], "MultiPolygon"],
          ],
          paint: {
            "fill-color": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              1,
              primaryColor,
              12,
              primaryColor,
            ],
            "fill-opacity": [
              "interpolate",
              ["exponential", 0.8],
              ["zoom"],
              0,
              0.5,
              12,
              0.4,
            ],
          },
        });
      }

      makeLayerInteractive(map, layers.polygon.fill);

      if (iOptions.iLayers.polygon.line) {
        map.addLayer({
          id: layers.polygon.line,
          type: "line",
          minzoom: 1,
          source: source,
          filter: [
            "any",
            ["==", ["geometry-type"], "Polygon"],
            ["==", ["geometry-type"], "MultiPolygon"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-width": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              0,
              0,
              12,
              4,
            ],
            "line-color": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              1,
              secondaryColor,
              12,
              secondaryColor,
            ],
            "line-opacity": [
              "interpolate",
              ["exponential", 0.8],
              ["zoom"],
              0,
              0.5,
              12,
              1,
            ],
          },
        });
      }

      makeLayerInteractive(map, layers.polygon.line);

      if (iOptions.iLayers.polyline.line) {
        map.addLayer({
          id: layers.polyline.line,
          type: "line",
          minzoom: 1,
          source: source,
          filter: [
            "any",
            ["==", ["geometry-type"], "LineString"],
            ["==", ["geometry-type"], "MultiLineString"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-width": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              0,
              1,
              12,
              6,
            ],
            "line-color": [
              "interpolate",
              ["exponential", 1],
              ["zoom"],
              1,
              secondaryColor,
              12,
              secondaryColor,
            ],
            "line-opacity": [
              "interpolate",
              ["exponential", 0.8],
              ["zoom"],
              0,
              0.5,
              12,
              1,
            ],
            "line-dasharray": [4, 4],
          },
        });
      }

      makeLayerInteractive(map, layers.polyline.line);

      if (iOptions.iLayers.polyline.symbol) {
        map.addLayer({
          id: layers.polyline.symbol,
          type: "symbol",
          minzoom: 1,
          source: source,
          filter: [
            "any",
            ["==", ["geometry-type"], "LineString"],
            ["==", ["geometry-type"], "MultiLineString"],
          ],
          layout: {
            "icon-image": iOptions.iDefaultIcon,
            "icon-size": 1,
            "icon-anchor": "center",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
          paint: {
            "icon-opacity": [
              "interpolate",
              ["exponential", 0.8],
              ["zoom"],
              0,
              0.5,
              4,
              1,
            ],
          },
        });
      }

      makeLayerInteractive(map, layers.polyline.symbol);

      if (iOptions.iLayers.point.symbol) {
        map.addLayer({
          id: layers.point.symbol,
          type: "symbol",
          minzoom: 1,
          source: source,
          filter: [
            "any",
            ["==", ["geometry-type"], "Point"],
            ["==", ["geometry-type"], "MultiPoint"],
          ],
          layout: {
            "icon-image": [
              "case",
              ["has", "icon"],
              ["get", "icon"],
              ["has", "type"],
              ["get", "type"],
              iOptions.iDefaultIcon,
            ],
            "icon-size": 1,
            "icon-anchor": "center",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
          },
          paint: {
            "icon-opacity": [
              "interpolate",
              ["exponential", 0.8],
              ["zoom"],
              0,
              0.5,
              4,
              1,
            ],
          },
        });
      }

      makeLayerInteractive(map, layers.point.symbol);
    }

    resolve(true);
  });
};
