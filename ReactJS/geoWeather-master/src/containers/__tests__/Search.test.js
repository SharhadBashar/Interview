import React from "react";
import { mount } from "enzyme";

import SearchBar from "../search_bar";
import { wrap } from "module";
import Root from "../../Root";
let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <SearchBar />
    </Root>
  );
});
afterEach(() => {
  wrapped.unmount();
});
it("has a text area and button", () => {
  expect(wrapped.find("h2").length).toEqual(1);
  expect(wrapped.find("input").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
});
