/**
 * Created by tania on 1.12.16.
 */
define([], function () {
    var goalFunction = [];
    var sign = 0;
    var signs = 0;
    var goalFunctionFull = {
        setGoalFunction: function (_goalFunction) {
            goalFunction = _goalFunction;
            return this;
        },
        setSign: function (_sign) {
            sign = _sign;
            return this;
        },
        getGoalFunction: function () {
            return goalFunction;
        },
        getSign: function () {
            return sign;
        }
    };

    return Object.create(goalFunctionFull);

});