import React, { useEffect, useContext, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslation } from "react-i18next";

import { StateContext } from "../State";
import { useMap } from "../../hooks/useMap";
import { usePopup } from "../../hooks/usePopup";
import { getLocation } from "../../utils/getLocation";
import { setCurrentLocation } from "../../actions/location";
import { SnackbarContext } from "../Snackbar/SnackbarProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    map: {
      position: "relative",
      width: "100%",
      height: "100%",
      flexGrow: 1,
    },
  })
);

interface Props {
  children?: ReactNode;
}

export const MapContainer = (props: Props) => {
  const { children } = props;

  const dispatch = useDispatch();

  const classes = useStyles();

  const { t } = useTranslation();

  const { state, setState } = useContext(StateContext);
  const { setSnackbar } = useContext(SnackbarContext);

  const { openPopup } = usePopup();

  const { map } = useMap();

  useEffect(() => {
    getLocation()
      .then((p: unknown) => {
        const position = p as GeolocationPosition;
        const currentLocation = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };

        dispatch(setCurrentLocation(currentLocation));

        setSnackbar({
          type: "success",
          message: t("currentLocation.success"),
        });
      })
      .catch((error) => {
        setSnackbar({
          type: "error",
          message: t("currentLocation.failure"),
        });

        throw error;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({ ...state, map });

    if (map) {
      map.on("click", "point-symbol-cats", (event: any) => {
        let properties = event.features[0].properties;
        let coordinates = event.features[0].geometry.coordinates.slice();

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        openPopup({
          map,
          lnglat: coordinates,
          content: <div>{properties.name}</div>,
        });
      });

      map.on("click", "point-symbol-dogs", (event: any) => {
        let properties = event.features[0].properties;
        let coordinates = event.features[0].geometry.coordinates.slice();

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        openPopup({
          map,
          lnglat: coordinates,
          content: <div>{properties.name}</div>,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <div className={classes.map} id="map">
      {children}
    </div>
  );
};
