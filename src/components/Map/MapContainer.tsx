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
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

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
    media: {
      height: "200px",
      width: "300px",
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
      map.on("click", "point-symbol-places", (event: any) => {
        let properties = event.features[0].properties;
        let coordinates = event.features[0].geometry.coordinates.slice();

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        openPopup({
          map,
          lnglat: coordinates,
          content: (
            <>
              <CardActions className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    image={properties.image}
                    title={properties.name}
                    className={classes.media}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {properties.name}
                    </Typography>

                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-label={properties.name}
                      >
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell>Menu</StyledTableCell>
                          </StyledTableRow>
                        </TableHead>

                        <TableBody>
                          {JSON.parse(properties.menu).map((item: string) => (
                            <StyledTableRow key={item}>
                              <StyledTableCell align="left">
                                {item}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </CardActionArea>

                <CardActions></CardActions>
              </CardActions>
            </>
          ),
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
