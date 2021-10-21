
requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});

define(['jquery'], function(){

    function footerResCtrl() {
        
        // 页面宽度>=982px
        if ($('body').width() >= 982) {
            $("#footer").css({
                'flex-direction':'row'
            });
            $('#footer>.copyrightArea').css({
                'padding':'60px 10px 0 0'
            });
        }
        // 页面宽度<982px
        else{
            $("#footer").css({
                'flex-direction':'column'
            });
            $('#footer>.copyrightArea').css({
                'padding':'60px 10px 0 45px'
            });
        }

    }

    return {footerResCtrl};
    
});