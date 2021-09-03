/**
 *
 * # cells-demo-helper
 *
 * ![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg)
 * ![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)
 *
 * [Demo of component in Cells Catalog](https://catalogs.platform.bbva.com/cells)
 *
 * `cells-demo-helper` allows to generate a demo page for multiple demo cases of a component.
 *
 * It automatically populates a dropdown with all the available cases.
 * It also inserts the demo in a resizable iframe to ease showing responsive features of the component.
 *
 * Finally, it places each demo case's code in the code area, so the final user can copy/paste it.
 *
 * ## Usage
 *
 * `cells-demo-helper` expects to have one or more `cells-demo-case` instances inside it, each instance will be a 'demo case'.
 *
 * The component will get the __content__ of each demo case, which must be wrapped in a `<template>` tag, and it will generate dynamically an iframe with the code inside each demo case's template.
 *
 * __Important:__ the `template` that must be put as child of `cells-demo-case`, and which wraps all the code for the case, won't be passed to the iframe. So, don't use it for `dom-bind` purpose. You can add template tags with dom-bind inside this template tag.
 *
 * __Important:__ all dependencies inside the iframe will be retrieved from the `<head>` tag of the page in which `cells-demo-helper` is used (that is, the demo html).
 *
 * Alternatively, you can specify which dependencies should be imported in the demo cases but not in the demo main page using 'rel="lazy-import"' instead of 'rel="import"' for them. This way, just the dependencies with 'lazy-import' will be used inside the demo cases.
 *
 * If you want to use some component in the demo but that component is not necessary for the demo case, you can prevent it to be imported by adding the boolean attribute `no-import` to the `<link rel="import">`.
 *
 * **Example**
 * ```html
 * <link rel="import" href="../some-component-used-only-in-the-top-level-frame.html" no-import>
 * ```
 *
 * Each demo should have a `heading` attribute with the title of the case, and an optional `description` attribute with an extended text if necessary.
 *
 * Example:
 * ```html
 * <head>
 * ...
 *   <link rel="import" href="mycomponent/mycomponent.html">
 * </head>
 * <body>
 * ...
 * <cells-demo-helper>
 *   <cells-demo-case heading="Case 1">
 *     <template> <!-- do not use dom-bind in this template tag -->
 *       Demo content here
 *       <my-component>...</my-component>
 *     </template>
 *   </cells-demo-case>
 *   <cells-demo-case heading="Case 2" description="Optional description text">
 *     <template>
 *       Demo content here
 *       <my-component>...</my-component>
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ...
 * </body>
 * ```
 *
 * ## Resizable viewport
 *
 * `cells-demo-helper` uses `cells-demo-resizable-viewport` to provide resizable features to the iframe, and will use its default values and properties. You can use the following attributes to customize how it behaves:
 *
 * - __resolution__: initial selected resolution.
 * - __breakpoints__: object containing the viewport options, as describen in `cells-demo-resizable-viewport` docs.
 *
 * Examples:
 * ```html
 * <cells-demo-helper resolution="tablet">
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ```html
 * <cells-demo-helper resolution="Mobile" breakpoints='{
 *     "mobile": { "width": 360, "height": 640, "name": "Mobile" },
 *     "tablet": { "width": 768, "height": 1024, "name": "Tablet" }}'>
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ## i18n
 *
 * Using the `i18n` attribute will insert a `cells-demo-lang-switcher` component. It will receive the default values of that component, although you can customize them using the attributes `langs` and `locales-path`. The lang selection will be propagated to the demo case iframe.
 *
 * Examples:
 * ```html
 * <cells-demo-helper i18n>
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ```html
 * <cells-demo-helper i18n langs='["en","es"]' locales-path="../locales">
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ## Events
 *
 * You can pass an Array of event names to the `events` attribute, it will be the same than passing them to `cells-demo-event-toaster`, which will add event listeners for all of them.
 *
 * So each time one of those events is fired inside the demo cases iframe, a paper-toast element will be fired with the event's information.
 *
 * Example:
 * ```html
 * <cells-demo-helper events='["my-component-event-open","my-component-event-close"]'>
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ## Extra Themes
 *
 * Passing an `available-themes` attribute with an array of strings will generate a dropdown to add the specified themes to your demos. It will add an import to a component with that name (you must have the adequate devDependencies for that component in your bower.json), and will apply it to the demo, without the need to manually add an import in your demo HTML.
 *
 * On demo page load, the default theme selected will be the first one of the available themes. If you want to set a different available theme as the demo default one, you can pass its name to the attribute `default-theme`.
 *
 * Examples:
 * ```html
 * <cells-demo-helper available-themes='["cells-coronita-theme","cells-banking-theme"]'>
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ```html
 * <cells-demo-helper available-themes='["cells-coronita-theme","cells-banking-theme"]' default-theme="cells-banking-theme">
 *   <cells-demo-case heading="Case 1">
 *     <template>
 *       Demo content here
 *     </template>
 *   </cells-demo-case>
 * </cells-demo-helper>
 * ```
 *
 * ## Hiding header and sidebar for development purposes
 *
 * The header and sidebar can be hidden by adding the attribute "hide-ui" to the component. This feature may be useful when you need to test the demo in a mobile device.
 *
 * Example:
 *
 * ```html
 * <cells-demo-helper hide-ui></cells-demo-helper>
 * ```
 *
 * ## Styling
 *
 * The following custom properties and mixins are available for styling:
 *
 * ### Custom Properties
 * | Custom Property                | Selector | CSS Property                      | Value               |
 * | ------------------------------ | -------- | --------------------------------- | ------------------- |
 * | --cells-fontDefault            | :host    | font-family                       | Lato, sans-serif    |
 * | --cells-demo-helper-text-color | :host    | color                             | `No fallback value` |
 * | --cells-demo-helper-text-color | .tabs    | --cells-radio-tabs-color-selected | `No fallback value` |
 * ### @apply
 * | Mixins                                       | Selector                                      | Value |
 * | -------------------------------------------- | --------------------------------------------- | ----- |
 * | --cells-demo-helper                          | :host                                         | {}    |
 * | --cells-demo-helper-ui-checkbox              | .ui-checkbox                                  | {}    |
 * | --cells-demo-helper-header                   | .header                                       | {}    |
 * | --cells-demo-helper-tabs                     | .tabs                                         | {}    |
 * | --cells-demo-helper-top                      | .top-row                                      | {}    |
 * | --cells-demo-helper-case-heading             | .heading                                      | {}    |
 * | --cells-demo-helper-case-heading-title       | .heading-title                                | {}    |
 * | --cells-demo-helper-case-heading-description | .heading-description                          | {}    |
 * | --cells-demo-helper-selectors                | .selectors                                    | {}    |
 * | --cells-demo-helper-dropdown                 | .dropdown                                     | {}    |
 * | --cells-demo-helper-main                     | .main                                         | {}    |
 * | --cells-demo-helper-resize-ui                | .resizer                                      | {}    |
 * | --cells-demo-helper-small-resize-ui          | @media (max-width: 767px) > .resizer          | {}    |
 * | --cells-demo-helper-iframe-container         | .iframe-container                             | {}    |
 * | --cells-demo-helper-small-iframe-container   | @media (max-width: 767px) > .iframe-container | {}    |
 * | --cells-demo-helper-medium-iframe-container  | @media (min-width: 768px) > .iframe-container | {}    |
 * | --cells-demo-helper-iframe                   | .iframe-container iframe                      | {}    |
 * | --cells-demo-helper-iframe-mobile-frame      | .iframe-container:before                      | {}    |
 * | --cells-demo-helper-overlay                  | .overlay                                      | {}    |
 * | --cells-demo-helper-overlay-visible          | .overlay.visible                              | {}    |
 * | --cells-demo-helper-code-wrapper             | .code-wrapper                                 | {}    |
 * | --cells-demo-helper-code-wrapper-visible     | .visible .code-wrapper                        | {}    |
 * | --cells-demo-helper-code-overlay-inner       | .overlay-inner                                | {}    |
 * | --cells-demo-helper-code-copy-button         | .copy-button                                  | {}    |
 * | --cells-demo-helper-code                     | .code                                         | {}    |
 * | --cells-demo-helper-code-pre                 | .code > pre                                   | {}    |
 *
 * @polymer
 * @customElement
 * @summary Showcases components demo cases, with multiple options such as i18n or resizable viewport.
 * @demo demo/index.html
 * @hero cells-demo-helper.png
 */
