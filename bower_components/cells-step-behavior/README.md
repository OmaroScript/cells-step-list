# cells-step-behavior

Version: **4.9.1**

`CellsBehaviors.StepBehavior` sets a common interface for operative step elements.

## NOTICE

Starting from version **3.0.0**, in order to get full functionality is suggested to use [glomo-opx-template](https://globaldevtools.bbva.com/bitbucket/projects/TP/repos/glomo-opx-template/browse).

If your `<cells-step-wrapper/>` component requires to implement Polymer's life-cycle methods (`attached`, `created`, `ready`, `detached`), **ensure** you previously call this behaviors methods (if apply):

```javascript
CellsBehaviors.StepImplBehavior.attached.call(this, ...arguments);
```

```javascript
CellsBehaviors.StepContainerBehavior.ready.call(this, ...arguments);
```

## Import

1) Import the behavior in your component:

```html
<link rel="import" href="../cells-step-behavior/cells-step-behavior.html"/>
```

2) Add CellsBehaviors.StepBehavior to the behaviors list in the JS file or script of your component:

```javascript
behaviors: [CellsBehaviors.StepBehavior]
```

## Contents

`StepBehavior` imports following behaviors:
- StepPropBehavior
- StepImplBehavior
- StepContainerBehavior
- StepGhostBehavior

Additionaly also exists:
- StepManagerBehavior

### StepPropBehavior

> Declares shared properties between a <cells-step-wrapper/> component and <cells-step/>

Properties [1]:

| NAME | DESCRIPTION | TYPE | BINDING|
| --- | --- | --- | --- |
| active | Flags if step is active or not | Boolean | IN/OUT |
| changeLabel | Label for the change button | String | IN |
| collapsed | Flags if step is collapsed or not | Boolean | IN/OUT |
| hidden | Flags if step is hidden or not | Boolean | IN/OUT |
| currentStep | Step's index orde | Number | IN |
| decorated | Flags if step should apply special CSS styles | Boolean | IN/OUT |
| fixed | Flags if step if fixed and cannot be edited | Boolean | IN/OUT |
| lastStep | Flags if steps is last step | Boolean | OUT |
| maxSteps | Max. available number of steps | Number | IN |
| previous | Flags if step is previous to active one | Boolean | IN/OUT |
| scrolled | Flags if step's been scrolled out of view | Boolean | IN/OUT |
| stepId | Step's unique identifier | String | IN |
| stepTitle | Step's title | String | IN |
| blocked | Flags if this steps if blocked | Boolean | IN/OUT |
| disabled | Flags if this steps if disabled | Boolean | IN/OUT |
| next | Flags if step is next to active one | Boolean | IN/OUT |
| skip | Flags if can go to the next one. | Boolean | IN/OUT |

### StepImplBehavior

> Declares observers and computed methods over properties.

Properties:

| NAME | DESCRIPTION | TYPE | BINDING|
| --- | --- | --- | --- |
| activeDelay | Time (in ms.) to delay toggle of `active` property | Number (1) | IN |
| notInitializeWithAttached | Not initialize with attached | Boolean | IN |

Methods:

| NAME | DESCRIPTION | RETURNS | PARAMS |
| --- | --- | --- | --- |
| _fixedObserver | Private observer callback for property <em>fixed</em> | void | Event |
| _isScrolled | Observer for properties <em>collpased</em>, <em>active</em> and <em>previous</em> | void | @`collapsed` @`active` @`previous` |
| close | Close steps and set its output values [2] | void | void |
| initialize | Initializes the step [3] | void | void |
| isValid | Validates the step [2] | Boolean | void |
| reset | Resets the step's state [2] | void | void |
| scrollComplete | Activates this step after `activeDelay` time | void | HTMLElement |

Events:

| NAME | DESCRIPTION | PAYLOAD
| --- | --- | --- |
| register-step | Fired at `attached` | {index:{Number.`currentStep`}, node: {Object.this}} |

### StepGhostBehavior

> Handle Ghost Behavior

Properties:

| NAME | DESCRIPTION | TYPE | BINDING|
| --- | --- | --- | --- |
| isGhost | Handle step properties when it changes | Boolean | IN |

Methods:

| NAME | DESCRIPTION | RETURNS | PARAMS |
| --- | --- | --- | --- |
| _isGhostHandler | Private observer callback for property <em>isGhost</em> | void | Event |

### StepContainerBehavior

> Provides properties and methods for any `<cells-step-wrapper/>` component.

Properties:

| NAME | DESCRIPTION | TYPE | BINDING|
| --- | --- | --- | --- |
| containerClassName | `<cells-step-wrapper/>` container class name | String | IN |

### StepManagerBehavior

> Provides properties and methods for any OPX manager

Properties:

| NAME | DESCRIPTION | TYPE | BINDING|
| --- | --- | --- | --- |
| animationTimeout | Animation delay to advance into next step (in ms.) | Number (1500) | IN/OUT |
| autoActivateStep | Flags if first 'next' step should be active by default | Boolean | IN |
| canExecute | Flags if OPX can be executed | Object | OUT |
| currentStep | Current active step | Number | OUT |
| decorateSteps | Flags if steps should toggle property `decorated` | Boolean | IN |
| hasFinished | Flags if OPX has finished and can be close or repeat | Boolean | OUT |
| lastActiveStep | Last active step reference | Object | OUT |
| maxSteps | Max. number of available steps | Number | OUT |
| _lastResponse | Last response obtained from server | Object | --- |
| _steps | Map of registered steps | Object | --- |
| allStepsCollapsed | Flags if all steps are collapsed | Boolean | IN/OUT |
| stepsInit | Step initial image | Array | IN |
| stepsRegistered | Flags if all steps are been registered | Boolean | IN/OUT |

