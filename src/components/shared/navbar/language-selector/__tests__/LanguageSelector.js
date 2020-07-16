import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelector from '../LanguageSelector';
import { renderWithProvider } from '../../../../../utils/testing';
import languages from '../../../../../utils/language';

describe('LanguageSelector', () => {
  beforeEach(() => {
    renderWithProvider(<LanguageSelector />);
  });

  it('renders the default (Spanish) language', () => {
    const [defaultLanguage] = languages.filter(({ code }) => code === 'es');
    const changeLanguageButton = screen.getByRole('button');

    expect(changeLanguageButton).toHaveTextContent(defaultLanguage.name);

    act(() => userEvent.click(changeLanguageButton)); // click to open menu

    const [englishLanguage] = languages.filter(({ code }) => code === 'en');
    const englishLanguageName = englishLanguage.name;
    const englishLanguageButton = screen.getByText(englishLanguageName);
    act(() => userEvent.click(englishLanguageButton)); // click to change language

    // expect language have changed to the new one (English)
    expect(changeLanguageButton).toHaveTextContent(englishLanguageName);
  });
});
