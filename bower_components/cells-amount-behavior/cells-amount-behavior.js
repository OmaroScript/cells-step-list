/**
 * Separate fractional from integer according to document language.
 *
 * WARNING: uses non-standard lowercase language strings to prevent errors.
 * You should follow ISO-3166-1 and write the region part of your language in uppercase letters
 * (es-MX, es-CL, ...)
 */
const separators = {
  'es': ',',
  'es-us': '.',
  'en': '.',
  'en-us': '.',
  'en-uy': ',',
  'es-mx': '.',
  'es-pe': '.',
  'es-cl': '.',
  'es-uy': ',',
  'es-ar': ','
};

/**
 * Group hundreds according to document language.
 *
 * WARNING: uses non-standard lowercase language strings to prevent errors.
 * You should follow ISO-3166-1 and write the region part of your language in uppercase letters
 * (es-MX, es-CL, ...)
 */
const groupChars = {
  'es': '.',
  'es-us': ',',
  'en': ',',
  'en-us': ',',
  'en-uy': '.',
  'es-mx': ',',
  'es-pe': ',',
  'es-cl': ',',
  'es-uy': '.',
  'es-ar': '.',
  'es-py': '.'
};

/**
 * Currency symbols organized by localCurrency[currencyCode] with a 'default' key.
 * @type {Object}
 */
const currenciesMap = {
  CLP: {
    CLP: '$'
  },
  COP: {
    COP: '$'
  },
  MXN: {
    MXN: '$'
  },
  EUR: {
    USD: '$'
  },
  USD: {
    USD: '$'
  },
  PEN: {
    PEN: 'S/',
    USD: 'US$'
  },
  ARS: {
    ARS: '$',
    USD: 'U$S',
    EUR: '€',
    UVA: 'UVAs'
  },
  UYU: {
    UYU: '$',
    USD: 'U$S',
    UYI: 'UI' // Uruguayan Indexed Unit (unidad idexada)
  },
  default: {
    CLF: 'UF', //CL specific, here in case it's needed in another country
    EUR: '€',
    USD: 'US$',
    ARS: '$',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr.',
    CLP: 'Ch$',
    CZK: 'Kč',
    CNY: 'Yu¥',
    DKK: 'kr',
    GBP: '£',
    HKD: 'HK$',
    HUF: 'Ft',
    JPY: '¥',
    LTL: 'Lt',
    MAD: 'درهم',
    MXN: 'Mx$',
    NOK: 'kr',
    NZD: 'NZ$',
    PEN: 'S/',
    PLN: 'zł',
    RUB: 'руб',
    SAR: 'SR',
    SEK: 'kr',
    SGD: 'S$',
    TRY: 'TL',
    UYU: '$',
    ZAR: 'R',
    PYG: 'Gs'
  }
};

/**
 * localCurrency determines whether the minus sign of a negative number is rendered before or after the currency symbol (for left-aligned currencyCodes)
 * @type {Object}
 */
const minusAfterSymbolLocalCurrencies = ['MXN', 'CLP', 'UYU', 'PEN', 'ARS', 'PYG', 'COP'];

/**
 * currency determines if decimals part is rendered
 */
const currenciesWithoutDecimals = [ 'PYG' ];

const defaultLanguage = 'en';

/**
 * currencyCodes whose symbol is rendered after the amount
 */
const rightAlignedCurrencies = [ 'EUR', 'UVA' ];

window.CellsBehaviors = window.CellsBehaviors || {};

/**
 *
 * # cells-amount-behavior
 *
 * ![Certificated](https://img.shields.io/badge/certificated-yes-brightgreen.svg)
 * ![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)
 *
 * [Demo of component in Cells Catalog](https://catalogs.platform.bbva.com/cells)
 *
 * `CellsBehaviors.AmountsBehavior` is a behavior to format amounts and currency codes
 *
 * > Note. Implemented in [`cells-atom-amount`](https://catalogs.platform.bbva.com/cells)
 *
 * ```js
 *   <script>
 *     class XCellsAmountBehaviorTest extends CellsBehaviors.AmountBehavior(Polymer.Element) {
 *       static get is() {
 *         return 'x-cells-amount-behavior-test';
 *       }
 *
 *       static get properties() {
 *         return {};
 *       }
 *     }
 *
 *     customElements.define(XCellsAmountBehaviorTest.is, XCellsAmountBehaviorTest);
 *   </script>
 * ```
 * `cells-amount-behavior` provide public method getFormattedAmount to get a custom formatted amount from a string value
 *
 * @polymer
 * @mixinFunction
 * @summary Methods and constants to format monetary amounts.
 * @extends {superClass}
 * @demo demo/index.html
 */
