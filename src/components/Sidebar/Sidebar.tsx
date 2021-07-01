import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Help from "@material-ui/icons/HelpOutline";
import MailIcon from "@material-ui/icons/Mail";
import { useTranslation } from "react-i18next";

import { IState } from "../../reducers";
import { closeSidebar } from "../../actions/sidebar";
import { SIDEBAR_WIDTH } from "../../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: SIDEBAR_WIDTH,
    },
  })
);

export const Sidebar = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const open = useSelector((state: IState) => state.sidebar.open);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        dispatch(closeSidebar());
      }}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={() => {
          dispatch(closeSidebar());
        }}
        onKeyDown={() => {
          dispatch(closeSidebar());
        }}
      >
        <List>
          <ListItem button key="about">
            <ListItemIcon>
              <Help />
            </ListItemIcon>

            <ListItemText primary={t("sidebar.about")} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button key="contact">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>

            <ListItemText primary={t("sidebar.contact")} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
