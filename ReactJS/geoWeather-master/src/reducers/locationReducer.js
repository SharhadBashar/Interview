import { FETCH_LOCATION } from "../actions/types";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LOCATION:
      return [action.payload.data.address.city, ...state];
    default:
      return state;
  }
}
