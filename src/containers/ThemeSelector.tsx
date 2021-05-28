import React, { FunctionComponent, Fragment, useCallback, useMemo, memo } from 'react';
import memoize from 'memoizerific';

import { useParameter, useGlobals } from '@storybook/api';
import { logger } from '@storybook/client-logger';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';

import { PARAM_KEY as THEMES_PARAM_KEY } from '../constants';
import { ColorIcon } from '../components/ColorIcon';
import { ThemeSelectorItem, Theme, ThemesParameter, GlobalState } from '../types';
import { getThemeByName } from '../helpers';

const createThemeSelectorItem = memoize(1000)(
  (
    id: string | null,
    name: string,
    value: string,
    hasSwatch: boolean | null,
    change: (arg: { selected: string; name: string }) => void,
    active: boolean
  ): ThemeSelectorItem => ({
    id: id || name,
    title: name,
    onClick: () => {
      change({ selected: name, name });
    },
    value,
    right: hasSwatch ? <ColorIcon background={value} /> : undefined,
    active,
  })
);

const getDisplayedItems = memoize(10)(
  (
    themes: Theme[],
    selectedTheme: Theme | null,
    change: (arg: { selected: string; name: string }) => void
  ) => {
    const themeSelectorItems = themes.map(({ name, previewValue }) =>
      createThemeSelectorItem(
        null,
        name,
        previewValue,
        true,
        change,
        name === (selectedTheme && selectedTheme.name)
      )
    );

    return themeSelectorItems;
  }
);

const DEFAULT_THEMES_CONFIG: ThemesParameter = {
  default: undefined,
  disable: true,
  themes: [],
  base: {},
};

export const ThemeSelector: FunctionComponent = memo(() => {
  const themesConfig = useParameter<ThemesParameter>(
    THEMES_PARAM_KEY,
    DEFAULT_THEMES_CONFIG
  );

  const [globals, updateGlobals] = useGlobals();

  const selectedThemeName = globals[THEMES_PARAM_KEY] ? globals[THEMES_PARAM_KEY].value : '';

  const selectedTheme = useMemo(() => {
    return getThemeByName(
      selectedThemeName,
      themesConfig.themes,
      themesConfig.default || ""
    );
  }, [themesConfig, selectedThemeName]);

  const onThemeChange = useCallback(
    (value: string) => {
      updateGlobals({ [THEMES_PARAM_KEY]: { ...globals[THEMES_PARAM_KEY], value } });
    },
    [themesConfig, globals, updateGlobals]
  );

  if (themesConfig.disable) {
    return null;
  }

  return (
    <Fragment>
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnClick
        tooltip={({ onHide }) => {
          return (
            <TooltipLinkList
              links={getDisplayedItems(
                themesConfig.themes,
                selectedTheme,
                ({ selected }: GlobalState) => {
                  if (!selectedTheme || (selectedTheme.name !== selected)) {
                    onThemeChange(selected || "");
                  }
                  onHide();
                }
              )}
            />
          );
        }}
      >
        <IconButton
          key="background"
          title="Change the theme within the preview"
          active={!!selectedTheme}
        >
          <Icons icon="photo" />
        </IconButton>
      </WithTooltip>
    </Fragment>
  );
});
