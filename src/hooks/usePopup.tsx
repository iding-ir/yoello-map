import { useState } from "react";
import ReactDOM from "react-dom";
import { Map, Popup, LngLatLike } from "mapbox-gl";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

interface PopupOptions {
  map: Map;
  lnglat: LngLatLike;
  content: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popup: {
      maxWidth: "unset !important",
    },
  })
);

export const usePopup = () => {
  const classes = useStyles();

  const [popup, setPopup] = useState<Popup>();

  const openPopup = (options: PopupOptions) => {
    const placeholder = document.createElement("div");

    ReactDOM.render(options.content, placeholder);

    const popup = new Popup({
      closeButton: false,
      className: classes.popup,
    })
      .setLngLat(options.lnglat)
      .setDOMContent(placeholder)
      .addTo(options.map);

    setPopup(popup);
  };

  const closePopup = () => {
    if (popup && popup.isOpen()) popup.remove();
  };

  return { popup, openPopup, closePopup };
};
