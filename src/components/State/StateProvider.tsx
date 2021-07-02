import React, { Context, useState, createContext } from "react";
import { Map } from "mapbox-gl";
import { FeatureCollection } from "geojson";

export interface State {
  map?: Map;
  geoJsons?: { [key: string]: FeatureCollection };
}

export const StateContext: Context<any> = createContext({
  state: {},
  setState: () => {},
});

interface Props {
  children: JSX.Element;
}

export const StateProvider = (props: Props) => {
  const { children } = props;

  const [state, setState] = useState<State>({});

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};
