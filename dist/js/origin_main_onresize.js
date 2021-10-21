
requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});


define(['jquery','/js/origin_main_aside.js','/js/origin_main_banner.js','/js/origin_main_head.js','/js/origin_main_list.js','/js/origin_main_list_2.js','/js/origin_main_footer.js'], function($,{responseCtrl},{sizeCtrl},{responseWebCtrl},{sizeChange},{sizeChange_2},{footerResCtrl}){
    
    responseCtrl();
    sizeCtrl();
    responseWebCtrl();
    sizeChange();
    sizeChange_2();
    footerResCtrl();
    
    // 页面响应式布局控制
    document.body.onresize=function () {
        responseCtrl();
        sizeCtrl();
        responseWebCtrl();
        sizeChange();
        sizeChange_2();
        footerResCtrl();
    }
    
})