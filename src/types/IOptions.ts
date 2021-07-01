import { LngLatLike } from "mapbox-gl";

export interface IMap {
  container: string;
  center: LngLatLike;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  pitch?: number;
  bearing?: number;
  hash?: boolean;
}

export interface IStyles {
  light: string;
  dark: string;
}

export type IDefaultStyle = "light" | "dark";

export interface IControls {
  fullscreen?: boolean;
  geolocation?: boolean;
  navigation?: boolean;
}

export interface IColors {
  primary: string;
  secondary: string;
}

export interface IFeatureColors {
  light: IColors;
  dark: IColors;
}

export interface ImapColors {
  background: string;
  fill: string;
  line: string;
  text: string;
}

export interface IMapColors {
  light: ImapColors;
  dark: ImapColors;
}

export interface IIcons {
  [key: string]: string;
}

export type IDefaultIcon = string;

export interface IGeoJson {
  [key: string]: string;
}

export interface ILayers {
  polygon: {
    fill: boolean;
    line: boolean;
  };
  polyline: {
    line: boolean;
    symbol: boolean;
  };
  point: {
    symbol: boolean;
  };
}

export type ISourcePrefix = string;

export interface ILayersPrefixes {
  polygon: {
    fill: string;
    line: string;
  };
  polyline: {
    line: string;
    symbol: string;
  };
  point: {
    symbol: string;
  };
}
