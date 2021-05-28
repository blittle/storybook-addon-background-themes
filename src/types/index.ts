import { ReactElement } from 'react';

export interface StyleProperties {
    [key: string]: string | undefined;
};

export interface GlobalState {
  name: string | undefined;
  selected: string | undefined;
}

export interface ThemeSelectorItem {
  id: string;
  title: string;
  onClick: () => void;
  value: string;
  active: boolean;
  right?: ReactElement;
}

export interface Theme {
  name: string;
  previewValue: string;
  properties: StyleProperties;
}

export interface ThemesParameter {
  default?: string;
  disable?: boolean;
  themes: Theme[];
  base: Theme | {};
}

export interface BackgroundThemesConfig {
  themes: Theme[] | null;
  selectedThemeName: string | null;
  defaultThemeName: string | null;
  disable: boolean;
}