class CellsDemoHelper extends Polymer.Element {
  static get is() {
    return 'cells-demo-helper';
  }
  static get properties() {
    return {
      /**
      * Array with the demo cases
      */
      _cases: {
        type: Array,
      },

      /**
       * Current markdown code to show in code snippet bar
       */
      _markdown: {
        type: String,
        value: '',
      },

      /**
       * Current case title
       */
      _caseTitle: {
        type: String,
        value: '',
      },

      /**
      * Current case description
      */
      _description: {
        type: String,
        value: '',
      },

      /**
       * Whether the demo must show the lang switcher
       */
      i18n: {
        type: Boolean,
        value: false,
      },

      /**
       * Array of custom langs to pass to cells-lang-demo-switcher
       */
      langs: {
        type: Array,
      },

      /**
       * Current selected lang
       */
      _lang: {
        type: String,
        value: 'en',
        notify: true,
        observer: '_setIframeLang',
      },

      /**
       * Path of custom locales folder to pass to cells-lang-demo-switcher
       */
      localesPath: {
        type: String,
      },

      /**
       * Array of events which cells-demo-event-toaster should listen for
       */
      events: {
        type: Array,
      },

      /**
       * Default resolution key for the iframe
       */
      resolution: {
        type: String,
        value: 'mobile',
      },

      _resolution: {
        type: Object,
      },

      /**
       * Custom breakpoints for cells-demo-resizable-viewport
       */
      breakpoints: {
        type: Object,
      },

      /**
       * Default "no theme" option text
       */
      _noTheme: {
        type: String,
        value: 'standalone (no theme)',
      },

      /**
       * Additional available themes for the demo
       */
      availableThemes: {
        type: Array,
      },

      /**
       * Full list of themes used
       */
      _themes: {
        type: Array,
        computed: '_computedThemes(_noTheme, availableThemes)',
      },

      /**
       * Selected theme on page load
       */
      defaultTheme: {
        type: String,
        value: '',
      },

      /**
       * Index of the selected theme
       */
      selectedTheme: {
        type: Number,
        value: 0,
        notify: true,
      },

      /**
       * Stores current selected theme
       */
      _currentTheme: {
        type: String,
      },

      /**
       * Stores current iframe template
       */
      _tpl: {
        type: String,
      },

      /**
       * Index of the selected demo-case.
       */
      selected: {
        type: Number,
        value: 0,
        notify: true,
      },

      /**
       * Prevents current document head to be passed on to the iframe. Useful for testing purposes
       */
      _noHead: {
        type: Boolean,
        value: false,
      },

      /**
       * Allow to show multiple toasts simultaneously
       */
      multiToast: {
        type: Boolean,
        value: false,
      },

      _toastAlign: {
        type: String,
        value: 'bottom',
      },

      _toastPositionTarget: {
        type: Element,
      },

      _tabs: {
        type: Array,
        value: function() {
          return ['Preview', 'Code'];
        },
      },

      /**
       * Used to set a negative tabindex to focusable elements
       * when the code tab is active.
       */
      _tabindex: {
        type: Number,
      },

      _selectedTab: {
        type: Number,
        value: 0,
        notify: true,
        observer: '_selectedTabChanged',
      },

      /**
       * Set to true to hide all the UI elements except the preview for development purposes.
       */
      hideUi: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },

      /**
       * Used to show the spinner only the first time (not between demos).
       */
      _firstRender: {
        type: Boolean,
        value: true,
      },

      /**
       * Show console warnings about style modules not found in components (shared-styles).
       */
      showStyleModuleWarnings: {
        type: Boolean,
        value: false,
      },

      _polymerGlobalSettingsScript: {
        type: String,
        value: '',
      },
      _editorValue: {
        type: String,
        observer: '_updateDemo',
      },
    };
  }

  static get observers() {
    return [
      '_onSelectedCaseIndexChanged(selected, _cases)',
      '_onSelectedThemeIndexChanged(selectedTheme, _cases, _themes)',
      '_onDefaultThemeChanged(defaultTheme, _themes)',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    document.body.style.margin = 0;
    setTimeout(() => {
      this._setCasesDropdown();
    }, 1000);

    // change the toast position and position target if the component is inside an iframe (Catalog App)
    if (window !== top) {
      this._toastAlign = 'top';
      this._toastPositionTarget = this.$.main;
    }
  }

  _onSelectedCaseIndexChanged(index, cases) {
    if (!cases) {
      return;
    }
    this._editorValue = '';
    this._setIframe(cases[index]);
  }

  _onSelectedThemeIndexChanged(index, cases, themes) {
    if (!cases || !themes) {
      return;
    }
    this._currentTheme = themes[index].value;
    this._setIframe(cases[this.selected]);
  }

  _onDefaultThemeChanged(defaultTheme, themes) {
    if (!themes) {
      return;
    }

    let defaultThemeInThemes = themes.find(function(theme) {
      return theme.name === defaultTheme;
    });

    if (defaultThemeInThemes) {
      this.selectedTheme = themes.indexOf(defaultThemeInThemes);
    }
  }

  _isActiveTab(selectedTab, tabName) {
    return this._tabs[selectedTab] === tabName ? 'visible' : '';
  }

  _selectedTabChanged(tab) {
    // return false instead of zero to remove the attribute
    this._tabindex = tab === 1 ? -1 : false;
    let iframe = this.$.iframeContainer.querySelector('iframe');
    if (iframe) {
      iframe.setAttribute('tabindex', this._tabindex);
    }
    this._editorValue = this.$.editor.getValue();
  }

  _updateDemo(editorValue, previousValue) {
    if (!previousValue) {
      return;
    }

    this._setIframe(this._cases[this.selected]);
  }

  _computedThemes(theme, availableThemes) {
    if (!availableThemes) {
      return;
    }

    let group = availableThemes.slice();
    group.push(theme);

    return group.map(function(item) {
      return {
        name: item,
        value: item.trim().toLowerCase(),
      };
    });
  }

  /**
   * Returns the script of initial i18n values to insert in the iframe
   */
  _langAdder() {
    var langSet = '<script>'
      + 'window.I18nMsg = {};'
      + 'window.I18nMsg.lang = "' + this._lang + '";'
      + 'window.I18nMsg.url = "' + this.localesPath + '";'
      + '</script>';
    return langSet;
  }

  /**
   * Changes dinamically the lang attribute and i18n variables in the iframe
   * @param { String } lng lang code
   */
  _setIframeLang(lng) {
    if (this.i18n) {
      window.I18nMsg = window.I18nMsg || {};
    }
    let iframe = this.$.iframeContainer.querySelector('iframe');
    let localesPath = this.i18n ? window.I18nMsg.url : false;
    if (iframe) {
      iframe.contentDocument.querySelector('html').setAttribute('lang', lng);
      if (iframe.contentWindow.I18nMsg && localesPath) {
        iframe.contentWindow.I18nMsg.lang = lng;
        iframe.contentWindow.I18nMsg.url = localesPath;
      }
    }
  }

  /**
   * Populates cases array based on available cells-demo-case contents
   */
  _setCasesDropdown() {
    let shadyChildren = this.querySelectorAll('cells-demo-case');
    let result = [].map.call(shadyChildren, function(item) {
      return {
        name: item.heading,
        value: item,
      };
    });

    this._cases = result;
  }

  _getHeadForIframe() {
    let head = document.querySelector('head');
    let clone = head.cloneNode(true);
    let scripts = clone.querySelectorAll('script');
    for (let i = 0, len = scripts.length; i < len; i++) {
      let hasPolymerGlobalSettings = scripts[i].textContent.indexOf('window.Polymer') > -1;
      if (hasPolymerGlobalSettings) {
        if (parseFloat(Polymer.version) < 2) {
          this._polymerGlobalSettingsScript = `<script>${scripts[i].innerHTML}</script>`;
        }
        scripts[i].parentNode.removeChild(scripts[i]);
      }
      if (scripts[i].src.indexOf('webcomponents') > -1) {
        let preload = document.createElement('link');
        preload.href = scripts[i].src;
        preload.rel = 'preload';
        preload.as = 'script';
        scripts[i].parentNode.insertBefore(preload, scripts[i]);
        scripts[i].parentNode.removeChild(scripts[i]);
      }
    }
    let lazy = clone.querySelectorAll('link[rel="lazy-import"]');
    /* istanbul ignore else */
    if (lazy.length) {
      [].forEach.call(clone.querySelectorAll('link[rel="import"]'), function(imp) {
        if (clone.contains(imp)) {
          clone.removeChild(imp);
        }
      });
      [].forEach.call(lazy, function(imp) {
        imp.rel = 'import';
      });
    }
    [].forEach.call(clone.querySelectorAll('link[rel="import"]'), function(imp) {
      if (imp.getAttribute('href').indexOf('cells-demo-helper') > -1 || imp.hasAttribute('no-import')) {
        imp.rel = 'no-import';
      }
    });

    if (!this.showStyleModuleWarnings) {
      let firstImport = clone.querySelector('link[rel="import"]');
      let logUtilsImport = document.createElement('link');
      logUtilsImport.rel = 'import';
      logUtilsImport.href = '../../cells-log-utils/cells-log-utils.html';
      firstImport.parentNode.insertBefore(logUtilsImport, firstImport);
    }

    return clone.innerHTML;
  }

  /**
   * Generates iframe for selected case
   */
  _setIframe(elem) {
    this._cleanIframe();

    //this._generateMarkdown(elem.value);
    this._setCurrentCase(elem);

    let iframe = this._generateIframe(elem);
    this.$.iframeContainer.appendChild(iframe);

    // prevent accessing to document not created yet
    /* istanbul ignore else */
    if (!iframe.contentDocument) {
      return;
    }

    iframe.contentDocument.open();
    iframe.contentDocument.write(this._tpl);
    iframe.contentDocument.close();

    let onWebComponentsReady = function() {
      iframe.contentDocument.body.removeAttribute('unresolved');
      this._passEvents(iframe);
      if (this._firstRender) {
        this._firstRender = false;
        this.dispatchEvent(new CustomEvent('demo-loaded-complete', {
          bubbles: true,
          composed: true,
        }));
      }
    };

    iframe.contentDocument.addEventListener('WebComponentsReady', onWebComponentsReady.bind(this));
  }

  _setCurrentCase(elem) {
    this._caseTitle = elem.value.heading;
    this._description = elem.value.description;
    this._editorHtml = this._parseContent(this._getDemoCaseHtml(elem));
  }

  _getDemoCaseHtml(elem) {
    return this._editorValue || elem.value.getInner();
  }

  _generateIframe(elem) {
    this._iframeHead = this._iframeHead || this._getHeadForIframe();
    let head = this._noHead ? '' : /* istanbul ignore next */ this._iframeHead;
    let iframe = document.createElement('iframe');
    let langScript = this.i18n ? this._langAdder() : '';
    let themeImport = '';
    let themeName = '';
    let caseNameRaw = elem.name;
    let caseName = caseNameRaw.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toLowerCase();
    let headTag = langScript + head;

    iframe.addEventListener('load', function onLoad() {
      onLoad.webComponentsReadyLoaded = onLoad.webComponentsReadyLoaded || false;
      if (!onLoad.webComponentsReadyLoaded) {
        onLoad.webComponentsReadyLoaded = true;
        return;
      }

      // for testing purposes
      this.dispatchEvent(new CustomEvent('iframe-loaded', {
        bubbles: true,
        composed: true,
        detail: {},
      }));
    }.bind(this));

    if (this._currentTheme && this._currentTheme !== this._noTheme) {
      themeImport = '<link rel="import" href="../../' + this._currentTheme + '/' + this._currentTheme + '.html">';
      headTag = langScript + this._polymerGlobalSettingsScript + themeImport + head;
      themeName = this._currentTheme;
    }

    let classes = [caseName, themeName].join(' ');
    let bodyTag = '<body unresolved ontouchstart id="iframeBody" class="' + classes + '" onload="'
      + 'var d = document; d.getElementsByTagName(\'head\')[0].'
      + 'appendChild(d.createElement(\'script\')).src'
      + '=\'../../webcomponentsjs/webcomponents-lite.js\'"">';

    let html = [
      '<html lang="' + this._lang + '">',
      '<head>' + headTag + '</head>',
      bodyTag,

      //this._parseContent(elem.value.getInner()),
      this._getDemoCaseHtml(elem),
      '</body></html>',
    ].join('');

    this._tpl = html;
    return iframe;
  }

  /**
   * Removes existing iframes
   */
  _cleanIframe() {
    let old = this.$.iframeContainer.querySelector('iframe');
    if (old) {
      this.$.iframeContainer.removeChild(old);
      old = null;
    }
  }
  _parseContent(str) {
    return str
      .replace(/=""/g, '')
      .replace(/="{/g, '=\'{')
      .replace(/}"/g, '}\'')
      .replace(/="\[/g, '=\'[')
      .replace(/\]"/g, ']\'')
      .replace(/&quot;/g, '"')
      .replace(/='\[\[/g, '="[[')
      .replace(/\]\]'/g, ']]"')
      .replace(/='\{\{/g, '="{{')
      .replace(/\}\}'/g, '}}"');
  }


  /**
   * Creates listener for events inside iframe and propagates events firing to cells-demo-event-toaster
   */
  _passEvents(iframe) {
    if (this.events) {
      let eventToaster = this.shadowRoot.querySelector('#eventToaster');
      let events = this.events;
      iframe.contentDocument.eventParentDispatcher = function(name) {
        iframe.contentDocument.addEventListener(name, function(e) {
          let ev = new CustomEvent(name, e);
          eventToaster.dispatchEvent(ev);
        });
      };
      for (let i = 0; i < events.length; i++) {
        iframe.contentDocument.eventParentDispatcher(events[i]);
      }
    }
  }

  /**
   * Copies code snippet to clipboard
   */
  _copyToClipboard() {
    /* let snipRange = document.createRange();
    snipRange.selectNodeContents(this.$.code);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(snipRange);
    let result = false; */
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = this.$.editor.getValue();
    textarea.select();
    try {
      //result = document.execCommand('copy');
      document.execCommand('copy', false);
      this.$.copyButton.innerText = 'Copied!';
    } catch (err) {
      /* istanbul ignore next */ Polymer.Base._error(err);
      /* istanbul ignore next */ this.$.copyButton.innerText = 'Error';
    }
    textarea.remove();
    setTimeout(this._resetCopyButtonState.bind(this), 1000);

    //selection.removeAllRanges();
    //return result;
  }

  /**
   * Reset copy button text
   */
  _resetCopyButtonState() {
    this.$.copyButton.innerText = 'Copy';
  }

  _computeHeight(height) {
    return height !== undefined ? height : 640;
  }
}
window.customElements.define(CellsDemoHelper.is, CellsDemoHelper);
