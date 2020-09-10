import React from 'react';
import { fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

import { renderWithProvider, tokenMock } from '../../../../utils/testing';

let wrapper;

describe('Navbar', () => {
  it('show render navbar', () => {
    expect(renderWithProvider(<Navbar />));
  });

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('tokenId', tokenMock());
    wrapper = renderWithProvider(<Navbar />);
  });

  it('show the app title', () => {
    const { getByText } = wrapper;
    expect(getByText('MascotApp')).toBeInTheDocument();
  });

  it('show the icon profile', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('icon-profile')).toBeInTheDocument();
  });

  it('show open profile menu', () => {
    const { getByTestId, getByText } = wrapper;
    fireEvent.click(getByTestId('icon-profile'));
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('My account')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('show the icon drawer', () => {
    const { getByTestId } = wrapper;
    expect(getByTestId('drawer')).toBeInTheDocument();
  });

  describe('When drawer is clicked', () => {
    let drawerSettings;
    beforeEach(() => {
      fireEvent.click(wrapper.getByTestId('drawer'));
      drawerSettings = wrapper.getByText('Configuracion');
    });

    it('shows sideBar elements', () => {
      const { getByText } = wrapper;

      expect(getByText('Alimentar')).toBeInTheDocument();
      expect(getByText('Grupo')).toBeInTheDocument();
      expect(drawerSettings).toBeInTheDocument();
    });

    describe('When drawer settings is clicked', () => {
      beforeEach(() => {
        fireEvent.click(drawerSettings);
      });
      it('show drawer settings', () => {
        const { getByText } = wrapper;
        expect(getByText('TimeZone')).toBeInTheDocument();
      });
    });
  });

  describe('When user is not signed in', () => {
    localStorage.clear();

    it('does not show the profile icon ', () => {
      const iconProfile = wrapper.queryByText('icon-profile');
      expect(iconProfile).not.toBeInTheDocument();
    });

    it('does not show the drawer icon', () => {
      const drawer = wrapper.queryByText('drawer');
      expect(drawer).not.toBeInTheDocument();
    });
  });
});
