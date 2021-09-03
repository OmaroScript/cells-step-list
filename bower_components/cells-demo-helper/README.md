![cells-demo-helper](cells-demo-helper.png)

# cells-demo-helper

 ![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg)
 ![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)

[Demo of component in Cells Catalog](https://catalogs.platform.bbva.com/cells)

`cells-demo-helper` allows to generate a demo page for multiple demo cases of a component.

It automatically populates a dropdown with all the available cases.
It also inserts the demo in a resizable iframe to ease showing responsive features of the component.

Finally, it places each demo case's code in the code area, so the final user can copy/paste it.

## Usage

`cells-demo-helper` expects to have one or more `cells-demo-case` instances inside it, each instance will be a 'demo case'.

The component will get the __content__ of each demo case, which must be wrapped in a `<template>` tag, and it will generate dynamically an iframe with the code inside each demo case's template.

__Important:__ the `template` that must be put as child of `cells-demo-case`, and which wraps all the code for the case, won't be passed to the iframe. So, don't use it for `dom-bind` purpose. You can add template tags with dom-bind inside this template tag.

__Important:__ all dependencies inside the iframe will be retrieved from the `<head>` tag of the page in which `cells-demo-helper` is used (that is, the demo html). 

Alternatively, you can specify which dependencies should be imported in the demo cases but not in the demo main page using 'rel="lazy-import"' instead of 'rel="import"' for them. This way, just the dependencies with 'lazy-import' will be used inside the demo cases.

If you want to use some component in the demo but that component is not necessary for the demo case, you can prevent it to be imported by adding the boolean attribute `no-import` to the `<link rel="import">`.

**Example**
```html
<link rel="import" href="../some-component-used-only-in-the-top-level-frame.html" no-import>
```

Each demo should have a `heading` attribute with the title of the case, and an optional `description` attribute with an extended text if necessary.

Example:
```html
<head>
...
  <link rel="import" href="mycomponent/mycomponent.html">
</head>
<body>
...
<cells-demo-helper>
  <cells-demo-case heading="Case 1">
    <template> <!-- do not use dom-bind in this template tag -->
      Demo content here
      <my-component>...</my-component>
    </template>
  </cells-demo-case>
  <cells-demo-case heading="Case 2" description="Optional description text">
    <template>
      Demo content here
      <my-component>...</my-component>
    </template>
  </cells-demo-case>
</cells-demo-helper>
...
</body>
```


## Resizable viewport

`cells-demo-helper` uses `cells-demo-resizable-viewport` to provide resizable features to the iframe, and will use its default values and properties. You can use the following attributes to customize how it behaves:

- __resolution__: initial selected resolution.
- __breakpoints__: object containing the viewport options, as describen in `cells-demo-resizable-viewport` docs.

Examples:
```html
<cells-demo-helper resolution="tablet">
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

```html
<cells-demo-helper resolution="Mobile" breakpoints='{
    "mobile": { "width": 360, "height": 640, "name": "Mobile" },
    "tablet": { "width": 768, "height": 1024, "name": "Tablet" }}'>
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

## i18n

Using the `i18n` attribute will insert a `cells-demo-lang-switcher` component. It will receive the default values of that component, although you can customize them using the attributes `langs` and `locales-path`. The lang selection will be propagated to the demo case iframe.

Examples:
```html
<cells-demo-helper i18n>
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

```html
<cells-demo-helper i18n langs='["en","es"]' locales-path="../locales">
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

## Events

You can pass an Array of event names to the `events` attribute, it will be the same than passing them to `cells-demo-event-toaster`, which will add event listeners for all of them.

So each time one of those events is fired inside the demo cases iframe, a paper-toast element will be fired with the event's information.

Example:
```html
<cells-demo-helper events='["my-component-event-open","my-component-event-close"]'>
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

## Extra Themes

Passing an `available-themes` attribute with an array of strings will generate a dropdown to add the specified themes to your demos. It will add an import to a component with that name (you must have the adequate devDependencies for that component in your bower.json), and will apply it to the demo, without the need to manually add an import in your demo HTML.

On demo page load, the default theme selected will be the first one of the available themes. If you want to set a different available theme as the demo default one, you can pass its name to the attribute `default-theme`.

Examples:
```html
<cells-demo-helper available-themes='["cells-coronita-theme","cells-banking-theme"]'>
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

```html
<cells-demo-helper available-themes='["cells-coronita-theme","cells-banking-theme"]' default-theme="cells-banking-theme">
  <cells-demo-case heading="Case 1">
    <template>
      Demo content here
    </template>
  </cells-demo-case>
</cells-demo-helper>
```

## Hiding header and sidebar for development purposes

The header and sidebar can be hidden by adding the attribute "hide-ui" to the component. This feature may be useful when you need to test the demo in a mobile device.

Example:

```html
<cells-demo-helper hide-ui></cells-demo-helper>
```

## Styling

The following custom properties and mixins are available for styling:

### Custom Properties
| Custom Property                | Selector | CSS Property                      | Value               |
| ------------------------------ | -------- | --------------------------------- | ------------------- |
| --cells-fontDefault            | :host    | font-family                       | Lato, sans-serif    |
| --cells-demo-helper-text-color | :host    | color                             | `No fallback value` |
| --cells-demo-helper-text-color | .tabs    | --cells-radio-tabs-color-selected | `No fallback value` |
### @apply
| Mixins                                       | Selector                                      | Value |
| -------------------------------------------- | --------------------------------------------- | ----- |
| --cells-demo-helper                          | :host                                         | {}    |
| --cells-demo-helper-ui-checkbox              | .ui-checkbox                                  | {}    |
| --cells-demo-helper-header                   | .header                                       | {}    |
| --cells-demo-helper-tabs                     | .tabs                                         | {}    |
| --cells-demo-helper-top                      | .top-row                                      | {}    |
| --cells-demo-helper-case-heading             | .heading                                      | {}    |
| --cells-demo-helper-case-heading-title       | .heading-title                                | {}    |
| --cells-demo-helper-case-heading-description | .heading-description                          | {}    |
| --cells-demo-helper-selectors                | .selectors                                    | {}    |
| --cells-demo-helper-dropdown                 | .dropdown                                     | {}    |
| --cells-demo-helper-main                     | .main                                         | {}    |
| --cells-demo-helper-resize-ui                | .resizer                                      | {}    |
| --cells-demo-helper-small-resize-ui          | @media (max-width: 767px) > .resizer          | {}    |
| --cells-demo-helper-iframe-container         | .iframe-container                             | {}    |
| --cells-demo-helper-small-iframe-container   | @media (max-width: 767px) > .iframe-container | {}    |
| --cells-demo-helper-medium-iframe-container  | @media (min-width: 768px) > .iframe-container | {}    |
| --cells-demo-helper-iframe                   | .iframe-container iframe                      | {}    |
| --cells-demo-helper-iframe-mobile-frame      | .iframe-container:before                      | {}    |
| --cells-demo-helper-overlay                  | .overlay                                      | {}    |
| --cells-demo-helper-overlay-visible          | .overlay.visible                              | {}    |
| --cells-demo-helper-code-wrapper             | .code-wrapper                                 | {}    |
| --cells-demo-helper-code-wrapper-visible     | .visible .code-wrapper                        | {}    |
| --cells-demo-helper-code-overlay-inner       | .overlay-inner                                | {}    |
| --cells-demo-helper-code-copy-button         | .copy-button                                  | {}    |
| --cells-demo-helper-code                     | .code                                         | {}    |
| --cells-demo-helper-code-pre                 | .code > pre                                   | {}    |}
