import { StoryFn as StoryFunction, StoryContext, useMemo, useEffect } from '@storybook/addons';

import { PARAM_KEY as THEMES_PARAMS_KEY } from '../constants';
import { clearStyles, addThemeStyles, getThemeByName, getStylesFromThemeProperties } from '../helpers';

export const withTheme = (StoryFn: StoryFunction, context: StoryContext) => {
  const { globals, parameters } = context;
  const selectedThemeName = globals[THEMES_PARAMS_KEY] ? globals[THEMES_PARAMS_KEY].value : '';
  const themesConfig = parameters[THEMES_PARAMS_KEY];

  const selectedTheme = useMemo(() => {
    return getThemeByName(
      selectedThemeName,
      themesConfig.themes,
      themesConfig.default
    );
  }, [themesConfig, selectedThemeName]);

  const selector =
    context.viewMode === 'docs' ? `#anchor--${context.id} .docs-story` : '.sb-show-main';

  const themeStyles = useMemo(() => {
    return `
      ${selector} {
        ${getStylesFromThemeProperties(themesConfig.base)}
        ${selectedTheme ? getStylesFromThemeProperties(selectedTheme.properties) : ''}
      }
    `;
  }, [selectedTheme, selector, themesConfig]);

  useEffect(() => {
    const selectorId =
      context.viewMode === 'docs'
        ? `addon-background-themes-docs-${context.id}`
        : `addon-background-themes-color`;

    addThemeStyles(
      selectorId,
      themeStyles,
      context.viewMode === 'docs' ? context.id : ""
    );
  }, [themeStyles, context]);

  return StoryFn();
};
