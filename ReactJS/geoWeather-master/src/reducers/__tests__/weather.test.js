import weatherReducer from "../weatherReducer";
import { FETCH_WEATHER } from "../../actions/types";
it("handles actions of SAVE_COMMENTS", () => {
  const action = {
    type: FETCH_WEATHER,
    payload: "Cloudy"
  };
  const newState = weatherReducer([], action);
  expect(newState).toEqual(["Cloudy"]);
});
it("handles type of unknown", () => {
  const newState = weatherReducer([], { type: "huihhihhhihi" });
  expect(newState).toEqual([]);
});
