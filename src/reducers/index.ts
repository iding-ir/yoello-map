import { combineReducers } from "redux";

import sidebarReducer, { IStateSidebar } from "./sidebar";
import locationReducer, { IStateLocation } from "./location";

export interface IState {
  sidebar: IStateSidebar;
  location: IStateLocation;
}

const combinedReducers = combineReducers({
  sidebar: sidebarReducer,
  location: locationReducer,
});

export default combinedReducers;
