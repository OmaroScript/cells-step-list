# `cells-sass` changelog

# v2.0.0 (2016-11-07)
---

- `_utils.scss` has been removed, instead the Cells component generator includes in the `.scss` of the component those rules.
  - Although with the variant that in the `font-family` property's custom variable, use `sans-serif` instead of `--fonDefault` as fallback
    ```
    /* Remove */
    font-family: var(--cells-fontDefault, --fontDefault);

    /* Include */
    font-family: var(--cells-fontDefault, sans-serif);
    ```
- The needed code for a quick migration would be including this in the `.scss` of the component _(and serving it with `cells-cli` in order to generate the new styles)_
  ```css
  :host{
    display: block;
    font-family: var(--cells-fontDefault, sans-serif);
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  ```
