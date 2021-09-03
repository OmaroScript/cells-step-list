# Changelog

## v10.1.10

```html
<script>
  window.Polymer = {
    dom: 'shadow', 
    lazyRegister: true, 
    useNativeCSSProperties: true
  };
</script>
```

Despite the tag, version **10.1.10 is a major version**.   
It has been tagged as minor to force the update in Cells components that are showcased in the Cells Catalog.

### Breaking changes

#### Removed properties

- `resizable-viewport-off`
- `remember-resizable-bars-preference`

#### Removed methods

- `setSelectorContent()`

#### Removed CSS classes

- `no-ui`. `hide-ui` attribute can be used instead.

#### Removed CSS vars and mixins

- `--cells-demo-helper-wrapper`
- `--cells-demo-helper-medium-wrapper`
- `--cells-demo-helper-sidebar-max-width`
- `--cells-demo-helper-sidebar`
- `--cells-demo-helper-medium-sidebar`
- `--cells-demo-helper-dragger`
- `--cells-demo-helper-dragger-button`
- `--cells-demo-helper-large-wrapper`
- `--cells-demo-helper-large-dragger`
- `--cells-demo-helper-large-sidebar`
- `--cells-demo-helper-large-sidebar-open`
- `--cells-demo-helper-large-code-wrapper`
- `--cells-demo-helper-sidebar-open-code-heading-button`
- `--cells-demo-helper-code-heading`
- `--cells-demo-helper-code-heading-title`
- `--cells-demo-helper-code-heading-button`
- `--cells-demo-helper-code-container`
- `--cells-demo-helper-dropdowns`
- `--cells-demo-helper-case-selector-wrapper`
- `--cells-demo-helper-case-selector`
- `--cells-demo-helper-paper-dropdown-menu-light`
- `--cells-demo-helper-paper-listbox`
- `--cells-demo-helper-paper-item`
- `--cells-demo-helper-lang-selector-wrapper`
- `--cells-demo-helper-lang-selector`
- `--cells-demo-helper-theme-selector-wrapper`
- `--cells-demo-helper-theme-selector`
- `--cells-demo-helper-resizable-switch-wrapper`
- `--cells-demo-helper-resizable-switch`
- `--cells-demo-helper-small-resizable-switch`
- `--cells-demo-helper-resize-ui-wrapper`
- `--cells-demo-helper-resize-ui-off`
- `--cells-demo-helper-iframe-wrapper`
- `--cells-demo-helper-iframe-container-off`
- `--cells-demo-helper-iframe-off`
- `--cells-demo-helper-medium-iframe-container-off`
