import React from "react";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useTranslation } from "react-i18next";
import { ReactComponent as Text } from "../../assets/images/yoello-text.svg";

import { openSidebar } from "../../actions/sidebar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    text: {
      width: "auto",
      height: "40px",
    },
  })
);

export const Header = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(openSidebar());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={onClick}
        >
          <MenuIcon />
        </IconButton>

        <Text className={classes.text} />
      </Toolbar>
    </AppBar>
  );
};
