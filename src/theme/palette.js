// import { colors } from "@material-ui/core";
// import { colors } from "@mui/material/styles";
import { colors } from "@mui/material";

const white = "#FFFFFF";
const black = "#000000";
const gray = "#e0e0e0";

export default {
  black,
  white,
  gray,
  primary: {
    contrastText: white,
    // main: "#2EA1E8",
    main: "#125285",
  },
  secondary: {
    contrastText: white,
    dark: "#c97b28",
    main: "#FC9A33",
    light: colors.red[100],
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  disabled: "#F8F9FA",
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    contrastText: white,
    link: colors.blue[600],
  },
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
