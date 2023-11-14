/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-09-05 09:02:52
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-09-05 13:06:59
 * @FilePath: \JS 项⽬实战\02. 手风琴效果\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const menus = document.querySelectorAll(".menu h2");
// const submenus = document.querySelectorAll(".submenu");
// var itemHeight = 30;
// for(var i = 0; i < menus.length;i++){
//     (function(i){
//         var menu = menus[i];
        
//         var submenu = submenus[i];
//         menu.onclick = function(){
//             if(submenu.style.height === menus.length * itemHeight +'px'){
//                 submenu.style.height= 0 ;
//                 return;
//             }
//             for(var j=0;j<submenus.length;j++){
//                 var sub = submenus[j];
//                 if(sub.style.height ===menus.length * itemHeight +'px'){
//                     sub.style.height=0;
//                 } 
//             }
//             submenu.style.height= menus.length * itemHeight +'px';
//         }
//     })(i)
// }

// 改进代码：将功能抽离封装
// 点击h2元素后，需要实现子菜单submenu的显示与隐藏
// 打开submenu
// submenu有3种状态：打开opended，关闭closed，动画中playing

const menus = document.querySelectorAll(".menu h2");
const itemHeight = 30;
for(var i =0; i < menus.length; i++){
    menus[i].onclick = function(){
        // 关闭已经打开的子菜单,由于调用的函数是切换子菜单，因此最多已经打开了一个子菜单
        var beforeOpeded = document.querySelector(".submenu[status=opened]");
        if(beforeOpeded){
            closeSubmenu(beforeOpeded);
        }
        toggleSubmenu(this.nextElementSibling);
    }
}


function openSubmenu(subMenu){
    // 根据自定义属性status确定元素状态
    var status = subMenu.getAttribute("status");
    if(status && status !== "closed"){
        // 当前元素不是关闭状态
        return;
    }
    // 将元素状态改为playing
    subMenu.setAttribute("status","playing");
    var submenuHeight = itemHeight * subMenu.children.length;
    // 将高度变化使用动画效果
    createAnimation({
        from:0,
        to:submenuHeight,
        totalDuration:300,
        onmove:function(n){
            subMenu.style.height = n +"px"
        },
        // 动画结束，将status状态切换为opened
        onend:function(){
            subMenu.setAttribute("status","opened");
        }
    })
}
// 关闭submenu
function closeSubmenu(subMenu){
    // 判断元素当前状态
    var status = subMenu.getAttribute('status');
    if(status!=="opened"){
        // 元素当前未打开
        return;
    }
    subMenu.setAttribute("status","playing");
    createAnimation({
        from:parseInt(subMenu.style.height),
        to:0,
        totalDuration:300,
        onmove:function(n){
            subMenu.style.height = n +"px"
        },
        // 动画结束，将status状态切换为opened
        onend:function(){
            subMenu.setAttribute("status","closed");
        }
    })
}

// 切换子菜单
function toggleSubmenu(subMenu){
    var status = subMenu.getAttribute("status");
    if(status === "playing"){
        // 动画播放中，啥也不干
        return;
    }else if(status === "opened"){
        closeSubmenu(subMenu);
    }else{
        openSubmenu(subMenu);
    }
}


