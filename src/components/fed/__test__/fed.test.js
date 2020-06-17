import React from "react";
import { fireEvent, wait, getByTestId, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Fed } from "../";
import { renderWithProvider } from "../../../utils/testing";

jest.useFakeTimers();

describe("Fed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = renderWithProvider(<Fed />);
  });

  it("should render Fed", () => {
    //const { debug } = wrapper;
    expect(renderWithProvider(<Fed />));
  });

  describe("show titles and subTitles Fed", () => {
    it("show title > Alimentacion", () => {
      const { getByText } = wrapper;
      expect(getByText("Alimentacion")).toBeInTheDocument();
    });
    it("show subTitle > AM", () => {
      const { getByText } = wrapper;
      expect(getByText("AM")).toBeInTheDocument();
    });
    it("show subTitle > PM", () => {
      const { getByText } = wrapper;
      expect(getByText("PM")).toBeInTheDocument();
    });
  });

  it("show CircularProgress", () => {
    const { container } = wrapper;
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("show Table AM and PM ", () => {
    const { container } = wrapper;
    act(() => jest.runAllTimers());
    // await wait();
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("show Switch", () => {
    const { container } = wrapper;
    act(() => jest.runAllTimers());
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("show Switch", () => {
    const { debug } = wrapper;
    act(() => jest.runAllTimers());
    debug();
  });
});
