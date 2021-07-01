import { useState } from "react";
import ReactDOM from "react-dom";
import { Map, Popup, LngLatLike } from "mapbox-gl";

interface PopupOptions {
  map: Map;
  lnglat: LngLatLike;
  content: JSX.Element;
}

export const usePopup = () => {
  const [popup, setPopup] = useState<Popup>();

  const openPopup = (options: PopupOptions) => {
    const placeholder = document.createElement("div");

    ReactDOM.render(options.content, placeholder);

    const popup = new Popup({
      closeButton: false,
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
