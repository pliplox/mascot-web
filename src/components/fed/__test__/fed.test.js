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

  it("show Fed", () => {
    expect(wrapper).toBeTruthy();
  });

  describe("when fed is already render", () => {
    it("show title: Alimentacion", () => {
      const { getByText } = wrapper;
      expect(getByText("Alimentacion")).toBeInTheDocument();
    });
    it("show subTitle: AM", () => {
      const { getByText } = wrapper;
      expect(getByText("AM")).toBeInTheDocument();
    });
    it("show subTitle: PM", () => {
      const { getByText } = wrapper;
      expect(getByText("PM")).toBeInTheDocument();
    });
  });

  it("show CircularProgress", () => {
    const { container } = wrapper;
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  describe("when circular progress it complete", () => {
    beforeEach(() => {
      act(() => jest.runAllTimers());
    });

    it("show Table AM and PM ", () => {
      const { container } = wrapper;
      expect(container.querySelector("table")).toBeInTheDocument();
    });
    it("show all Switches", () => {
      const { container } = wrapper;
      expect(container.querySelector("input")).toBeInTheDocument();
    });

    describe("show days of the week", () => {
      it("show Lunes", () => {
        const { getByText } = wrapper;
        expect(getByText("Lunes")).toBeInTheDocument();
      });
      it("show Martes", () => {
        const { getByText } = wrapper;
        expect(getByText("Martes")).toBeInTheDocument();
      });
      it("show Miercoles", () => {
        const { getByText } = wrapper;
        expect(getByText("Miercoles")).toBeInTheDocument();
      });
      it("show Jueves", () => {
        const { getByText } = wrapper;
        expect(getByText("Jueves")).toBeInTheDocument();
      });
      it("show Viernes", () => {
        const { getByText } = wrapper;
        expect(getByText("Viernes")).toBeInTheDocument();
      });
      it("show Sabado", () => {
        const { getByText } = wrapper;
        expect(getByText("Sabado")).toBeInTheDocument();
      });
      it("show Domingo", () => {
        const { getByText } = wrapper;
        expect(getByText("Domingo")).toBeInTheDocument();
      });
    });

    it("show placeholder: --:--", () => {
      const { getAllByText } = wrapper;
      expect(getAllByText("--:--")).toBeTruthy();
    });

    it("show button edit", () => {
      const { getAllByRole } = wrapper;
      expect(getAllByRole("button", "button", { name: "edit" }));
    });

    describe("when clicking the switch, edit and button done", () => {
      let todaySwitch;
      let editButton;
      let doneButton;
      beforeEach(() => {
        todaySwitch = wrapper.getAllByRole("checkbox")[getToday()];
        fireEvent.click(todaySwitch);
      });
      it("show user, hour and successful registration", () => {
        const { getByText } = wrapper;
        let hour = getHour();
        let user = getUserName();
        expect(getByText(hour)).toBeInTheDocument();
        expect(getByText(user)).toBeInTheDocument();
        expect(getByText("Registro agregado")).toBeInTheDocument();
      });

      it("show input text for manual register and button done", () => {
        const { getAllByRole } = wrapper;
        editButton = getAllByRole("button", "button", { name: "edit" })[
          getToday()
        ];
        fireEvent.click(editButton);
        expect(getAllByRole("textEdit"));
        expect(getAllByRole("button", "button", { name: "done" }));
      });

      it("show successful edit", () => {
        const { getByText, getAllByRole } = wrapper;
        fireEvent.click(editButton);
        doneButton = getAllByRole("button", "button", {
          name: "done",
        })[getToday()];
        fireEvent.click(doneButton);
        expect(getByText("Registro editado")).toBeInTheDocument();
      });
    });
  });
});
