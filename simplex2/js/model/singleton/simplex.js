/**
 * Created by tania on 1.12.16.
 */
define([], function () {
    var singleton = function () {
        var equationLength = 2;
        var variableLength = 2;
        var goalFunction = null;
        var systemInequalities = [];
        return {
            getEquationLength: function () {
                return equationLength;
            },

            setEquationLength: function (length) {
                equationLength = length;
                return this;
            },

            getVariableLength: function () {
                return variableLength;
            },

            setVariableLength: function (length) {
                variableLength = length;
                return this;
            },

            getGolaFunction: function () {
                return goalFunction;
            },

            setGoalFunction: function (_goalFunction) {
                goalFunction = _goalFunction;
                return this;
            },
            getSystemInequalities: function () {
                return systemInequalities;
            },
            addToSystemInequalities: function (_inequalities) {
                systemInequalities.push(_inequalities);
                return this;
            },
            setSystemInequalities: function(_systemInequalities){
                systemInequalities = _systemInequalities;
                return this;
            }



        };
    };
    return singleton();
});