CellsBehaviors.AmountBehavior = (superClass) => class extends superClass {

  static get properties() {
    return {
      /**
       * Set the quantity of fractional.
       */
      quantityFractional: {
        type: Number,
        value: 2
      }
    };
  }

  constructor() {
    super();
  }

  _hasMinusAfterSymbol(localCurrency) {
    return minusAfterSymbolLocalCurrencies.indexOf(localCurrency) !== -1;
  }

  _isNegative(amount) {
    return amount < 0;
  }

  /**
   * [function description]
   * @param  {String} currencyCode [description]
   * @return {Boolean}              [description]
   */
  _isRightAligned(currencyCode, forceAlignRight) {
    if (forceAlignRight) {
      return forceAlignRight;
    }
    return rightAlignedCurrencies.indexOf(currencyCode) !== -1;
  }

  /**
   * (String, String) -> String
   * Input String prepared for [ISO 4217 Currency Codes]
   * @return {String}
   */
  _getCurrencyAsSymbol(localCurrency, currencyAsLiteral) {
    return (currenciesMap[ localCurrency ] &&
      currenciesMap[ localCurrency ][ currencyAsLiteral ]) ||
      (currenciesMap.default &&
        currenciesMap.default[ currencyAsLiteral ]) ||
      currencyAsLiteral;
  }

  /**
   * Get a translation key for a currency
   * Input String prepared for [ISO 4217 Currency Codes]
   * @return {String}
   */
  _getTranslationKeyForCurrency(currency) {
    return 'cells-amount-behavior-currency-' + currency;
  }

  /**
   * (Number, String) -> String
   * Returns the integer part of a number without '-' sign in case it's negative
   */
  _getAbsIntegerPart(number, language) {
    if (isNaN(number) || number === null) {
      return;
    }

    let integer = this._getIntegerPart(number, language);

    //remove '-' if negative
    return this._startsWith(integer, '-') ? integer.slice(1) : integer;
  }

  /**
   * Determines whether a string begins with the characters of a specified string.
   * this._startsWith(stringSearching, searchValue, startPosition)
   */
  _startsWith(str, searchedString, position) {
    position = position || 0;
    return str.indexOf(searchedString, position) === position;
  }

  /**
   * (Number, String) -> String
   * Returns the integer part of a number
   */
  _getIntegerPart(number, language) {
    if (isNaN(number) || number === null) {
      return;
    }
    return this.__commafy(number.toString().split('.')[ 0 ], language);
  }

  /**
   * Number -> String
   * Returns the fractional part of a number (rounded down to 2 digits) or '00' if it's an integer.
   */
  _getFractionalPart(number) {
    if (isNaN(number) || number === null) {
      return;
    }
    var fractional = number.toString().split('.')[ 1 ];
    if (!fractional) {
      return '00';
    }
    if (fractional.length === 1) {
      return fractional + '0';
    }
    return fractional.slice(0, this.quantityFractional);
  }

  _getSeparator(language) {
    language = language ? language.toLowerCase() : document.documentElement.lang ? document.documentElement.lang.toLocaleLowerCase() : defaultLanguage;
    return separators[ language ] ||
      separators[ language.substring(0, language.indexOf('-')) ];
  }

  /**
   * Get group hundreds according to document language
   */
  _getGroupChars(language) {
    language = language ? language.toLowerCase() : document.documentElement.lang ? document.documentElement.lang.toLocaleLowerCase() : defaultLanguage;
    return groupChars[ language ] ||
      groupChars[ language.substring(0, language.indexOf('-')) ];
  }

  /**
   * (String, String) -> String
   * Returns a long integer separated by hundreds
   * with separator according to language
   */
  __commafy(numberStr, language) {
    language = language.toLowerCase();
    return numberStr.replace(/(\d)(?=(\d{3})+$)/g, '$1' +
      this._getGroupChars(language));
  }

  /**
   * Get custom formatted amount
   */
  getFormattedAmount(amount, currency, localCurrency, locale, decimal, separator, symbol, emptyString = '') {
    if ((amount || amount === 0) && currency) {
      var _symbol = symbol ? this._getCurrencyAsSymbol(localCurrency, currency) : '';
      var _integer = this._getAbsIntegerPart(amount, locale);
      var _separator = separator ? this._getSeparator(locale) : '';
      var _decimal = decimal ? this._getFractionalPart(amount) : '';
      var _negative = this._isNegative(amount) ? '-' : '';
      var _emptyString = emptyString ? ' ' : '';
      var formattedAmount = _negative + _integer + _separator + _decimal;
      return this._isRightAligned(currency) ? formattedAmount + _emptyString + _symbol : _symbol + _emptyString + formattedAmount;
    }
  }

  _hasDecimalPart(currency) {
    return currenciesWithoutDecimals.indexOf(currency) === -1;
  }
};
