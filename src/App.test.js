import React from "react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

let { asFragment } = render(<App />);

describe("App", () => {
  it("renders without crashing", () => {
    expect(asFragment()).toMatchSnapshot();
    expect(render(<App />));
  });
});
