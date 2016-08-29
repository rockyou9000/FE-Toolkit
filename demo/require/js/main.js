requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        main: 'main',
        jquery:'lib/jquery-1.11.0.min',
        touchslide:'lib/TouchSlide.1.1',
        exp:'app/exp',
        math:'app/math'
    }
});

// Start the main app logic.
requirejs(['touchslide'],
function   (touchslide) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    console.log('全部加载成功!');
    requirejs(['exp'],function(){
    	console.log(222)
    })
});