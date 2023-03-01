import { StyleSheet, Dimensions } from "react-native";
import theme from "./theme";
const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  processContainer: {
    alignItems: "center"
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10
  },
  header: {
    ...theme.fonts.heading,
    padding: 10
  },
  processBar: {
    margin: 10
  },
  checkin: {
    ...theme.fonts.subheading3,
    color: theme.colors.sunYellow,
    margin: 10
  },
  input: {
    width: width * 0.95,
    height: 40,
    borderWidth: 2,
    borderColor: theme.colors.seaBlue,
    padding: 5,
    margin: 5
  },
  sliderTitle: {
    textAlign: "center"
  },
  highlight: {
    color: theme.colors.skyBlue
  },
  sliderContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  sliderContainer: {
    width: width,
    margin: 5
  },
  slider: {
    width: width * 0.9,
    height: 30
  },
  title: {
    ...theme.fonts.subheading,
    color: theme.colors.skyBlue,
    textAlign: "center",
    margin: 5
  },
  result: {
    margin: 5,
    ...theme.fonts.subheading2
  },
  error: {
    ...theme.fonts.heading,
    color: "#cc3300"
  },
  principal: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    position: "relative"
  },
  interest: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    position: "relative"
  },
  inputIcon: {
    position: "absolute",
    right: width * 0.05,
    width: 12,
    height: 12,
    resizeMode: "contain"
  },
  compound: {
    margin: 5
  },
  result: {
    margin: 5,
    alignItems: "center"
  },

  button: {
    borderWidth: 3,
    width: width * 0.4,
    padding: 10,
    borderColor: theme.colors.skyBlue,
    ...theme.fonts.subheading,
    color: "white",
    backgroundColor: theme.colors.skyBlue,
    textAlign: "center",
    marginBottom: 10
  },
  checkin: {
    ...theme.fonts.subheading3,
    color: theme.colors.sunYellow,
    margin: 10
  },
  buttonsContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center"
  },
  orangeButtonContainer: {
    backgroundColor: theme.colors.monikOrange,
    borderRadius: 50,
    width: width * 0.6,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0.1 * width,
    marginBottom: 0.1 * width
  },
  orangeButtonText: {
    color: "#fff"
  },
  burronShadow: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowColor: "grey",
    shadowRadius: 2,
    shadowOffset: { height: 3, width: 0 },
    shadowRadius: 3
  }
});
