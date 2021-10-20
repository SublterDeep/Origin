// origin_main
// 控制主页aside的响应式布局

requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});


define(['jquery'], function(){
    
    let animateTime=300; // 动画播放时间

    responseCtrl();

    // 点击header菜单按钮弹出侧边栏aside
    document.querySelector('main>header>button').onclick=function(){
        $('#aside').css({'display':'block'}).animate({
            'left':0,
        },animateTime);
        $('.coverShield').fadeIn(animateTime);
    }

    // 点击遮罩区域关闭侧边栏aside
    document.querySelector('.coverShield').onclick=function(){
        $('#aside').animate({
            'left':'-'+ $('#aside').width() +'px',
        },animateTime,()=>{$('#aside').css({'display':'none'});});
        $('.coverShield').fadeOut(animateTime);
    }

    // aside响应式布局控制
    function responseCtrl(){

        console.log('response');
        // 页面宽度>=1000px
        // console.log($('body').width());
        if ($('body').width() >= 1000) {
            $('main>header').css({
                'display':'none'
            });

            $('#aside').css({
                'position':'relative',
                'display':'block',
                'left':0
            });
            
            $('.coverShield').css({'display':'none'});
        }
        else{
            $('main>header').css({
                'display':'block'
            });

            $('#aside').css({
                'position':'absolute',
                'display':'none',
                'left':'-'+ $('#aside').width() +'px'
            });
        }
    }
    
    return {responseCtrl};
});