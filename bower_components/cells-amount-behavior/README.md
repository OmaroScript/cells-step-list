# cells-amount-behavior

![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg)
![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)

[Demo of component in Cells Catalog](https://catalogs.platform.bbva.com/cells)

`CellsBehaviors.AmountsBehavior` is a behavior to format amounts and currency codes

> Note. Implemented in [`cells-atom-amount`](https://catalogs.platform.bbva.com/cells)

```js
    class XCellsAmountBehaviorTest extends CellsBehaviors.AmountBehavior(Polymer.Element) {
      static get is() {
        return 'x-cells-amount-behavior-test';
      }

      static get properties() {
        return {};
      }
    }

    customElements.define(XCellsAmountBehaviorTest.is, XCellsAmountBehaviorTest);
```
`cells-amount-behavior` provide public method getFormattedAmount to get a custom formatted amount from a string value