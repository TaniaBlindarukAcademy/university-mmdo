/**
 * Created by tania on 1.12.16.
 */

define(['./viewModel/first'], function (firstViewModel) {
    return {
        init: function(){
            firstViewModel.render();
        }
    }
});
