import { IMap } from "../types/IOptions";
import { IStyles } from "../types/IOptions";
import { IDefaultStyle } from "../types/IOptions";
import { IControls } from "../types/IOptions";
import { IFeatureColors } from "../types/IOptions";
import { IMapColors } from "../types/IOptions";
import { IIcons } from "../types/IOptions";
import { IDefaultIcon } from "../types/IOptions";
import { IGeoJson } from "../types/IOptions";
import { ILayers } from "../types/IOptions";
import { ISourcePrefix } from "../types/IOptions";
import { ILayersPrefixes } from "../types/IOptions";

export const iMap: IMap = {
  container: "map",
  center: [-3.2, 51.5],
  zoom: 10,
  minZoom: 2,
  maxZoom: 20,
  pitch: 0,
  bearing: 0,
  hash: false,
};

export const iStyles1: IStyles = {
  light: "/map/jsons/styles/light/style.json",
  dark: "/map/jsons/styles/dark/style.json",
};

export const iStyles2: IStyles = {
  light: "mapbox://styles/mapbox/light-v10",
  dark: "mapbox://styles/mapbox/dark-v10",
};

export const iStyles: IStyles = iStyles1;

export const iDefaultStyle: IDefaultStyle = "light";

export const iControls: IControls = {
  fullscreen: false,
  geolocation: true,
  navigation: true,
};

export const iFeatureColors: IFeatureColors = {
  light: {
    primary: "#1976D2",
    secondary: "#8BC34A",
  },
  dark: {
    primary: "#455A64",
    secondary: "#FFA000",
  },
};

export const iMapColors: IMapColors = {
  light: {
    background: "#0D47A1",
    fill: "#EFEBE9",
    line: "#3E2723",
    text: "#3E2723",
  },
  dark: {
    background: "#101518",
    fill: "#263238",
    line: "#E1F5FE",
    text: "#E1F5FE",
  },
};

export const iIcons: IIcons = {
  default: "/map/images/icon-default.png",
  restaurant: "/assets/images/icon-restaurant.png",
  hotel: "/assets/images/icon-hotel.png",
  pub: "/assets/images/icon-pub.png",
  bar: "/assets/images/icon-bar.png",
  cafe: "/assets/images/icon-cafe.png",
};

export const iDefaultIcon: IDefaultIcon = "default";

export const iGeoJsons: IGeoJson = {
  places: "/data/places.json",
};

export const iLayers: ILayers = {
  polygon: {
    fill: true,
    line: true,
  },
  polyline: {
    line: true,
    symbol: false,
  },
  point: {
    symbol: true,
  },
};

export const iSourcePrefix: ISourcePrefix = "";

export const iLayersPrefixes: ILayersPrefixes = {
  polygon: {
    fill: "polygon-fill-",
    line: "polygon-line-",
  },
  polyline: {
    line: "polyline-line-",
    symbol: "polyline-symbol-",
  },
  point: {
    symbol: "point-symbol-",
  },
};
