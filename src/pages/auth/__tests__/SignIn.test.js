import React from 'react';
import { renderWithProvider } from '../../../utils/testing';
import { MemoryRouter, Route } from 'react-router-dom';
import SignIn from '../SignIn';
import mascotapi from '../../../api/mascotapi';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../api/mascotapi', () => ({
  post: jest.fn()
}));

describe('SignIn', () => {
  let testLocation;
  beforeEach(() => {
    renderWithProvider(
      <MemoryRouter initialEntries={['/signin']}>
        <SignIn />
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

  it('renders correctly', () => {
    expect(screen.getByText('signIn.title')).toBeInTheDocument();
    expect(screen.getByText('signIn.labels.email')).toBeInTheDocument();
    expect(screen.getByText('signIn.labels.password')).toBeInTheDocument();
    expect(screen.getByText('signIn.actions.signIn')).toBeInTheDocument();
  });

  describe('when user set valid data', () => {
    const token = 'fakeToken';
    const emailValue = 'email@domain.cl';
    const passwordValue = 'awesome-password';

    beforeEach(() =>
      mascotapi.post.mockImplementation(
        () =>
          new Promise(resolve => {
            resolve({
              headers: { Authorization: token },
              status: 200,
              data: { email: emailValue, password: passwordValue }
            });
          })
      )
    );

    it('sign in correctly', async () => {
      const emailInput = screen.getByPlaceholderText('signIn.placeholders.email');
      const passwordInput = screen.getByPlaceholderText('signIn.placeholders.password');

      userEvent.type(emailInput, emailValue);
      userEvent.type(passwordInput, passwordValue);

      expect(emailInput).toHaveValue(emailValue);
      expect(passwordInput).toHaveValue(passwordValue);

      const signInButton = screen.getByText('signIn.actions.signIn');
      act(() => userEvent.click(signInButton));

      await waitFor(() => {
        expect(mascotapi.post).toHaveBeenCalledWith(
          'signin',
          expect.objectContaining({
            email: emailValue,
            password: passwordValue
          })
        );
      });
    });
  });

  describe('when user click on link', () => {
    // don't exist page yet
    // it('exist link forgot password', () => {
    //     expect(screen.getByText('¿Se te olvidó tu contraseña?')).toBeInTheDocument();
    // });

    it('redirects to sign up', () => {
      const linkElement = screen.getByText('signIn.actions.goToSignUp');
      act(() => userEvent.click(linkElement));
      expect(testLocation.pathname).toBe('/signup');
    });
  });
});
