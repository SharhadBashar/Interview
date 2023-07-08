import weekReducer from "../weekReducer";
import { FETCH_WEEK } from "../../actions/types";
it("handles actions of SAVE_COMMENTS", () => {
  const weather = { data: "Cloudy" };
  const action = {
    type: FETCH_WEEK,
    payload: weather
  };
  const newState = weekReducer([], action);
  expect(newState).toEqual(["Cloudy"]);
});
it("handles type of unknown", () => {
  const newState = weekReducer([], { type: "huihhihhhihi" });
  expect(newState).toEqual([]);
});
