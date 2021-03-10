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
  },
  buttons: {
    RED: "#ff4545",
    BLUE: "#0085cc",
  },
  defaultText: {
    color: "#FFFF",
  },
};

export default styles;
