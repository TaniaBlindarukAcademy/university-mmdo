/**
 * Created by tania on 1.12.16.
 */
define([ 'jquery', './clearHtml.js','./two/goalFunction.js'], function ($, clearHtml,RenderGoal) {

    return {
        render: function () {
            clearHtml();
            RenderGoal.render();
        }
    }
});