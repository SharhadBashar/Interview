import axios from "axios";
import {
  FETCH_CURRENT,
  FETCH_WEATHER,
  FETCH_WEEK,
  FETCH_LOCATION,
  ROOT_FORECAST_URL,
  ROOT_WEATHER_URL
} from "./types";
export function fetchCurrent(city) {
  const url = `${ROOT_WEATHER_URL}&q=${city},ca`;
  const request = axios.get(url);
  return {
    type: FETCH_CURRENT,
    payload: request
  };
}
export function fetchWeek(city) {
  const url = `${ROOT_FORECAST_URL}&q=${city},ca`;
  const request = axios.get(url);
  return {
    type: FETCH_WEEK,
    payload: request
  };
}
export function fetchWeather(current, forecast) {
  let combinedInfo = [];
  for (var i = 0; i < current.length; i++) {
    combinedInfo.push([current[i], forecast[i]]);
  }
  return {
    type: FETCH_WEATHER,
    payload: combinedInfo
  };
}
export function fetchLocation(latitude, longitude) {
  const res = axios.get(
    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&zoom=18&addressdetails=1"
  );
  // console.log("json:", res);
  //console.log("json:", res);
  return {
    type: FETCH_LOCATION,
    payload: res
  };
}
