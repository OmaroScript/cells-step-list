/**
 * @customElement
 * @summary Applies cells-platform styles to cells-dropdown-menu
 * @polymer
 * @demo demo/index.html
 * @extends {Polymer.Element}
 */
class cellsDemoDropdownMenu extends Polymer.Element {
  static get is() {
    return 'cells-demo-dropdown-menu';
  }

  static get properties() {
    return {
      /**
       * Dropdown items.
       * [{
       *   name: 'Item label',
       *   value: 'some-value'
       * }]
       */
      items: {
        type: Array
      },

      /**
       * Text over dropdown.
       */
      label: {
        type: String
      },

      /**
       * Selected dropdown index.
       */
      selected: {
        type: Number,
        value: 0,
        notify: true
      },

      /**
       * Icon for the selected dropdown item.
       */
      iconCheck: {
        type: String,
        value: 'cdui:check'
      },

      /**
       * Icon for the open / close state.
       * The same icon is used for both states with a CSS transformation.
       */
      iconOpen: {
        type: String,
        value: 'cdui:arrow-down'
      },

      _uniqueID: {
        type: Number,
        value: function() {
          return new Date().valueOf();
        }
      }
    };
  }
}
customElements.define(cellsDemoDropdownMenu.is, cellsDemoDropdownMenu);
