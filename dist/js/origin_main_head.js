
define([], function(){
    return {responseWebCtrl};
});

function responseWebCtrl() {

$('.head>.box2').width(($('.head').width() * 0.4).toString());

responseWeb();
function responseWeb() {

    // 页面宽度>=585
    if ($('body').width() >= 585) {
        $('.head').css({
            'width': '100%',
            'flex-direction': 'row'
        });
        $('.head>.box2').css({
            'width': ($('.head').width() * 0.9).toString() + 'px',
            'height': '300px',
            'flex-direction': 'column'
        });

        $('.head .box3').css({
            'flex-direction': 'row',
            'align-items':'unset'
        });
        $('.head .imgDiv').css({
            'width':'90px',
            'height':'120px',
            'left':'10px',
            'top':'-15px'
        });
        $('.head .box4').css({
            'margin-left':'20px',
            'padding':'0'
        });
        $('.head>.box2>.bgDiv').css({
            'filter': 'blur(0px)'
        });
        $('.head>.box2>.box3>.cover').css({
            'opacity':'0.6'
        })
    }
    // 1130px>页面宽度>=600px
    // else if ($('body').width() >= 600) {
    //     $('.head').css({
    //         'width': '100%',
    //         'background': '#FF5050',
    //         'flex-direction': 'column'
    //     });
    //     $('.head>.box2').css({
    //         'width': ($('.head').width() * 0.9).toString() + 'px',
    //         'height': '300px',
    //         'flex-direction': 'column'
    //     });
        
    //     $('.head .box3').css({
    //         'flex-direction': 'row',
    //         'align-items':'unset'
    //     });
    //     $('.head .imgDiv').css({
    //         'width':'90px',
    //         'height':'120px',
    //         'left':'10px',
    //         'top':'-15px'
    //     });
    //     $('.head .box4').css({
    //         'margin-left':'20px',
    //         'padding':'0'
    //     });
    // }
    // 600px>页面宽度>=400px
    else if ($('body').width() >= 400)  {
        $('.head').css({
            'width': '100%',
            'flex-direction': 'column'
        });
        $('.head>.box2').css({
            'width': ($('.head').width() * 0.85).toString() + 'px',
            'height': '500px',
            'flex-direction': 'row'
        });

        $('.head .box3').css({
            'flex-direction': 'column',
            'align-items':'center'
        });
        $('.head .imgDiv').css({
            'width':'270px',
            'height':'360px',
            'top':'0',
            'left':'0'
        });
        $('.head .box4').css({
            'margin-left':'0',
            'padding':'0 20px 0 20px'
        });
        $('.head>.box2>.bgDiv').css({
            'filter': 'blur(4px)'
        });
        $('.head>.box2>.box3>.cover').css({
            'opacity':'0.4'
        })
    }
    // 400px>页面宽度
    else{
        $('.head').css({
            'width': (320*1.04)+'px',
            'flex-direction': 'column'
        });
        $('.head>.box2').css({
            'width': '320px',
            'height': '500px',
            'flex-direction': 'row'
        });

        $('.head .box3').css({
            'flex-direction': 'column',
            'align-items':'center'
        });
        $('.head .imgDiv').css({
            'width':'270px',
            'height':'360px',
            'top':'0',
            'left':'0'
        });
        $('.head .box4').css({
            'margin-left':'0',
            'padding':'0 20px 0 20px'
        });
        $('.head>.box2>.bgDiv').css({
            'filter': 'blur(4px)'
        });
        $('.head>.box2>.box3>.cover').css({
            'opacity':'0.4'
        })
    }

}
}