import { StyleSheet } from "react-native";

export const colorsOLD = {
  primary: "#d95d49",
  primaryLight: "#d47262",
  secondary: "#32db64",
  light: "#f4f4f4",
  dark: "#222",
  success: "#239846",
  warning: "#dbc024",
  info: "#3388ff",
  danger: "#f53d3d"
};

const [black, white] = ["#000", "#fff"];

export const colors = {
  white: {
    main: white
  },
  black: {
    main: black
  },
  primary: {
    contrastText: white,
    main: "#d95d49",
    light: "#F6F9FD",
    dark: "#0B48A0"
  },
  secondary: {
    contrastText: white,
    main: "#7d58ff",
    light: "",
    dark: "#37248F"
  },
  success: {
    contrastText: white,
    main: "#45B880",
    light: "#F1FAF5",
    dark: "#00783E"
  },
  info: {
    contrastText: white,
    main: "#1070CA",
    light: "#F1FBFC",
    dark: "#007489"
  },
  warning: {
    contrastText: white,
    main: "#FFB822",
    light: "#FDF8F3",
    dark: "#95591E"
  },
  danger: {
    contrastText: white,
    main: "#ED4740",
    light: "#FEF6F6",
    dark: "#BF0E08"
  },
  text: {
    primary: "#12161B",
    secondary: "#66788A",
    disabled: "#A6B1BB"
  },
  background: {
    default: "#f8fafc",
    dark: "#172B4D",
    paper: white
  },
  border: "#DFE3E8",
  divider: "#DFE3E8"
};

const appStyles = StyleSheet.create({
  buttomFooter: {
    width: "100%",
    height: 50,
    padding: 10,
    backgroundColor: colors.primary.main
  },
  buttomFooterText: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  centerMsg: {
    color: "#5a5a5a",
    fontSize: 17,
    padding: 15
  }
});

export default appStyles;
