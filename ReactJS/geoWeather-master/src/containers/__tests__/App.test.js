import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "../App";
import SearchBar from "../search_bar";
import Weather from "../weather";
let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});
it("has one search bar", () => {
  expect(wrapped.find(SearchBar).length).toEqual(1);
});
it("has one weather list", () => {
  expect(wrapped.find(Weather).length).toEqual(1);
});
