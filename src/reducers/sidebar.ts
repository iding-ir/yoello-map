import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  SIDEBAR_TOGGLE,
} from "../constants/redux";
import { IAction } from "../actions/sidebar";

export interface IStateSidebar {
  open: boolean;
}

const initialState = {
  open: false,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return {
        open: true,
      };
    case SIDEBAR_CLOSE:
      return {
        open: false,
      };
    case SIDEBAR_TOGGLE:
      return {
        open: !state.open,
      };
    default:
      return state;
  }
};

export default reducer;
