import React from "react";
import { mount } from "enzyme";

import Weather from "../weather";
import { wrap } from "module";
import Root from "../../Root";
let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <Weather />
    </Root>
  );
});
afterEach(() => {
  wrapped.unmount();
});
it("has a button", () => {
  expect(wrapped.find("button").length).toEqual(1);
});
