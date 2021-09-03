/**
 * @customElement
 * @summary Utility component to showcase components at different browser viewport sizes
 * @polymer
 * @demo demo/index.html
 * @extends {Polymer.Element}
 */
class cellsDemoResizableViewport extends Polymer.GestureEventListeners(Polymer.Element) {
  static get is() {
    return 'cells-demo-resizable-viewport';
  }

  static get properties() {
    return {
      /**
       * List of available breakpoints.
       * `height` property is optional.
       */
      breakpoints: {
        type: Object,
        observer: '_sortBreakpoints',
        value: function() {
          return {
            mobile: { width: 360, height: 640, name: 'Mobile' },
            tablet: { width: 768, height: 1024, name: 'Tablet' },
            desktop: { width: 1024, height: 800, name: 'Desktop' }
          };
        }
      },

      _sortedBreakpoints: Array,

      /**
       * Selected breakpoint.
       */
      selectedBreakpoint: {
        type: Object,
        notify: true,
        readOnly: true
      },

      /**
       * Selected breakpoint key.
       */
      selectedKey: {
        type: String,
        notify: true,
        value: 'mobile',
        observer: '_selectedKeyChanged'
      },

      /**
       * Used to change the reset button visibility.
       */
      _breakpointsChanged: {
        type: Boolean,
        value: false
      }
    }
  }

  /**
   * Restore the original breakpoints width.
   */
  reset() {
    this._sortBreakpoints(this.breakpoints);
    this._setSelectedBreakpoint(this._breakpoint);
    setTimeout(() => {
      this._breakpointsChanged = false;
    }, 100);
  }

  /**
   * Returns the selected breakpoint Object.
   */
  get _breakpoint() {
    return this._sortedBreakpoints.find(function(bp) {
      return bp.id === this.$.list.selected;
    }, this);
  }

  _selectedKeyChanged() {
    setTimeout(() => {
      this._setSelectedBreakpoint(this._breakpoint);
    }, 1)
  }

  /**
   * Sorts breakpoints from greater to lower width.
   */
  _sortBreakpoints(breakpoints) {
    var arr = [];

    Object.keys(breakpoints).forEach(function(key, i) {
      arr[i] = JSON.parse(JSON.stringify(breakpoints[key]));
      arr[i].id = key;
    });

    this._sortedBreakpoints = arr.sort(function(a, b) {
      return b.width - a.width;
    });
  }

  _onTrack(e) {
    var state = {
      'start': this._onTrackStart.bind(this),
      'track': this._onTrackX.bind(this),
      'end': this._onTrackEnd.bind(this)
    };

    state[e.detail.state](e);
  }

  /**
   * Sets _dragging to true if the dragging is horizontal.
   */
  _onTrackStart(e) {
    this._dragging = Math.abs(e.detail.dy) < Math.abs(e.detail.dx);
  }

  _onTrackX(e) {
    if (!this._dragging) {
      return;
    }

    this._width = this._width || parseInt(window.getComputedStyle(e.currentTarget).width);
    this.set(['_sortedBreakpoints', e.model.index, 'width'], this._width + (e.detail.dx * 2));
  }

  _onTrackEnd(e) {
    if (!this._dragging) {
      return;
    }

    // show reset button if any of the breakpoints has changed its original width
    if (e.model.item.width !== this.breakpoints[e.model.item.id].width) {
      this._breakpointsChanged = true;
    }

    this._updateSelected(e.model);
    this._dragging = false;
    this._width = null;
  }

  _updateSelected(item) {
    if (this.$.list.indexOf(this.$.list.selectedItem) === item.index) {
      this._setSelectedBreakpoint({});
      this._setSelectedBreakpoint(this._breakpoint);
    }
  }
}

customElements.define(cellsDemoResizableViewport.is, cellsDemoResizableViewport);
