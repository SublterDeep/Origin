// origin_main
// 控制主页aside的响应式布局

requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});


define(['jquery'], function(){

    let $containUl=$('#banner>.buttonArea>ul'); // 底部按钮ul
    let $bannerBg=$('#banner>.box2>.bannerBg'); // banner背景图容器
    let bannerItem=document.querySelectorAll('#banner>.box2>.bannerBg>div'); // 背景图三个显示格
    let lefPos=0; // 背景图左移边界点
    let cenPos=-bannerItem[0].clientWidth; // 背景图中间边界点
    let rigPos=-bannerItem[0].clientWidth*2; // 背景图右移边界点
    let isAnimating=false; // 背景图是否正在播放滚动动画(解决多次重复点击切换按钮抽搐问题)
    let isPlaying=true; // 设置轮播图是否播放(鼠标移入时取消自动播放)

    // 背景图数组
    let bgImgArray=['https://data3.origin.com/asset/content/dam/originx/web/app/programs/Store/mlu-october-2020/Monsters_Within_store_hero_en_ww_v1.jpg/f680554b-fb44-405a-a11f-4abd1407c5b4/original.jpg','https://data4.origin.com/asset/content/dam/originx/web/app/programs/Store/mlu-june-2020/FIFA22_StandardEdition_store_hero_en_ww_v2.jpg/d43a1a54-6f19-4999-bd94-818d9a0de362/original.jpg','https://data1.origin.com/asset/content/dam/originx/web/app/programs/Store/mlu-august-2020/MaddenNFL22_STDLaunch_store_hero_en_ww_v1.jpg/564a92e8-5b6d-4135-9d53-3aca89bb9ba1/original.jpg','https://data2.origin.com/asset/content/dam/originx/web/app/programs/Store/mlu-october-2020/Promo_BFOctSale2021_store_hero_en_ww_v1.jpg/161de704-89c4-47d9-8bce-4ab9cf47d418/original.jpg'];

    let pageCount=bgImgArray.length; // 总页数
    let nowPage=0; // 当前页数
    let leftBtn=document.querySelector('#banner>.left');
    let rightBtn=document.querySelector('#banner>.right');

    // 初始化
    initButtons(pageCount);
    changeItem(0);
    setAutoplay();
    $bannerBg.css('left',-bannerItem[0].clientWidth+'px');

    // 当鼠标移入/移出#banner时,控制是否轮播
    document.querySelector('#banner').onmouseenter=function(){isPlaying=false;}
    document.querySelector('#banner').onmouseleave=function(){isPlaying=true;}

    // 页面大小改变时
    function sizeCtrl(){
        $bannerBg.css('left',-bannerItem[0].clientWidth+'px');
        cenPos = -bannerItem[0].clientWidth;
        rigPos = -bannerItem[0].clientWidth * 2;
    }

    // 初始化按钮
    function initButtons(num) {
        let section_ul=document.querySelector('#banner>.buttonArea>ul');
        section_ul.innerHTML='';
        // 新建li元素并添加进ul列表
        for(let i=0;i<num;i++){
            let newLi=document.createElement('li');
            newLi.index=i;
            if(i===0){
                newLi.className='active';
            }
            section_ul.append(newLi);
        }
        // let $buttonLi=$('#banner>.buttonArea>ul>li'); // button区域所有按钮
        // 利用委托给li元素添加点击事件
        section_ul.onclick=function(ev){
            if(ev.target.nodeName==="LI"){
                checkDirection(ev.target.index);
                // 设置按钮激活状态
                // $('#banner>.buttonArea>ul>li').eq(ev.target.index).addClass('active').siblings().removeClass();
            }
        }
    }

    // 切换列表项函数
    function changeItem(index) {
        // console.log(index);
        let leftImg=index-1;
        let rightImg=index+1;
        if(leftImg<0){
            leftImg=pageCount-1;
        }
        if(rightImg>=pageCount){
            rightImg=0;
        }
        // url('https://data4.origin.com/asset/content/dam/originx/web/app/programs/Store/mlu-june-2020/FIFA22_StandardEdition_store_hero_en_ww_v2.jpg/d43a1a54-6f19-4999-bd94-818d9a0de362/original.jpg')
        bannerItem[0].style.background='url("'+bgImgArray[leftImg]+'")';
        bannerItem[1].style.background='url("'+bgImgArray[index]+'")';
        bannerItem[2].style.background='url("'+bgImgArray[rightImg]+'")';
        setImg();

    }

    // 左侧按钮点击事件
    leftBtn.onclick=function(){
        checkDirection(nowPage-1);
    }
    // 右侧按钮点击事件
    rightBtn.onclick=function(){
        checkDirection(nowPage+1);
    }
    // 检测左右点击后是否越界
    function checkDirection(num) {
        // 1左 0右
        let dir=2;
        $('#banner .imgDiv>img').fadeOut();
        // 向左
        if(num<nowPage){
            console.log('向左');
            dir=1;
        }
        // 向右
        if(num>nowPage){
            console.log('向右');
            dir=0;
        }
        if(num<0){
            num=pageCount-1;
        }
        else if(num>=pageCount){
            num=0;
        }
        if (dir === 1&&!isAnimating) {
            isAnimating=true;
            bannerItem[0].style.background='url("'+bgImgArray[num]+'")';
            setImg();
            // 设置按钮激活状态
            $('#banner>.buttonArea>ul>li').eq(num).addClass('active').siblings().removeClass();
            $bannerBg.stop().animate({left:lefPos},1000,()=>{
                $bannerBg.css('left',cenPos+'px');
                isAnimating=false;
                nowPage=num;
                document.querySelector('#banner .imgDiv>img').src='/static/img/banner/'+ (nowPage+1) +'.jpg';
                $('#banner .imgDiv>img').fadeIn();
                changeItem(num);
                // console.log(num);
            });
        }
        if (dir === 0&&!isAnimating) {
            isAnimating=true;
            bannerItem[2].style.background='url("'+bgImgArray[num]+'")';
            setImg();
            // 设置按钮激活状态
            $('#banner>.buttonArea>ul>li').eq(num).addClass('active').siblings().removeClass();
            $bannerBg.stop().animate({left:rigPos},1000,()=>{
                $bannerBg.css('left',cenPos+'px');
                isAnimating=false;
                nowPage=num;
                document.querySelector('#banner .imgDiv>img').src='/static/img/banner/'+ (nowPage+1) +'.jpg';
                $('#banner .imgDiv>img').fadeIn();
                changeItem(num);
                // console.log(num);
            });
        }
    }

    // 自动轮播
    function setAutoplay() {
        setInterval(() => {
            if (isPlaying) {
                checkDirection(nowPage+1);
            }
        }, 3000);
    }

    // 调整图片样式
    function setImg() {
        $('#banner>.box2>.bannerBg>div').css({
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        });
    }
    
    return {sizeCtrl};
})