# cells-demo-case

![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)

`<cells-demo-case>` is aimed to be used inside a `cells-demo-helper` component. It expect to have a `template` tag as content. Any content inside that template tag is exposed as a stringfied HTML in the `inner` property. It can also receive `heading` and `description` attributes, which will set a title and description for the demo case when used in the demo helper.

Example:

```html
<cells-demo-case heading="Demo title" description="Demo description">
	<template>
		Content here
	</template>
</cells-demo-case>
```

## Styling

This component does not expose any mixin nor custom property.
