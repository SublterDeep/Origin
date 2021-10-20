
requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});


define(['jquery','/js/origin_main_aside.js','/js/origin_main_banner.js','/js/origin_main_head.js'], function($,{responseCtrl},{sizeCtrl},{responseWebCtrl}){
    
    responseCtrl();
    sizeCtrl();
    responseWebCtrl();
    
    // 页面响应式布局控制
    document.body.onresize=function () {
        responseCtrl();
        sizeCtrl();
        responseWebCtrl();
    }
    
})