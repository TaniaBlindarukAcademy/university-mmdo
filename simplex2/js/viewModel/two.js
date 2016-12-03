/**
 * Created by tania on 1.12.16.
 */
define(['jquery', './clearHtml.js', './two/goalFunction.js', './two/functions.js',
        '../model/singleton/simplex.js'],
    function ($, clearHtml, RenderGoal, Functions,SimplexModel) {

        var $body = $(document.body);
        return {
            render: function () {
                clearHtml();
                RenderGoal.render();
                Functions.render();

                var $button = $('<button class="btn-lg"> Рахувати </button>');
                $body.append($button);
                $button.on('click', function (event) {
                    SimplexModel.setGoalFunction(RenderGoal.getGoalFunction());
                    SimplexModel.setSystemInequalities(Functions.getSimplexFunctionModel());
                    console.log(SimplexModel);
                });
            }
        }
    });