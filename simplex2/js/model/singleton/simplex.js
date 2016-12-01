/**
 * Created by tania on 1.12.16.
 */
define([], function () {
    var singleton = function () {
        var equationLength = 2;
        var variableLength = 2;
        var goalFunctional = [];
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
            }
        };
    };
    return singleton();
});