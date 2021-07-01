import { LngLatLike } from "mapbox-gl";

import { LOCATION_SET_CURRENT, LOCATION_SET_PICKED } from "../constants/redux";
import { IAction } from "../actions/location";

export interface IStateLocation {
  current: LngLatLike;
  picked: LngLatLike;
}

const initialState = {
  current: null,
  picked: null,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOCATION_SET_CURRENT:
      return {
        ...state,
        current: action.payload.location,
      };

    case LOCATION_SET_PICKED:
      return {
        ...state,
        picked: action.payload.location,
      };
    default:
      return state;
  }
};

export default reducer;
