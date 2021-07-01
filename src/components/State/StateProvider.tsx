import React, { Context, useState, createContext } from "react";
import { Map, Marker } from "mapbox-gl";

export interface State {
  map?: Map;
  markers?: { [key: string]: Marker };
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
