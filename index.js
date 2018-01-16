function buildReel(setStateFunction, onClickFunction) {
  
  var slicedArgs = Array.prototype.slice.call(arguments, 2);
  
  var recursiveBuilder = function(count) {
    if (count === slicedArgs.length - 1) {
      return (function() {
        setTimeout(function() {
          setStateFunction(slicedArgs[count].stateUpdates)
        }, slicedArgs[count].delay);
      });
    } else {
      let reel = recursiveBuilder(count + 1);
      return (function() {
        setTimeout(function() {
          setStateFunction(slicedArgs[count].stateUpdates, reel)
        }, slicedArgs[count].delay);
      });
    }
  };

  var firstFrame = function(stateUpdates) {
    let reel = recursiveBuilder(1);
    return function() {
      setStateFunction(stateUpdates, () => {
        onClickFunction();
        reel();
      });
    }
  };

  return firstFrame(slicedArgs[0].stateUpdates);
};

module.exports.buildReel = buildReel;

module.exports.keyframe = class Keyframe {
  constructor(stateUpdates, delay) {
    this.stateUpdates = stateUpdates;
    this.delay = delay;
  }
};