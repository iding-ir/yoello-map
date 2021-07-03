import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import * as turf from "@turf/turf";

import { IState } from "../../reducers";
import { closeSidebar } from "../../actions/sidebar";
import { SIDEBAR_WIDTH } from "../../constants";
import { StateContext } from "../../components/State";
import { LngLatLike } from "mapbox-gl";
import { renderGeoJsons } from "../../modules/renderGeoJsons";
import { ReactComponent as Logo } from "../../assets/images/yoello-logo.svg";
import { ReactComponent as Text } from "../../assets/images/yoello-text.svg";

interface Type {
  key: string;
  label: string;
  init: boolean;
}

interface Menu {
  key: string;
  label: string;
  init: boolean;
}

const types: Type[] = [
  {
    key: "restaurant",
    label: "Restaurant",
    init: true,
  },
  {
    key: "hotel",
    label: "Hotel",
    init: true,
  },
  {
    key: "cafe",
    label: "Cafe",
    init: true,
  },
  {
    key: "pub",
    label: "Pub",
    init: true,
  },
  {
    key: "bar",
    label: "Bar",
    init: true,
  },
];

const menus: Menu[] = [
  {
    key: "burger",
    label: "Burger",
    init: false,
  },
  {
    key: "pasta",
    label: "Pasta",
    init: false,
  },
  {
    key: "pizza",
    label: "Pizza",
    init: false,
  },
  {
    key: "kebab",
    label: "Kebab",
    init: false,
  },
  {
    key: "water",
    label: "Water",
    init: false,
  },
  {
    key: "wine",
    label: "Wine",
    init: false,
  },
  {
    key: "coke",
    label: "Coke",
    init: false,
  },
  {
    key: "beer",
    label: "Beer",
    init: false,
  },
];

const iType = types.reduce((total: any, type: Type) => {
  return { ...total, [type.key]: type.init };
}, {});

const iMenu = menus.reduce((total: any, menu: Menu) => {
  return { ...total, [menu.key]: menu.init };
}, {});

const iDistance = 4000;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menus: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
    list: {
      width: SIDEBAR_WIDTH,
      padding: "1rem",
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "left",
      height: "calc(40px + 2rem)",
      padding: "1rem",
      display: "flex",
    },
    logo: {
      width: "40px",
      height: "40px",
    },
    text: {
      width: "auto",
      height: "40px",
      margin: "0 1rem",
    },
  })
);

export const Sidebar = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const open = useSelector((state: IState) => state.sidebar.open);
  const pickedLocation = useSelector(
    (state: IState) => state.location.picked
  ) as any;

  const { state, setState } = useContext(StateContext);

  const { map, geoJsons } = state;

  const [typeState, setTypeState] = useState<{ [key: string]: boolean }>(iType);
  const [menuState, setMenuState] = useState<{ [key: string]: boolean }>(iMenu);
  const [distanceState, setDistanceState] = useState<number | number[]>(
    iDistance
  );

  useEffect(() => {
    if (map && pickedLocation) {
      const features = geoJsons.places.features.filter((feature: any) => {
        const distance = turf.distance(
          feature.geometry.coordinates,
          [pickedLocation.lng, pickedLocation.lat],
          { units: "meters" }
        );

        return distance <= distanceState;
      });

      const FiltteredGeoJsons = {
        ...geoJsons,
        places: { ...geoJsons.places, features },
      };

      renderGeoJsons(map, FiltteredGeoJsons);

      const filterType: any[] = types.reduce(
        (total: any, type: Type) => {
          return typeState[type.key]
            ? [...total, ["==", ["get", "type"], type.key]]
            : total;
        },
        ["any"]
      );

      const filterMenu: any[] = menus.reduce(
        (total: any, menu: Menu) => {
          return menuState[menu.key]
            ? [...total, ["in", menu.key, ["get", "menu"]]]
            : total;
        },
        ["all"]
      );

      const filters = ["all", filterType, filterMenu];

      map.setFilter("point-symbol-places", filters);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeState, menuState, distanceState, pickedLocation]);

  const renderTypes = () => {
    return (
      <FormGroup row>
        {types.map((type: Type) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={typeState[type.key]}
                  name={type.key}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setTypeState({
                      ...typeState,
                      [type.key]: !typeState[type.key],
                    });
                  }}
                />
              }
              label={type.label}
            />
          );
        })}
      </FormGroup>
    );
  };

  const renderMenus = () => {
    return (
      <FormGroup row>
        <Autocomplete
          className={classes.menus}
          multiple
          options={menus}
          getOptionLabel={(option) => option.label}
          defaultValue={menus.filter((menu: Menu) => {
            return menuState[menu.key];
          })}
          onChange={(event: any, values: Menu[]) => {
            const valuesKeys = values.map((menu: Menu) => menu.key);
            const menusKeys = menus.map((menu: Menu) => menu.key);

            const state = menusKeys.reduce((total: any, menu: string) => {
              return valuesKeys.includes(menu)
                ? { ...total, [menu]: true }
                : { ...total, [menu]: false };
            }, {});

            setMenuState(state);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Items"
              placeholder="Search menus"
            />
          )}
        />
      </FormGroup>
    );
  };

  const renderDistance = () => {
    return (
      <Slider
        defaultValue={distanceState}
        getAriaValueText={(value: number) => `${value}m`}
        aria-labelledby="distance-slider"
        valueLabelDisplay="auto"
        onChange={(event: any, value: number | number[]) => {
          setDistanceState(value);
        }}
        step={200}
        marks
        min={200}
        max={4000}
      />
    );
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        dispatch(closeSidebar());
      }}
    >
      <div className={classes.header}>
        <Logo className={classes.logo} />

        <Text className={classes.text} />
      </div>

      <div className={classes.list} role="presentation">
        <Typography variant="h6" gutterBottom>
          Type
        </Typography>

        {renderTypes()}
      </div>

      <div className={classes.list} role="presentation">
        <Typography variant="h6" gutterBottom>
          Distance
        </Typography>

        {renderDistance()}
      </div>

      <div className={classes.list} role="presentation">
        <Typography variant="h6" gutterBottom>
          Menu
        </Typography>

        {renderMenus()}
      </div>
    </Drawer>
  );
};
