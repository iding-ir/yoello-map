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

import { IState } from "../../reducers";
import { closeSidebar } from "../../actions/sidebar";
import { SIDEBAR_WIDTH } from "../../constants";
import { StateContext } from "../../components/State";

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

  const [typeState, setTypeState] = useState<{ [key: string]: boolean }>(iType);
  const [menuState, setMenuState] = useState<{ [key: string]: boolean }>(iMenu);

  useEffect(() => {
    if (map) {
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
  }, [typeState, menuState]);

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

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        dispatch(closeSidebar());
      }}
    >
      <div className={classes.list} role="presentation">
        <Typography variant="h6" gutterBottom>
          Type
        </Typography>

        {renderTypes()}
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
