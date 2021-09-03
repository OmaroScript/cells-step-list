# cells-sass

[![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg)](https://catalogs.platform.bbva.com/cells/)

Brief set of functions and mixins which help in the development of the components' SCSS.

* **main**
    * mixins
    * utils
    * breakpoint


# mixins
Focused in typography, reset and accessibility.

## Available mixins and functions

### function `rem()`

Converts pixels to rems.

Usage:

```
font-size: rem(14px);
```

### function `calcWithSpacer($finalValue, $customPropertyName, $customPropertyFallbackValue)`

Returns a CSS calc function with a custom CSS property with its fallback value multiplied by a number.

**Example output:**

```css
calc(var(--bbva-global-spacer, 0.5rem) * 2)
```

**Params:**

- `$finalValue` Desired value with or without unit (px)
- `$customPropertyName` Name of the custom CSS property. Default: `--bbva-global-spacer`
- `$customPropertyFallbackValue` Fallback value (unitless) of the custom CSS property. Default: 8


**How to override the CSS custom property name and fallback value**

Create a new function inside your component scss that calls this function with the desired params.

Example:
```scss
@function custom($finalValue) {
  @return calcWithSpacer($finalValue, --my-custom-property-name, 10);
}
```

Using it (default function):
```scss
.selector {
  padding: calcWithSpacer(16px);
}
```

Using it (custom function):
```scss
.selector {
  padding: custom(20px)
}
```

### mixin `clearfix`

Clears floated elements in a parent container.

Usage:

```
.parent { @include clearfix; }
.parent .child { float: left; }
```

### mixin `visuallyhidden`

Hides on-screen elements without hiding them to screen readers.
We recommend to apply this mixin to classes named `visuallyhidden` or `sr-only`.

Usage:

```
.visuallyhidden {
  @include visuallyhidden;
}
```

### mixin `ellipsis`

Truncates text adding an ellipsis.

Usage:

```
.ellipsis { @include ellipsis; }
```

### mixin `list-unstyled`

Removes margin, padding and list-style. This mixin should be applied to `<ul>` or `<ol>` elements.

Usage:

```
ul { @include list-unstyled; }
```

### mixin `reset`

Resets margin and padding to the elements passed as param.

Usage:

```
@include reset(h1, h2, p, blockquote, "ul.my-class");
```

### mixin `reset-user-select`

Resets user-select property to its initial value to allow text selection in some elements.

Usage:

```
.selectable-element { @include reset-user-select; }
```

### mixin `bg-fractals`

Generates fractal background for element through multiple background images with 10% opacity. Blend mode of images is "multiply" by default

Usage:

```
@include bg-fractals(#004481)
```

# breakpoint
* **mobile first** `640px`
* **medium screens** `641px`
* **large screens** `1025px`
* **xlarge screens** `1441px`
* **xxlarge screens** `1921px`
* **medium screens only** `641 - 1024`
* **large screens only** `1025 -1440`
* **xxlarge screens only** `1441 -1920`
