import { LngLatLike } from "mapbox-gl";

import { LOCATION_SET_CURRENT, LOCATION_SET_PICKED } from "../constants";

export interface IAction {
  type: string;
  payload: { location: LngLatLike | null };
}

export const setCurrentLocation = (location: LngLatLike | null): IAction => ({
  type: LOCATION_SET_CURRENT,
  payload: { location },
});

export const setPickedLocation = (location: LngLatLike | null): IAction => ({
  type: LOCATION_SET_PICKED,
  payload: { location },
});
