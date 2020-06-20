import React from "react";
import { act, fireEvent } from "@testing-library/react";
import { Fed } from "../";
import { renderWithProvider, setWindowWidth } from "../../../utils/testing";
import { getToday, getHour, getUserName } from "../../../utils/fed";

jest.useFakeTimers();

describe("Fed", () => {
  let wrapper;
  beforeEach(() => {
    setWindowWidth(992); //md
    wrapper = renderWithProvider(<Fed />);
  });

  it("should show Fed", () => {
    expect(wrapper).toBeTruthy();
  });

  describe("show titles and subTitles", () => {
    it("should show title: Alimentacion", () => {
      const { getByText } = wrapper;
      expect(getByText("Alimentacion")).toBeInTheDocument();
    });
    it("should show subTitle: AM", () => {
      const { getByText } = wrapper;
      expect(getByText("AM")).toBeInTheDocument();
    });
    it("should show subTitle: PM", () => {
      const { getByText } = wrapper;
      expect(getByText("PM")).toBeInTheDocument();
    });
  });

  it("should show CircularProgress", () => {
    const { container } = wrapper;
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("should show Table AM and PM ", () => {
    const { container } = wrapper;
    act(() => jest.runAllTimers());
    // await wait();
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("should show Switches", () => {
    const { container } = wrapper;
    act(() => jest.runAllTimers());
    expect(container.querySelector("input")).toBeInTheDocument();
  });

  describe("show days ", () => {
    it("should show Lunes", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Lunes"));
    });
    it("should show Martes", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Martes"));
    });
    it("should show Miercoles", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Miercoles"));
    });
    it("should show Jueves", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Jueves"));
    });
    it("should show Viernes", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Viernes"));
    });
    it("should show Sabado", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Sabado"));
    });
    it("should show Domingo", () => {
      const { getAllByText } = wrapper;
      act(() => jest.runAllTimers());
      expect(getAllByText("Domingo"));
    });
  });

  it("should show placeholder: --:--", () => {
    const { getAllByText } = wrapper;
    act(() => jest.runAllTimers());
    expect(getAllByText("--:--")).toBeTruthy();
  });

  it("should show button edit", () => {
    const { getAllByRole } = wrapper;
    act(() => jest.runAllTimers());
    expect(getAllByRole("button", "button", { name: "edit" }));
  });

  describe("when clicking the switch, edit button and done button", () => {
    it("should show user, hour and successful registration/edition feedback", () => {
      const { getAllByRole, getByText } = wrapper;
      act(() => jest.runAllTimers());

      const todaySwitch = getAllByRole("checkbox")[getToday()];
      act(() => {
        fireEvent.click(todaySwitch);
      });
      act(() => {
        expect(getByText(getUserName()));
        expect(getByText(getHour()));
        expect(getAllByRole("alert"));
        expect(getByText("Registro agregado"));
      });

      const editButton = getAllByRole("button")[getToday()];
      act(() => {
        fireEvent.click(editButton);
      });
      act(() => {
        expect(getAllByRole("textEdit"));
      });

      const doneButton = getAllByRole("button", "button", { name: "done" })[
        getToday()
      ];
      act(() => {
        fireEvent.click(doneButton);
      });
      act(() => {
        expect(getByText(getUserName()));
        expect(getByText(getHour()));
        expect(getAllByRole("alert"));
        expect(getByText("Registro editado"));
      });
    });
  });
});
