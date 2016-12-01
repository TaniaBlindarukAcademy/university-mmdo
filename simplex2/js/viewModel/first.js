/**
 * Created by tania on 1.12.16.
 */
define(['jquery',
        'text!partial/first.html',
        './two.js',
        '../model/singleton/simplex.js'],
    function ($, template, secondViewModel, SimplexModel) {

    var $body = $(document.body);

    function _getVarLength(selector) {
        var number = $body.find(selector).val();
        number = parseInt(number);
        return (isNaN(number) || number < 2) ? 2 : number;
    }

    function _toNextStep(){
        secondViewModel.render();
    }

    function getEquationLength() {
        return _getVarLength('#equationLength')
    }

    function getVariableLength() {
        return _getVarLength('#variableLength');
    }

    function appendTemplate() {
        $body.append($(template));
        $body.find('#toTwoStep').on('click',function(event){
            SimplexModel.setVariableLength(getVariableLength())
                .setEquationLength(getEquationLength());
            _toNextStep();
        });
    }

    return {
        render: appendTemplate
    };

});