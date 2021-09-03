
# cellsStateBehavior mixin

## See the following link
https://www.polymer-project.org/2.0/docs/devguide/custom-elements#mixins


![Polymer 2.x](https://img.shields.io/badge/Polymer-2.x-green.svg)
## Usage

This component has:

* _state: where state is stored.
* _setState(state): merges state received with current state.
* _resetStateToProps: propagate all prop values in state to the component:
```
this.a = 1;
this._setState({a: this.a});
// this._state --> {a: 1}
this.b = 'test';
this._setState({b: this.b});
// this._state --> {a: 1, b: 'test'}
this.a = 2;
this._resetStateToProps();
// this.a --> 1
// this.b --> 'test'
// this._state --> {a: 1, b: 'test'}
```

One can also reset the state doing:
```
this._setState(null)
// this._state --> {}
```
* Note: this does not reset props to their initial state. Every component must know their values and set them when necessary.
```
this.a = 1
this._setState({a: this.a});
// this._state --> {a: 1}
this._setState(null)
// this._state --> {}
// this.a --> 1
```
