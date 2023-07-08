import { FETCH_CURRENT } from "../actions/types";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CURRENT:
      return [action.payload.data, ...state];
    default:
      return state;
  }
}
