import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Navbar, ProfileMenu } from "./../";
import { Sidebar } from "../../sidebar";

let wrapper;

describe("Navbar", () => {
  it("should render navbar", () => {
    expect(render(<Navbar />));
  });

  beforeEach(() => {
    wrapper = render(<Navbar />);
  });

  it("show the app title", () => {
    const { getByText } = wrapper;
    expect(getByText("Mascot Web")).toBeInTheDocument();
  });

  it("show the icon profile", () => {
    const { getByTestId } = wrapper;
    expect(getByTestId("icon-profile")).toBeInTheDocument();
  });

  it("should open profile menu", () => {
    const { getByTestId } = wrapper;
    fireEvent.click(getByTestId("icon-profile"), wait(render(<ProfileMenu />)));
  });

  it("show the icon drawer", () => {
    const { getByTestId } = wrapper;
    expect(getByTestId("drawer")).toBeInTheDocument();
  });

  it("should open sideBar", () => {
    const { getByTestId } = wrapper;
    fireEvent.click(getByTestId("drawer"), wait(render(<Sidebar />)));
  });
});
