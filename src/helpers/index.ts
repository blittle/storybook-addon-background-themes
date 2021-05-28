import global from 'global';
import dedent from 'ts-dedent';

import { logger } from '@storybook/client-logger';

import { Theme, StyleProperties } from '../types';

const { document } = global;

export const getThemeByName = (
  currentSelectedThemeName: string,
  themes: Theme[] = [],
  defaultName: string
): Theme | null => {
  let currentTheme = themes.find((theme) => theme.name === currentSelectedThemeName);

  if (currentTheme) {
    return currentTheme;
  }

  const defaultTheme = themes.find((theme) => theme.name === defaultName);

  if (defaultTheme) {
    return defaultTheme;
  }

  if (defaultName) {
    const availableThemes = themes.map((theme) => theme.name).join(', ');
    logger.warn(
      dedent`
        Backgrounds Theme Addon: could not find the default color "${defaultName}".
        These are the available colors for your story based on your configuration:
        ${availableThemes}.
      `
    );
  }

  return null;
};

export const clearStyles = (selector: string | string[]) => {
  const selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach(clearStyle);
};

const clearStyle = (selector: string) => {
  const element = document.getElementById(selector) as HTMLElement;
  if (element && element.parentElement) {
    element.parentElement.removeChild(element);
  }
};

export const addGridStyle = (selector: string, css: string) => {
  const existingStyle = document.getElementById(selector) as HTMLElement;
  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = document.createElement('style') as HTMLElement;
    style.setAttribute('id', selector);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};

export const addThemeStyles = (selector: string, css: string, storyId: string) => {
  const existingStyle = document.getElementById(selector) as HTMLElement;
  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = document.createElement('style') as HTMLElement;
    style.setAttribute('id', selector);
    style.innerHTML = css;

    document.head.appendChild(style);
  }
};

export function getStylesFromThemeProperties(themeProperties: StyleProperties): string {
    return Object.keys(themeProperties).reduce((styles, prop) => {
        styles += `${prop}: ${themeProperties[prop]};\n`;
        return styles;
    }, '');
}
