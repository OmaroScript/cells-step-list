/**
 * # cells-demo-case
 *
 * ![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)
 *
 * `<cells-demo-case>` is aimed to be used inside a `cells-demo-helper` component. It expect to have a `template` tag as content. Any content inside that template tag is exposed as a stringfied HTML in the `inner` property. It can also receive `heading` and `description` attributes, which will set a title and description for the demo case when used in the demo helper.
 *
 * Example:
 *
 * ```html
 * <cells-demo-case heading="Demo title" description="Demo description">
 * 	<template>
 * 		Content here
 * 	</template>
 * </cells-demo-case>
 * ```
 *
 * ## Styling
 *
 * This component does not expose any mixin nor custom property.
 *
 * @polymer
 * @customElement
 * @summary Exposes the HTML of component demo cases for cells-demo-helper
 * @extends {Polymer.Element}
 */
class cellsDemoCase extends Polymer.Element {
  static get is() {
    return 'cells-demo-case';
  }

  static get properties() {
    return {
      /**
       * Stores the component content's HTML as a string
       */
      inner: {
        type: String
      },

      /**
       * Title of the demo case
       */
      heading: {
        type: String
      },

      /**
       * Description of the demo case
       */
      description: {
        type: String
      }
    }
  }

  get inner() {
    return this.querySelectorAll('template')[ 0 ].innerHTML;
  }

  /**
   * Returns the current innerHTML of the template tag in the content
   */
  getInner() {
    return this.inner;
  }

}
customElements.define(cellsDemoCase.is, cellsDemoCase);