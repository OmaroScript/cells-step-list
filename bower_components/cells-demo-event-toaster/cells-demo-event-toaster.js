/**
 * 
 *
 * ![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg) ![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)
 *
 * [Demo of component in Cells Catalog](https://catalogs.platform.bbva.com/cells)
 *
 * # cells-demo-event-toaster
 *
 * `<cells-demo-event-toaster>` listens to a list of events and opens a `paper-toast` element when those events are triggered.ç
 *
 * In case it has a payload, it will also print it.
 *
 * Example:
 *
 * ```html
 * <cells-demo-event-toaster events="[[eventsArray]]"></cells-demo-event-toaster>
 * ```
 *
 * ## Styling
 *
 * The class `full-width` can be used to expand the toast to the full viewport width.
 *
 *| Custom property                          | Description                                | Default |
 *|:-----------------------------------------|:-------------------------------------------|:-------:|
 *| --cells-demo-event-toaster               | empty mixin for :host                      | {}      |
 *| --cells-demo-event-toaster-highlight     | empty mixin for toaster highlighted texts  | {}      |
 *| --cells-demo-event-toaster-vertical-top  | margin top in vertical align top           | 160px   |
 *
 * @polymer
 * @customElement
 * @summary Utility component to showcase components at different browser viewport sizes
 * @extends {Polymer.Element}
 * @demo demo/index.html
 * @hero cells-demo-event-toaster.png
 */
class cellsDemoEventToaster extends Polymer.Element {
  static get is() {
    return 'cells-demo-event-toaster';
  }

  static get properties() {
    return {
      /**
       * An array of Strings (names of the events)
       *
       * ```js
       * [ 'open-component', 'close-component', 'do-something' ]
       * ```
       */
      events: {
        type: Array,
        observer: '_eventsChanged'
      },

      _events: {
        type: Array,
        computed: '_computeEvents(events)'
      },

      /**
       * Duration of the paper-toast.
       */
      duration: {
        type: Number,
        value: 4000
      },

      /**
       * Sets toast duration to 0 (infinite) if multiple toast are allowed.
       */
      _duration: {
        type: Number,
        computed: '_computeDuration(duration, multiple)'
      },

      /**
       * Toast status.
       */
      opened: {
        type: Boolean,
        value: false
      },

      /**
       * Allow multiple toast to be visible at the same time.
       */
      multiple: {
        type: Boolean,
        value: false
      },
      /**
       * set the position of toast in vertical align the possible values is top or bottom
       */
      verticalAlign: {
        type: String,
        value: 'bottom'
      },

      /**
       * The element that should be used to position the element. If not set, it will default to the parent node.
       */
      positionTarget: {
        type: Element
      }
    };
  }

  _eventsChanged(events) {
    events.forEach(event => window.addEventListener(event, this._setToast.bind(this)));
  }

  _computeEvents(events) {
    return events.map(event => {
      return {
        name: event,
        opened: false,
        payload: false,
        timeout: null,
        order: 0
      };
    });
  }

  _computeDuration(duration, multiple) {
    return multiple ? 0 : duration;
  }

  _setToast(e) {
    var item = this._events.find(event => event.name === e.type);
    var index = this._events.indexOf(item);

    this.set(['_events', index, 'opened'], true);
    this.set(['_events', index, 'payload'], this._setEventPayload(e));
    this._openToast(item);
    window.removeEventListener(e.type, this._openToast.bind(this));
  }

  _openToast(item) {
    if (!this.multiple && this.$.toast.opened) {
      this.$.toast.cancel();
      this.set(['_events', this._events.indexOf(item), 'opened'], true);
    }

    if (this.multiple) {
      this._resetOpenedState(item);
      this._setOrder(item);
    }

    this.$.toast.refit();
    this.$.toast.open();
  }

  _closeToast() {
    this.$.toast.close();
  }

  _resetOpenedState(item) {
    var index = this._events.indexOf(item);

    var asyncTask = setTimeout(() => {
      this.set(['_events', index, 'opened'], false);
    }, this.duration);

    // save the async reference to cancel it later when the toast is closed
    this.set(['_events', index, 'timeout'], asyncTask);
  }

  /**
   * Order items using "order" CSS property.
   * Give the highest value (events.length) to the last opened toast and decrease
   * the order of other previously opened toasts by 1.
   * We are using flex-direction: column-reverse, so the order value has to be the highest to appear
   * at the beginning.
   */
  _setOrder(item) {
    this._events.forEach((event, index) => {
      if (event.order > 0) {
        this.set(['_events', index, 'order'], event.order - 1);
      }
    });

    this.set(['_events', this._events.indexOf(item), 'order'], this._events.length);
  }

  _setOpenedState(e) {
    if (!this._events) {
      return;
    }

    if (e.detail.value === false) {
      this._events.forEach((event, index) => {
        this.set(['_events', index, 'opened'], false);
        clearTimeout(event.timeout);
      });
    }
  }

  _setEventPayload(e) {
    if (e.detail === null || e.detail === undefined) {
      return false;
    }

    var isStringifiable = true;

    try {
      JSON.stringify(e.detail);
    } catch (er) {
      isStringifiable = false;
    }

    if (typeof e.detail.nodeName === 'string') {
      console.info('[cells-demo-event-toaster]: Payload of ' + e.type, e.detail);
      return '[HTMLElement] ' + e.detail.nodeName + ' (more info in console)';
    }

    if (!isStringifiable) {
      console.info('[cells-demo-event-toaster]: Payload of ' + e.type, e.detail);
      return 'Payload couldn`t be stringifiable (payload info in console)';
    }

    if (JSON.stringify(e.detail) !== '{}') {
      return JSON.stringify(e.detail);
    }

    return false;
  }

}

customElements.define(cellsDemoEventToaster.is, cellsDemoEventToaster);
