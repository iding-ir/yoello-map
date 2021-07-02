import React, { useEffect, useContext, ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslation } from "react-i18next";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";

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
    table: {
      width: "100%",
    },
    card: {
      flexDirection: "column",
    },
    content: {
      padding: "0",
      paddingBottom: "0 !important",
    },
    media: {
      height: "160px",
      width: "240px",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

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

  const { map, geoJsons } = useMap();

  const renderPopup = (properties: any) => {
    return (
      <Card>
        <CardMedia
          image={properties.image}
          title={properties.name}
          className={classes.media}
        />

        <CardHeader title={properties.name} />

        <CardContent className={classes.content}>
          <TableContainer>
            <Table className={classes.table} aria-label={properties.name}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Menu</StyledTableCell>
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {JSON.parse(properties.menu).map((item: string) => (
                  <StyledTableRow key={item}>
                    <StyledTableCell align="left">{item}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };

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
    setState({ ...state, map, geoJsons });

    if (map) {
      map.on("click", "point-symbol-places", (event: any) => {
        let properties = event.features[0].properties;
        let coordinates = event.features[0].geometry.coordinates.slice();

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        openPopup({
          map,
          lnglat: coordinates,
          content: renderPopup(properties),
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
