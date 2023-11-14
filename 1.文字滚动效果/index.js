
// 我的源代码
// const list = document.querySelector(".list");
// list.style.overflow = `hidden`;
//     // 1.确定当前滚动高度
// const listScrollHeight = list.scrollHeight;
// // 2。确定当前list的个数
// const count = list.children.length;
// // 3.设置变量存放滚动高度，每隔一段时间自增
// const changeHeight = listScrollHeight / count;
// for(var i = 0; i < count;i++){
//     (function(i){
//         setInterval(function(){
//             var height = changeHeight * i;
//             list.scrollTo({
//                 top: height,
//                 behavior:"smooth",
//                 });
//             if(i === count){
//                 i = 0;
//             }
//         },1000)
//     })(i);
// }

    
// 老师的代码分析

(function(){
// 1.初始化
// 第一步:克隆第一个元素插入到最后一个元素后
// 找到ul
const list = document.querySelector(".list");

// 实现元素克隆并插入到第最后一个元素
function cloneFirstItem(){
    var firstItem = list.children[0];
    // cloneNode方法当参数为true进行深度克隆
    var newItem = firstItem.cloneNode(true);
    list.appendChild(newItem);
}
cloneFirstItem();

// 2.滚动：每隔一段时间，滚动到下一个位置 
    const duration = 2000;
    setInterval(moveNext,duration);
    // 实现滚动到下一个
    var curIndex = 0;//初始位置为0
    const count = list.children.length;
    // 确定当前滚动条高度
    // 确定每次的滚动高度
    const changeHeight = list.scrollHeight / count;
    function moveNext(){
        var from = curIndex * changeHeight;
        curIndex++;
        var to = curIndex * changeHeight;
        // list.scrollTop = to;
        // 改进变化的效果，每次变化一点点
        var totalDuration = 500;//变化的总时间
        var duration = 10;//变化的时间间隔
        var times = totalDuration / duration;//变化的次数
        var dis = (to - from) / times;//每次变化的量
        var timeId = setInterval(function(){
            // 每隔duration时间，from增加dis
            from += dis;
            // 当from>=to时，变化结束
            if(from >= to){
                // 清除计时器
                clearInterval(timeId);
                // 当此时的下标为数组最后一项时，回到最初的位置，此时下标为0，滚动距离为0
                if(curIndex === count - 1 ){
                    curIndex = 0;
                    from = 0;
                }
            }
            list.scrollTop = from;
        },duration)
    }
})()