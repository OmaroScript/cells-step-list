# Cells Log Utils

> Utilities for window.console.

## Options

To customize options include the following script in the document where you import cellslogutils.js:

```html
<script>
window.CellsLogUtils = {
  clearStyleWarnings: false
};
</script>
```

Option | Description | Default
:--- | :--- | :---
| `clearStyleWarnings` | Prevents logging warnings about style modules not found in `<cells-component>-shared-styles` | `true`

