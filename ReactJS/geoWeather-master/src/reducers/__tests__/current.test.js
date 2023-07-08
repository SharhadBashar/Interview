import currentReducer from "../currentReducer";
import { FETCH_CURRENT } from "../../actions/types";
it("handles actions of SAVE_COMMENTS", () => {
  const weather = { data: "Cloudy" };
  const action = {
    type: FETCH_CURRENT,
    payload: weather
  };
  const newState = currentReducer([], action);
  expect(newState).toEqual(["Cloudy"]);
});
it("handles type of unknown", () => {
  const newState = currentReducer([], { type: "huihhihhhihi" });
  expect(newState).toEqual([]);
});
