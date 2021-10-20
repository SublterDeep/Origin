
requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});

define(['jquery'], function(){

    let containUl=$('main>.itemList>ul');
    let widthLi=$('main>.itemList>ul>li').width()+27; // li的宽(加上了间距)
    $('main>.itemList').width( $('main').width()*0.9+'px' );
    let lastNum=Math.round($('main>.itemList').width()/widthLi); // ul列表当前能显示的li数量
    let lis=document.querySelectorAll('main>.itemList>ul>li'); // 所有li
    let lis_display=[]; // 按当前ul能够显示的li数量分小数组
    let pageCount; // 总页数
    let nowPage=0; // 当前页数
    let leftBtn=document.querySelector('main>.itemList>.left');
    let rightBtn=document.querySelector('main>.itemList>.right');

    // 初始化
    containUl.width( lis.length*widthLi+'px' );
    changeDisplayArray(lastNum);
    initButtons(pageCount);

    // 页面大小改变时
    function sizeChange(){
        // console.log(1);
        $('main>.itemList').width( $('main').width()*0.9+'px' ); // 改变box1的宽度

        // console.log('能放下几个宽的Li元素 : ' + Math.round($('main>.itemList').width()/widthLi) );
        if( lastNum!==Math.round($('main>.itemList').width()/widthLi) ){
            lastNum=Math.round($('main>.itemList').width()/widthLi);
            // console.log('列表容纳项目数量发生了变化 ! 现在列表里边的数目是 : '+lastNum);
            changeDisplayArray(lastNum);
            initButtons(pageCount);
        }
    }

    // 创建小数组
    function changeDisplayArray(num) {
        let result=[];
        lis_display=[];
        for(let i=0;i<lis.length;i++){
            // console.log(i%5);
            if(i%num===0){
                result=[];
                result.push( lis[i] );
            }
            else if(i%num===num-1 ){
                result.push( lis[i] );
                if(result.length!=0){
                    lis_display.push( result );
                    result=[];
                }
            }
            else{
                result.push( lis[i] );
            }
            if(i==(lis.length-1)){
                if(result.length!=0){
                    lis_display.push( result );
                    result=[];
                }
            }
        }
        pageCount=lis_display.length; // 重新计算页数
        // console.log(pageCount);
        // console.log( lis_display );
    }

    // 初始化按钮
    function initButtons(num) {
        let section_ul=document.querySelector('main>.itemList>section>ul')
        section_ul.innerHTML='';
        // 新建li元素并添加进ul列表
        for(let i=0;i<num;i++){
            let newLi=document.createElement('li');
            newLi.index=i;
            if(i===nowPage){
                newLi.className='active';
            }
            section_ul.append(newLi);
        }
        // 利用委托给li元素添加点击事件
        section_ul.onclick=function(ev){
            if(ev.target.nodeName==="LI"){
                // 设置现在所在的页面数
                nowPage=ev.target.index;
                // 设置按钮激活状态
                setButtonStatus(ev.target.index);
                changeItem(nowPage);
                // console.log(ev.target.index);
            }
        }
    }

    // 左右切换列表项函数
    function changeItem(index) {
        // console.log(index);
        let leftSpace=0;
        for(let i=0;i<index;i++){
            leftSpace+=lis_display[i].length*widthLi;
        }
        // 检测并拦截最后一页
        if(index===pageCount-1){
            leftSpace=containUl.width()-$('main>.itemList').width()-10;
        }
        containUl.animate({
            left:-leftSpace+'px'
        });
        // console.log(leftSpace);
    }

    // 左侧按钮点击事件
    leftBtn.onclick=function(){
        checkDirection(nowPage,1);
    }
    // 右侧按钮点击事件
    rightBtn.onclick=function(){
        checkDirection(nowPage,0);
    }
    // 检测左右点击后是否越界
    function checkDirection(num,dir) {
        // 1左 0右
        if(num===0 && dir===1 ){
            // console.log('左越界');
            nowPage=pageCount-1;
            changeItem(nowPage);
            setButtonStatus(nowPage);
        }
        else if(num===pageCount-1 && dir===0){
            // console.log('右越界');
            nowPage=0;
            changeItem(nowPage);
            setButtonStatus(nowPage);
        }
        else{
            if(dir===1){
                changeItem(--nowPage);
                setButtonStatus(nowPage);
            }
            if(dir===0){
                changeItem(++nowPage);
                setButtonStatus(nowPage);
            }
        }
    }

    // 设置按钮激活状态
    function setButtonStatus(index) {
        $('main>.itemList>section>ul>li').removeClass();
        $('main>.itemList>section>ul>li').eq(index).addClass('active');
    }
    
    return {sizeChange};
});