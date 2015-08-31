var ReactPerf = require("react/lib/ReactPerf");

module.exports = function perfWrap(filename, displayName) {
  return function transform(ReactClass) {
		var reactLifeCycleFunctions =  Object.getOwnPropertyNames(ReactClass.prototype);
		reactLifeCycleFunctions.forEach(function(lifeCycleFunction) {
			var originalFunction = ReactClass.prototype[lifeCycleFunction];
			ReactClass.prototype[lifeCycleFunction] = function() {
				return ReactPerf.measure (
					displayName,
					lifeCycleFunction,
					originalFunction
				);
			}
		});
		return ReactClass;
	}
}