/**
 * Created by tania on 1.12.16.
 */
define([ 'jquery', './clearHtml.js','./two/goalFunction.js','./two/functions.js'],
    function ($, clearHtml,RenderGoal,Functions) {

    return {
        render: function () {
            clearHtml();
            RenderGoal.render();
            Functions.render();
        }
    }
});