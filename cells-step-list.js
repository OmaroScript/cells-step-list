{
  class CellsStepList extends Polymer.mixinBehaviors([CellsBehaviors.i18nBehavior, CellsBehaviors.StepBehavior], Polymer.Element) {
    static get is() {
      return 'cells-step-list';
    }

    static get properties() {
      return {
        /**
         * Variable to set the data to be shown on the list
         * @type String
         */
        data: {
          type: Object
        },
        /**
         * Variable to set the title of the step
         * @type String
         */
        stepTitle: {
          type: String,
          value: 'cells-step-list-title-collapsed'
        },
        /**
         * Variable to set the label for change button
         * @type String
         */
        stepChangeLabel: {
          type: String,
          value: ''
        },
        /**
         * Variable to set the step active
         * @type Boolean
         */
        active: {
          type: Boolean,
          value: true
        },
        /**
         * Variable to collapse the step
         * @type Boolean
         */
        collapsed: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        /**
         * Variable to control the visibility of step's header button
         * @type Object
         */
        disableChange: {
          type: Boolean,
          value: false
        },
        /**
         * Variable to hide the header of the step
         * @type Boolean
         */
        hiddenHeader: {
          type: Boolean,
          value: false
        },
        /**
         * Variable to define a return page
         * @type String
         */
        continue: String,
        /**
         * Operative offer id
         * @type String
         */
        offerId: String,

        filledKeyValuesClass: {
          type: String,
          value: 'key-bold value-italic',
        },
        /** @type Boolean
        * helper property to change background fixed step
        */
        fixed: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        /**
        * It is needed to change the background of the filled step in the opx-template
        * @type Boolean
        */
        productSelected: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        /**
        * Indicates if the component should show a skeleton before a data is set
        * @type {Boolean}
        */
        isSkeleton: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        /**
         * Text for cells-step description
         * @type {String}
         */
        description: {
          type: String,
          value: ''
        },
        /**
        * Variable to show confirm button
        * @type {Boolean}
        */
        isButton: {
          type: Boolean,
          value: false
        },
        /**
        * Variable to hide or show current step
        * @type {Boolean}
        */
        hideCurrentStep: {
          type: Boolean,
          value: false
        },
        /**
         * Variable to set the confirm button text
         * @type {String}
         */
        continueButton: {
          type: String,
          value: 'cells-step-list-message-continue-button'
        },
        /**
        * Parameter to manually disable the continue button
        * @type {Boolean}
        */
        disableButton: {
          type: Boolean,
          value: false
        }
      };
    }

    /**
    * @desc validates the step component
    * @return {Boolean} The validity of the step component
    */
    isValid() {
      return true;
    }

    /**
     * Dispatches event to go to the next step
     */
    onContinue() {
      this.dispatchEvent(new CustomEvent('continue-pressed', {
        detail: this,
        bubbles: true,
        composed: true
      }));
    }

    /**
     * Manage input value and dispatches event change-step-state
     */
    onChangePressed() {
      this.dispatchEvent(new CustomEvent('change-step-state', {
        detail: this,
        bubbles: true,
        composed: true
      }));
    }

  }

  customElements.define(CellsStepList.is, CellsStepList);
}
