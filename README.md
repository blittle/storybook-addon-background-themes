# Storybook Addon Background Themes

Storybook Addon Background Themes can be used to change themes inside the preview in [Storybook](https://storybook.js.org). The themes are simple sets of CSS custom properties.

## Installation

```sh
npm i -D storybook-addon-background-themes
```

## Configuration

Then, add following content to [`.storybook/main.js`](https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project):

```js
module.exports = {
  addons: ['storybook-addon-background-themes'],
};
```

## Usage

Add a `backgroundThemes` property to the configuration aparameters of
`preview.js`:


```js
export const parameters = {
  backgroundThemes: {
    base: {
      // CSS custom properties that will be applied for each theme
      "--some-base-custom-property": "blue",
    },
    themes: [
      {
        name: "Light",
        previewValue: "#000",
        properties: {
          "--some-custom-property-for-light-mode": "#fff"
        },
      },
      {
        name: "Dark",
        previewValue: "#000",
        properties: {
          "--some-custom-property-for-dark-mode": "#000"
        },
      },
    ],
  },
};
```
