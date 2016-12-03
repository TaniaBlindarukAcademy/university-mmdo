/**
 * Created by tania on 1.12.16.
 */

define(['jquery', '../../model/singleton/simplex.js', './function.js'], function ($, SimplexModel, SimplexFunction) {

    var $body = $(document.body);
    var arraySimplRender = [];
    function renderFunctions() {
        $body.append('<span>Система лінійних обмежень</span>');

        for (var i = 0; i < SimplexModel.getEquationLength(); ++i) {
            var simplFu = Object.create(SimplexFunction);
            arraySimplRender.push(simplFu);
            simplFu.render();
        }

    }

    return {
        render: renderFunctions,
        getSimplexFunctionModel: function(){
            var array = [];
            for(var i=0; i<arraySimplRender.length; ++i){
                array.push(arraySimplRender[i].getFunction());
            }
            return array;
        }
    }
});