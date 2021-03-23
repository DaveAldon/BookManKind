import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    backgroundColor: "#0085cc",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
  },
});

export const Colors = {
  backgrounds: {
    DARKEST: "#2F3136",
    DARKEST_OPAQUE: "rgba(47, 49, 54, 0.8)",
    MEDIUMDARK: "#36393F",
    LIGHTEST: "#40444C",
    BRIGHT: "#C7CFD6",
    BLUE: "#006399",
  },
  buttons: {
    RED: "#ff4545",
    BLUE: "#0085cc",
    GREEN: "#25a83f",
  },
  defaultText: {
    color: "#FFFF",
  },
  text: {
    green: "#34eb58",
    red: "#ff4545",
    yellow: "#edd900",
    light: "#999999",
  },
};

export default styles;
