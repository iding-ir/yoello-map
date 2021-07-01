import { SIDEBAR_OPEN, SIDEBAR_CLOSE, SIDEBAR_TOGGLE } from "../constants";

export interface IAction {
  type: string;
}

export const openSidebar = (): IAction => ({
  type: SIDEBAR_OPEN,
});

export const closeSidebar = (): IAction => ({
  type: SIDEBAR_CLOSE,
});

export const sidebarToggle = (): IAction => ({
  type: SIDEBAR_TOGGLE,
});
