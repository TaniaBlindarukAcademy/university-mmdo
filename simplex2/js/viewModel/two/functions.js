/**
 * Created by tania on 1.12.16.
 */

define(['jquery','../../model/singleton/simplex.js'],function($,SimplexModel){

    var $body = $(document.body);

    var signs = {
        0:'=',
        1:'<=',
        2:'>='
    };

    function _createCellHtml(number) {
        var html = '<input value="0" type="text" class="form-control goal-cell"/> / <input value="1" type="text" class="form-control goal-cell"/>';
        number ? html+= '<span> x' + number + '</span>':null;
        return html;
    }

    function _createSignsHtml(){
        var html = '<select>';
        for(let i in signs){
            html +='<option value="'+i+'">'+signs[i] + '</option>';
        }
        html+='</select>'
        return html;
    }

    function _createFunctionsHtml() {

        var variableLength = SimplexModel.getVariableLength();
        var equationLength = SimplexModel.getEquationLength();
        var html = '<span>Система лінійних обмежень</span>';
        for(var j =0;j <equationLength; ++j) {
            html += '<div class="form-group">';
            for (var i = 0; i < variableLength; ++i) {
                (i !== 0) ? html += '+' : null;
                html += _createCellHtml(i + 1);
            }
            html += _createSignsHtml();
            html +=_createCellHtml();
            html += '</div>';
        }

        return html;
    }

    function renderFunctions() {
        $body.append($(_createFunctionsHtml()));

        var $button = $('<button class="btn-lg"> Рахувати </button>')
        $body.append($button);
        $button.on('click',function(event){

        });
    }

    return {
        render: renderFunctions
    }
});