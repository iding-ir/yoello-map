import { useState } from "react";
import { Map, Marker, LngLatLike } from "mapbox-gl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface MarkerOptions {
  map: Map;
  name: string;
  lnglat: LngLatLike;
  iconUrl?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marker: {
      width: "50px",
      height: "50px",
      transform: "translate(-50%, -100%)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom center",
      backgroundSize: "100% ",
      backgroundImage: "url('../assets/images/icon-marker.png')",
      zIndex: 0,
    },
  })
);

export const useMarkers = () => {
  const classes = useStyles();

  const [markers, setMarkers] = useState<{
    [key: string]: Marker | HTMLDivElement;
  }>({});

  const createMarker = (options: MarkerOptions) => {
    const marker = document.createElement("div");

    marker.className = classes.marker;

    if (options.iconUrl) {
      marker.style.backgroundImage = `url('${options.iconUrl}')`;
    }

    new Marker(marker, {
      anchor: "bottom",
    })
      .setLngLat(options.lnglat)
      .addTo(options.map);

    setMarkers({ ...markers, [options.name]: marker });
  };

  const removeMarker = (name: string) => {
    if (markers[name]) {
      markers[name].remove();
    }
  };

  return { markers, createMarker, removeMarker };
};
