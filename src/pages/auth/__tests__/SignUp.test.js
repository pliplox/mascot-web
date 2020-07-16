import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mascotapi from '../../../api/mascotapi';
import SignUp from '../SignUp';
import { renderWithProvider } from '../../../utils/testing';

// Mock axios instance to check requests made with axios and set responses
jest.mock('../../../api/mascotapi', () => ({
  post: jest.fn()
}));

describe('SignUp', () => {
  let testLocation;

  beforeEach(() => {
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
    );

    mascotapi.post.mockImplementation(() => Promise.resolve());
  });

  it('renders the correct elements', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Regístrate');
    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Registrarte')).toBeInTheDocument();
  });

  describe('when user set correct values', () => {
    const token = 'fakeToken';
    const userNameValue = 'username123';
    const emailValue = 'email@domain.cl';
    const passwordValue = 'awesome-password';

    beforeEach(() =>
      mascotapi.post.mockImplementation(
        () =>
          new Promise(resolve => {
            resolve({
              headers: { Authorization: token },
              status: 201,
              data: { email: emailValue, password: passwordValue }
            });
          })
      )
    );

    it('register the user correctly', async () => {
      const userNameInput = screen.getByPlaceholderText('Ingresa tu nombre de usuario');
      const emailInput = screen.getByPlaceholderText('Ingresa tu correo');
      const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');

      userEvent.type(userNameInput, userNameValue);
      userEvent.type(emailInput, emailValue);
      userEvent.type(passwordInput, passwordValue);

      expect(userNameInput).toHaveValue(userNameValue);
      expect(emailInput).toHaveValue(emailValue);
      expect(passwordInput).toHaveValue(passwordValue);

      const signUpButton = screen.getByText('Registrarte');
      act(() => userEvent.click(signUpButton));

      // test user signed up correctly
      await waitFor(() => {
        expect(mascotapi.post).toHaveBeenCalledWith(
          'signup',
          expect.objectContaining({
            name: userNameValue,
            email: emailValue,
            password: passwordValue
          })
        );
      });
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
