/**
 * Created by tania on 1.12.16.
 */
requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: './node_modules/jquery/dist/jquery.min',
        text: './node_modules/text/text'
    }
});


require(['js/init'],function (init) {
    init.init();
});