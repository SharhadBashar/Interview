import React from "react";
import { render, screen } from "@testing-library/react";
// you can also use import { mount, shallow } from 'enzyme'; if you want to use enzyme instead of react testing library
import App from "./App";

test("renders <App /> component", () => {
  render(<App />);
  const targetElement = screen.getByText(
    "Your local Wave UX Challenge is running! Edit src/App.tsx and save to reload."
  );
  expect(targetElement).toBeInTheDocument();
});
