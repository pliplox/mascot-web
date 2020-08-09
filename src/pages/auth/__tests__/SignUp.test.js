import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reactGoogleLogin from 'react-google-login';
import mascotapi from '../../../api/mascotapi';
import SignUp from '../SignUp';
import { renderWithProvider } from '../../../utils/testing';

// Mock axios instance to check requests made with axios and set responses
jest.mock('../../../api/mascotapi', () => ({
  post: jest.fn()
}));

//  Mock all react google login to check if it is called
jest.mock('react-google-login', () => ({
  useGoogleLogin: jest.fn(() => {
    return { signIn: jest.fn(), loaded: true };
  })
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
    expect(screen.getByRole('heading')).toHaveTextContent('signUp.title');
    expect(screen.getByText('signUp.labels.userName')).toBeInTheDocument();
    expect(screen.getByText('signUp.labels.email')).toBeInTheDocument();
    expect(screen.getByText('signUp.labels.password')).toBeInTheDocument();
    expect(screen.getByText('signUp.title')).toBeInTheDocument();
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
      const userNameInput = screen.getByPlaceholderText('signUp.placeholders.userName');
      const emailInput = screen.getByPlaceholderText('signUp.placeholders.email');
      const passwordInput = screen.getByPlaceholderText('signUp.placeholders.password');

      userEvent.type(userNameInput, userNameValue);
      userEvent.type(emailInput, emailValue);
      userEvent.type(passwordInput, passwordValue);

      expect(userNameInput).toHaveValue(userNameValue);
      expect(emailInput).toHaveValue(emailValue);
      expect(passwordInput).toHaveValue(passwordValue);

      const signUpButton = screen.getByText('signUp.actions.signUp');
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
      const linkElement = screen.getByText('signUp.actions.goToSignIn');
      act(() => userEvent.click(linkElement));
      expect(testLocation.pathname).toBe('/signin');
    });
  });

  describe('when user clicks on sign in with google', () => {
    it('calls google sign in hook', async () => {
      const googleButton = screen.getByText('auth.actions.signInGoogle');
      act(() => userEvent.click(googleButton));
      expect(reactGoogleLogin.useGoogleLogin).toHaveBeenCalled();
    });
  });
});
