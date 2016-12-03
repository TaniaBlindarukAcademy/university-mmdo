/**
 * Created by tania on 3.12.16.
 */

define(['jquery',
        '../../model/singleton/simplex.js',
        '../../model/Fraction.js',
    '../../model/Function.js'],
    function ($, SimplexModel, Fraction,SimplexFunction) {

        function SimplexFunctionView(){
            this.$body = $(document.body);

            this.$element = null;

            this.signs = {
                0: '=',
                1: '<=',
                2: '>='
            };
        }

        SimplexFunctionView.prototype._createSignsHtml = function() {
            var html = '<select>';
            for (let i in this.signs) {
                html += '<option value="' + i + '">' + this.signs[i] + '</option>';
            }
            html += '</select>';
            return html;
        };

        SimplexFunctionView.prototype._createCellHtml = function(number) {
            var html = '<input value="0" type="text" class="form-control goal-cell"/> / <input value="1" type="text" class="form-control goal-cell"/>';
            number ? html += '<span> x' + number + '</span>' : null;
            return html;
        };

        SimplexFunctionView.prototype._createFunctionHtml = function(){
            var variableLength = SimplexModel.getVariableLength();

            var html = '<div class="form-group">';
            for (var i = 0; i < variableLength; ++i) {
                (i !== 0) ? html += '+' : null;
                html += this._createCellHtml(i + 1);
            }
            html += this._createSignsHtml();
            html += this._createCellHtml();
            html += '</div>';

            return html;
        };

        SimplexFunctionView.prototype.render = function(){
            this.$element = $(this._createFunctionHtml());
            this.$body.append(this.$element);
        };

        SimplexFunctionView.prototype.getFunction = function () {
            var simplexFunctionModel = new SimplexFunction();
            var functionCArray = [];
            var b = null;
            var $elements = this.$element.find('input');
            var elementsLength = $elements.length;
            for (var i = 0; i < elementsLength; ++i) {
                if(i==elementsLength-2){
                    b = new Fraction($($elements[i]).val(),$($elements[++i]).val());
                    break;
                }
                functionCArray.push(new Fraction($($elements[i]).val(),$($elements[++i]).val()));
            }
            simplexFunctionModel.setCKoef(functionCArray);
            simplexFunctionModel.setB(b);
            simplexFunctionModel.setSign(this.$element.find('select').val());

            return simplexFunctionModel;
        };

        return new SimplexFunctionView();

    });