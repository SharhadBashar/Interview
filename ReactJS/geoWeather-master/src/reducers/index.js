import { combineReducers } from "redux";
import currentReducer from "./currentReducer";
import weekReducer from "./weekReducer";
import weatherReducer from "./weatherReducer";
import locationReducer from "./locationReducer";
const rootReducer = combineReducers({
  current: currentReducer,
  week: weekReducer,
  weather: weatherReducer,
  location: locationReducer
});

export default rootReducer;
