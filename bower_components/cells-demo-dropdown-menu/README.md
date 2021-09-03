# &lt;cells-demo-dropdown-menu&gt;

`<cells-demo-dropdown-menu>` applies Cells Platform styles to [cells-dropdown-menu](https://globaldevtools.bbva.com/bitbucket/projects/BGCM/repos/cells-dropdown-menu/browse). The component can be considered as a style wrapper.

**Note:** [cells-demos-ui](https://globaldevtools.bbva.com/bitbucket/projects/CEL/repos/cells-demos-ui/browse) is included in the component as own dependency (not as devDependency) because the component is meant to be used in _cells-demo-*_ components instead of applications.

Example:
```html
<cells-demo-dropdown-menu
  selected="{{selected}}"
  label="Some label"
  items='[{
    "name": "Item one",
    "value": "item-one"
  }, {
    "name": "Item two",
    "value": "item-two"
  }, {
    "name": "Item three",
    "value": "item-three"
  }]'>
</cells-demo-dropdown-menu>
```

## Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
:--- | :--- | :---
--cells-demo-dropdown-menu | Mixin applied to :host | {}
--cells-demo-dropdown-menu-dropdown | Mixin applied to dropdown | {}
--cells-demo-dropdown-menu-label | Mixin applied to label | {}
--cells-demo-menu-control-green | color for check icon | #1DFD92
