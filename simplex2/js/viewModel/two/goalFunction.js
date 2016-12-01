/**
 * Created by tania on 1.12.16.
 */
define([ 'jquery','../../model/simplex.js'], function ($,SimplexModel) {

    var signs = {
        0: 'min',
        1: 'max'
    };

    function _createCellHtml(number) {
        return '<input value="0" type="text" class="form-control goal-cell"/> / <input value="1" type="text" class="form-control goal-cell"/>' +
            '<span> x' + number + '</span>';
    }

    function _createSignsHtml(){
        var html = '<select>';
        for(let i in signs){
            html +='<option value="'+i+'">'+signs[i] + '</option>';
        }
        html+='</select>'
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
        html+=_createSignsHtml();
        html += '</div>';

        return html;
    }

    function renderGoalFunction() {
        $(document.body).append($(_createGoalHtml()))
    }

    return {
        render: renderGoalFunction
    }
});