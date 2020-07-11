import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Fed from "../Fed";
import { renderWithProvider, setWindowWidth } from "../../../utils/testing";
import { getToday, getHour, getUserName } from "../../../utils/fed";

jest.useFakeTimers();

describe("Fed", () => {
  let wrapper;
  let testLocation;
  beforeEach(() => {
    setWindowWidth(992); //md
    wrapper = renderWithProvider(
      <MemoryRouter initialEntries={["/alimentar"]}>
        <Fed />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    );
  });

  it("show Fed", () => {
    expect(wrapper).toBeTruthy();
  });

  describe("when fed is already render", () => {
    it("show title: Alimentacion", () => {
      expect(screen.getByText("Alimentacion")).toBeInTheDocument();
    });
    it("show subTitle: AM", () => {
      expect(screen.getByText("AM")).toBeInTheDocument();
    });
    it("show subTitle: PM", () => {
      expect(screen.getByText("PM")).toBeInTheDocument();
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
        expect(screen.getByText("Lunes")).toBeInTheDocument();
      });
      it("show Martes", () => {
        expect(screen.getByText("Martes")).toBeInTheDocument();
      });
      it("show Miercoles", () => {
        expect(screen.getByText("Miercoles")).toBeInTheDocument();
      });
      it("show Jueves", () => {
        expect(screen.getByText("Jueves")).toBeInTheDocument();
      });
      it("show Viernes", () => {
        expect(screen.getByText("Viernes")).toBeInTheDocument();
      });
      it("show Sabado", () => {
        expect(screen.getByText("Sabado")).toBeInTheDocument();
      });
      it("show Domingo", () => {
        expect(screen.getByText("Domingo")).toBeInTheDocument();
      });
    });

    it("show placeholder: --:--", () => {
      expect(screen.getAllByText("--:--")).toBeTruthy();
    });

    it("show button edit", () => {
      expect(screen.getAllByRole("button", "button", { name: "edit" }));
    });

    describe("when clicking the switch, edit and button done", () => {
      let todaySwitch;
      let editButton;
      let doneButton;
      beforeEach(() => {
        todaySwitch = screen.getAllByRole("checkbox")[getToday()];
        fireEvent.click(todaySwitch);
      });
      it("show user, hour and successful registration", () => {
        let hour = getHour();
        let user = getUserName();
        expect(screen.getByText(hour)).toBeInTheDocument();
        expect(screen.getByText(user)).toBeInTheDocument();
        expect(screen.getByText("Registro agregado")).toBeInTheDocument();
      });

      it("show input text for manual register and button done", () => {
        editButton = screen.getAllByRole("button", "button", { name: "edit" })[
          getToday()
        ];
        fireEvent.click(editButton);
        expect(screen.getAllByRole("textEdit"));
        expect(screen.getAllByRole("button", "button", { name: "done" }));
      });

      it("show successful edit", () => {
        fireEvent.click(editButton);
        doneButton = screen.getAllByRole("button", "button", {
          name: "done",
        })[getToday()];
        fireEvent.click(doneButton);
        expect(screen.getByText("Registro editado")).toBeInTheDocument();
      });
    });

    describe("when the user has no family group", () => {
      it("show message indicating no group and button to navigate ", () => {
        expect(
          screen.getByText(
            "Ups!... No tienes o no perteneces a un grupo familiar. Ve a crear uno!"
          )
        ).toBeInTheDocument();
        expect(screen.getByText("Ir a grupos")).toBeInTheDocument();
      });

      it("redirect to group", () => {
        const linkElement = screen.getByText("Ir a grupos");        
        fireEvent.click(linkElement)
        expect(testLocation.pathname).toBe("/grupos");
      });
    });
  });
});
