(function(window) {
  'use strict';

  function _clearStyleWarnings(fn) {
    return function(first, second, ...rest) {
      if (first.match('Could not find style data') && second.match('-shared-styles')) {
        return;
      }

      fn.call(this, first, second, ...rest);
    };
  }

  /**
   * CellsLogUtils
   * @param  {Boolean} options.clearStyleWarnings Prevents warns in console about style modules not found in components (<component-name>-shared-styles)
   */
  function init({clearStyleWarnings = true}) {
    if (clearStyleWarnings) {
      console.warn = _clearStyleWarnings(console.warn);
    }
  }

  window.CellsLogUtils = window.CellsLogUtils || {};
  init(window.CellsLogUtils);
}(window));
