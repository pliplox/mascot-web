import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from '../SignUp';
import { renderWithProvider } from '../../../utils/testing';

// const mockHistoryPush = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockHistoryPush
//   })
// }));

describe('SignUp', () => {
  let testLocation;

  beforeEach(() =>
    renderWithProvider(
      <MemoryRouter initialEntries={['/signup']}>
        <SignUp />
        <Route
          path="*"
          render={({ location }) => {
            testLocation = location;
            return null;
          }}
        />
      </MemoryRouter>
    )
  );

  it('renders the correct elements', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Regístrate');
    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Registrarte')).toBeInTheDocument();
  });

  describe('when user set correct values', () => {
    it('redirects to fed correctly', () => {
      const userNameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');

      const userNameValue = 'username123';
      const emailValue = 'email@domain.cl';
      const passwordValue = 'awesome-password';

      userEvent.type(userNameInput, userNameValue);
      userEvent.type(emailInput, emailValue);
      userEvent.type(passwordInput, passwordValue);

      expect(userNameInput).toHaveValue(userNameValue);
      expect(emailInput).toHaveValue(emailValue);
      expect(passwordInput).toHaveValue(passwordValue);

      const signUpButton = screen.getByText('Registrarte');
      act(() => userEvent.click(signUpButton));
    });
  });

  describe('when user click on sign in link', () => {
    it('redirects to sign in', () => {
      const linkElement = screen.getByText('Ya tienes una cuenta? Ingresa aquí');
      act(() => userEvent.click(linkElement));
      expect(testLocation.pathname).toBe('/signin');
    });
  });
});