Methods:

| NAME | DESCRIPTION | RETURNS | PARAMS |
| --- | --- | --- | --- |
| getLastActiveStep | Returns last active step | Object | --- |
| getLastStep | Returns last registered step | --- | Object |
| getNextStep | Retrieves the next step whenever skip is false. | `target`: Object | Object |
| getPreviousStep | Retrieves the previous step whenever skip is false. | `target`: Object | Object |
| registerStep | Registers a new step | --- | @`{index: {Number}, node: {Object}} |
| resetFollowingSteps | Resets all steps starting from a position | --- | @`index` {Number} |
| resetSteps | Resets all registered steps | --- | --- |
| _addDecoration | Toggles `decorated` property for registered steps | --- | --- |
| _canExecute | Calculates the value of `canExecute` | --- | --- |
| _checkRegisteredSteps | Check if all steps are registered. Dispatch event `steps-registered-changed`. | --- | --- |
| _nextStep | Calls `__nextStep` after Polymer's next render | --- | --- |
| _resetStepProps | Resets all step's properties | --- | --- |
| __gotoNext | Advances to last active but not valid step | --- | @`activeSteps` {Object[]} |
| __nextStep | Calculates `activeSteps` and calls `__gotoNext` | --- | --- |
| _manageStateSteps | Deactivate others steps when reopen other step | --- | --- |
| _blockStateSteps | Blocked all steps while requests are in progress | --- | --- |
| showSelectedSteps | Show  the selected step or steps in execution time. Is mandatory send the step or steps that you want to hide/show on an array, number or string format . Selected steps to mutate cant be more than the configured maxSteps| --- | --- |
| hideSelectedSteps | Hide the selected step or steps in execution time. Is mandatory send the step or steps that you want to hide/show on an array, number or string format. Selected steps to mutate cant be more than the configured maxSteps | --- | --- |
| _deActivateNextSteps | filter  not `scrolledSteps` and set them to not active state | --- | --- |
| _isOperableStep | Checks if the step can be opened, (ej: using nextStep()). | `step`: Object | Boolean |
| _toggleCollapsedSteps | filter `scrolledSteps`, `activeSteps` and not `collapsedSteps` differents from `currentStep` and set them to collapsed state | --- | `currentStep` |
| toggleCollapsedView | Calls `_deActivateNextSteps` and `_toggleCollapsedSteps` | --- | `currentStep` |
| initSteps | Init settings in step | --- | --- |
| unregisterSteps | Unregister steps | --- | --- |
| initStepState | Inits a step with its settings defined in stepsInit, depending on its index | `step`: Object | {} |
| applySettingsStep | Apply setting in step | `step`: Object, `settings`: Object | {} |
| resetWithDefaultSettings | Resets multistep operative, by: Executing every `reset()` method of every `step`. Setting default settings (defined in `stepsInit`) of every step. Updating internal manager properties by calling `_activateSteps` | {} | {}
| onAnyStepCollapsedChanged | Check if all steps are collapsed on every step collapse and emits event with allStepsCollapsed status | void | void |
| setSteps | Sets current, previous/next-step if any before going to nextStep | void | void |


Events:

| NAME | DESCRIPTION | PAYLOAD
| --- | --- | --- |
| cells-scroll-zone | Fired on getting last active step | {Object.`_lastActiveStep`} |
| all-steps-collapsed | Fired on every step collapse | {Boolean.`_allStepsCollapsed`} |
| cells-all-steps-scroll | Fired on all steps collapsed | {Object.`_steps[currentStep]`} |
| reset-following-steps-finished | Fired after resetting following steps |  |


## How to?

[cells-step]() component by default includes `cells-step-prop-behavior`.

Your step-alike component should include `cells-step-behavior` and propagate its properties defined by `prop` behavior into its `cells-step` component:

```html
<link rel="import" href="../cells-step-behavior/cells-step-behavior.html"/>
<dom-module id="my-cells-step-wrapper"
  <template>
    <cells-step
      fixed="[[fixed]]"
      active="[[active]]"
      collapsed="[[colapsed]]"
      scrolled="[[scrolled]]"
      previous="[[previous]]"
      next="[[next]]"
      title="[[title]]"
      current-step="[[currentStep]]"
      max-steps="[[maxSteps]]">
      <div class="filled">
        <!-- on collapse eq. true -->
      </div>
      <div class="full">
        <!-- on collpase eq. false -->
      </div>
    </cells-step>
  </template>
  <script>
    Polymer({
      is: 'my-cells-step-wrapper',
      behaviors: [
        CellsBehaviors.StepBehavior
      ],
      isValid: function() {
        return true;
      },
      reset: function() {
        //do reset
      }
    });
  </script>
</dom-module>
```

---

[1]: *Every boolean value is reflected as attribute*

[2]: *Should be implemented by any `<cells-step-wrapper/>`*

[3]: *Launched in `attached` life-cycle method*
