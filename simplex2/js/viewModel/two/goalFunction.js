/**
 * Created by tania on 1.12.16.
 */
define(['jquery',
        '../../model/singleton/simplex.js',
        '../../model/Fraction.js',
        '../../model/goalFunction.js'],
    function ($, SimplexModel, Frunction, GoalFunction) {

        var signs = {
            0: 'min',
            1: 'max'
        };

        var $goalFunctionElement = null;

        function _createCellHtml(number) {
            return '<input value="0" type="text" class="form-control goal-cell"/> / <input value="1" type="text" class="form-control goal-cell"/>' +
                '<span> x' + number + '</span>';
        }

        function _createSignsHtml() {
            var html = '<select>';
            for (let i in signs) {
                html += '<option value="' + i + '">' + signs[i] + '</option>';
            }
            html += '</select>'
            return html;
        }

        function _createGoalHtml() {

            var variableLength = SimplexModel.getVariableLength();

            var html = '<div class="form-group">';
            for (var i = 0; i < variableLength; ++i) {
                (i !== 0) ? html += '+' : null;
                html += _createCellHtml(i + 1);
            }
            html += '->';
            html += _createSignsHtml();
            html += '</div>';

            return html;
        }

        function renderGoalFunction() {
            $goalFunctionElement = $(_createGoalHtml());
            $(document.body).append($goalFunctionElement);
        }

        return {
            render: renderGoalFunction,
            getGoalFunction: function () {
                var elements = $goalFunctionElement.find('input[type="text"]');
                var functionTile = [];
                for (var i = 0; i < elements.length; ++i) {
                    var firstElementVal = $(elements[i]).val();
                    firstElementVal = firstElementVal ? firstElementVal : 0;

                    var secondElementVal = $(elements[++i]).val();
                    secondElementVal = secondElementVal ? secondElementVal : 0;
                    functionTile.push(new Frunction(firstElementVal, secondElementVal));
                }
                GoalFunction.setGoalFunction(functionTile);
                GoalFunction.setSign($goalFunctionElement.find('select').val());
                return GoalFunction;
            }

        }
    });