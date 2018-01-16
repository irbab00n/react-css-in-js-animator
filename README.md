# react-css-in-js-animator
This package allows you to chain setState changes to trigger CSS-in-JS flags to extend style objects to create complex animations


## Documentation:



### Importing:

Import the package into a React file
````````
import animator from 'react-css-in-js-animator';
````````
**I recommend assigning the import object from the module as animator when importing**

### How to Use:

This package contains 1 method and 1 class.



----------


**animator.keyframe( *obj*,  *delay* )**  

- ***obj***:  (Type: Object) -- Object literal representing state changes to be performed at every keyframe.
```
ex: {clicked: true, shakeLeft: true};
```
- ***delay***: (Type: Number) -- Number in (**ms**) corresponds to the amount set in the setTimeouts within the buildReel method.

*Must be instantiated using ES6 JavaScript class instantiation. This allows for a quick and repeatable way to create a patterned object literal to be used inside of the buildReel method.* 

*When creating a first frame in a series, the delay time does not matter as it is not recorded in the construction of the animation reel.*

Example Usage:
````````
let keyframe1 = new animator.keyframe({clicked: true}, 100);
````````

----------

**animator.buildReel(** ***setStateFunction,  onClickFunction, [ keyframes ... ]*** **)**

- ***setStateFunction***:  (Type: Function) -- In order to make this approach work, one must pass in the setState function from the React component, but must be bound first.

Ex:
```
let reel = animator.buildReel(this.setState.bind(this), ... )
```
- ***onClickFunction***: (Type: Function) -- Option for engineer to pass in a function to be ran to simulate an onClick function.  If no function needs to be ran, must be stub with an anonymous function.

Ex:
```
...buildReel(this.setState.bind(this), () => {}, ... )
```
- ***keyframes***: This is where you list all of the frames to be animated.  Input currently doesn't support an array format, since it relies on an array.slice call to select a specific range.

Ex:
```
let frame1 = new animator.keyframe({clicked: true}, 0);
let frame2 = new animator.keyframe({clicked: false, 400});
let reel = buildReel(this.setState.bind(this), () => {}, frame1, frame2 );
```
----------

To define an animation, we simply make a method that exists on a stateful, class-based component.

````````
class CurrentImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shakeLeft: false,
      shakeRight: false
    };
    this.shakeAnimation = this.shakeAnimation.bind(this);
  }
  
.
.
.

  shakeAnimation() {
    let keyframe1 = new animator.keyframe({shakeLeft: true}, 0);
    let keyframe2 = new animator.keyframe({shakeLeft: false, shakeRight: true}, 100);
    let keyframe3 = new animator.keyframe({shakeRight: false}, 100);
    let reel = animator.buildReel(this.setState.bind(this), () => {}, keyframe1, keyframe2, keyframe3);
    reel();
  }
````````

In the example above, we have defined the shakeAnimation method on the currentImage class component.

To build the animation, I constructed 3 keyframes.  Each one of these keyframes will update the state of the component, allowing me to use these state flags as means to extend different style objects onto components, creating the CSS-in-JS application.

After creating the 3 keyframes, I construct a reel by calling the buildReel method, passing the bound setState function, a stubbed out onClick function, and my 3 keyframes listed.  This returns a function that contains the constructed animation chain.

We then call the function that returned from the buildReel.

You can then use this method anywhere you would use a click handling function. 