import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { IState } from "../../reducers";
import { closeSidebar } from "../../actions/sidebar";
import { SIDEBAR_WIDTH } from "../../constants";
import { StateContext } from "../../components/State";

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

  const { state, setState } = useContext(StateContext);

  const { map } = state;

  const [type, setType] = useState({
    restaurant: true,
    hotel: true,
    cafe: true,
    pub: true,
    bar: true,
  });

  useEffect(() => {
    if (map) {
      const filters: any[] = ["any"];

      if (type.restaurant) {
        filters.push(["==", ["get", "type"], "restaurant"]);
      }

      if (type.hotel) {
        filters.push(["==", ["get", "type"], "hotel"]);
      }

      if (type.cafe) {
        filters.push(["==", ["get", "type"], "cafe"]);
      }

      if (type.pub) {
        filters.push(["==", ["get", "type"], "pub"]);
      }

      if (type.bar) {
        filters.push(["==", ["get", "type"], "bar"]);
      }

      map.setFilter("point-symbol-places", filters);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        dispatch(closeSidebar());
      }}
    >
      <div className={classes.list} role="presentation">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={type.restaurant}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setType({ ...type, restaurant: !type.restaurant });
                }}
                name="restaurant"
              />
            }
            label="Restaurant"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={type.hotel}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setType({ ...type, hotel: !type.hotel });
                }}
                name="hotel"
              />
            }
            label="Hotel"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={type.cafe}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setType({ ...type, cafe: !type.cafe });
                }}
                name="cafe"
              />
            }
            label="Cafe"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={type.pub}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setType({ ...type, pub: !type.pub });
                }}
                name="pub"
              />
            }
            label="Pub"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={type.bar}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setType({ ...type, bar: !type.bar });
                }}
                name="bar"
              />
            }
            label="Bar"
          />
        </FormGroup>
      </div>
    </Drawer>
  );
};
