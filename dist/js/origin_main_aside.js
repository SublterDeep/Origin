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

    // 控制search框获取/失去焦点外边框颜色
    document.querySelector('#search>input').onfocus=function () {
        document.querySelector('#search>input').style.border='1px solid #F56C2D';
    }
    document.querySelector('#search>input').onblur=function () {
        document.querySelector('#search>input').style.border='none';
    }

    // 点击header菜单按钮弹出侧边栏aside
    document.querySelector('main>header>p').onclick=function(){
        $('#aside').css({'display':'block'}).animate({
            'left':0,
        },animateTime);
        $('.coverShield').fadeIn(animateTime);
        $('main>header>p').animate({
            'left': $('#aside').width() + 'px'
        },animateTime,()=>{$('main>header>p').text('X')});
        $('main>header>.logo').animate({
            'left': $('#aside').width() + 'px'
        },animateTime);
    }

    // 点击遮罩区域关闭侧边栏aside
    document.querySelector('.coverShield').onclick=function(){
        $('#aside').animate({
            'left':'-'+ $('#aside').width() +'px',
        },animateTime,()=>{$('#aside').css({'display':'none'});});
        $('.coverShield').fadeOut(animateTime);
        $('main>header>p').animate({
            'left':'0'
        },animateTime,()=>{$('main>header>p').text('三')});
        $('main>header>.logo').animate({
            'left': '0'
        },animateTime);
    }

    // header栏右侧放大镜按钮点击事件
    document.querySelector('main>header>.searchP').onclick=function (ev) {
        openSearch();
        ev.stopPropagation();
    }
    // 点击除了搜索框任意位置关闭搜索框
    document.body.onclick=function (ev) {
        // console.log(ev.target.nodeName);
        if(ev.target.nodeName!=="INPUT"){
            closeSearch();
        }
    }
    
    // 打开搜索框函数
    function openSearch() {
        $('main>header>.searchDiv').animate({},0,()=>{

            // 调节logo向上起飞
            $('main>header>.logo').animate({
                'top':'-'+$("main>header").height()+'px'
            },animateTime);
            // 调节原放大镜左移并消失
            $('main>header>.searchP').animate({},0,()=>{
                $('main>header>.searchP').fadeOut();
                $('main>header>.searchDiv>.searchD').fadeIn();
            }).animate({
                'left': '-' + $('main>header').width()*0.9 + 'px'
            })
            // 搜索栏淡入
            $('main>header>.searchDiv').fadeIn();

        }).animate({
            // 搜索栏宽度
            'width': $('main>header').width()*0.9 + 'px'
        });
    }
    // 关闭搜索框函数
    function closeSearch() {
        $('main>header>.searchDiv').animate({}, 0, () => {

            // 调节logo归位
            $('main>header>.logo').animate({
                'top':'0'
            },animateTime);
            // 调节原放大镜归为移并出现
            $('main>header>.searchP').animate({},0,()=>{
                $('main>header>.searchP').fadeIn();
                $('main>header>.searchDiv>.searchD').fadeOut();
            }).animate({
                'left': '0'
            })
            // 搜索栏淡出
            $('main>header>.searchDiv').fadeOut();
            
        }).animate({
            // 搜索栏宽度
            'width': '30px'
        });
    }

    // aside响应式布局控制
    function responseCtrl(){

        // console.log('response');
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
            
            $('#aside>.logo').css({
                'display':'flex'
            });
            $('#search').css({
                'display':'flex'
            });
        }
        else{
            $('main>header').css({
                'display':'flex'
            });

            $('#aside').css({
                'position':'absolute',
                'display':'none',
                'left':'-'+ $('#aside').width() +'px'
            });

            $('#aside>.logo').css({
                'display':'none'
            });
            $('#search').css({
                'display':'none'
            });
            $('main>header>p').css({
                'left':'0'
            }).text('三');
            $('main>header>.logo').css({
                'left': '0'
            });
        }
    }
    
    return {responseCtrl};
});