import React from "react";
import App from "./App";
import { renderWithProvider } from "../src/utils/testing";
let wrapper;
describe("App", () => {
  beforeEach(() => {
    wrapper = renderWithProvider(<App />);
  });
  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
});
