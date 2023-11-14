/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-09-05 08:53:50
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-09-05 12:19:36
 * @FilePath: \JS 项⽬实战\02. 手风琴效果\animate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * 实现动画效果
 * @param {Object} options 包含属性为：from：初始位置，to：结束位置，totalDuration：变化总时间，默认值为100ms，duration：变化间隔时间，默认值15ms
 */
function createAnimation(options){
    var from = options.from;
    var to = options.to;
    var totalDuration = options.totalDuration || 100;
    var duration = options.duration || 15;
    var times = Math.floor(totalDuration / duration);//变化次数
    var dis = (to - from) / times;//变化距离
    var curTimes = 0; //当前的变化次数，初始为0；
    var timerId = setInterval(function(){
        from += dis;
        curTimes ++;
        if(curTimes >= times){// 变化的次数达到了
            from = to;//变化完成
            clearInterval(timerId);// 不再变化
            options.onend && options.onend();// 变化结束后，回调onend
        }
        //变化时，回调onmove()函数;
        options.onmove && options.onmove(from);
    },duration) 
}
