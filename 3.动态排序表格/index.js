// 此效果无初始化
// 实现交互
// 1.实现复选框的选中效果
// 选中复选框
const checkAll = document.getElementById("checkAll");
// 实现选中复选框后下方的所有input均被选中
// 找到所有的复选框
const inputs = document.querySelectorAll("tbody input");
// 为checkAll注册点击事件
checkAll.addEventListener("click",function(){
    var checkStatus = this.checked;
    // 实现复选框checkAll的全选及全不选效果
    for(var i =0; i< inputs.length;i++){
        inputs[i].checked = checkStatus;
    }
})

// 实现下面的复选框全部选中后checkAll被选中
// 由于不确定数据的总数，利用事件委托实现
const tbody = document.querySelector("tbody");
var count = 0;
tbody.addEventListener("click",function(e){
    if(e.target.tagName==="INPUT") {
        if(e.target.checked){
            count++;
        console.log(count);
        if(count===this.children.length ){
            checkAll.checked = true;
        }
        }else{
            checkAll.checked = false;
        }
    }
})

// 2.实现编号排序
// 选中编号列,为当前序列index下的td[index]进行排序
const ths = document.querySelectorAll("th");
const rows = tbody.querySelectorAll("tr");
// 为编号列循环注册点击事件
// for(var i = 0 ; i < ths.length; i++){
//     // console.log(ths[i],i);
//     handleClick(ths[i],i);
// }
// 改进代码：利用foreach减少代码量
ths.forEach(function (node, index) {
    node.addEventListener('click', handleClick.bind(node, index))
})

/**
 * 
 * @param {number} index 下标 
 * @param {DOM元素} th th元素
 * @returns 
 */
function handleClick(index){
    /* 处理索引值为1复选框的时候的问题 */
    if (index === 0) {
        return;
    }
    // th.addEventListener("click",function(){
        var arr = Array.prototype.slice.apply(rows).sort(function (a, b) {
            if (index === 2 || index === 4) {
              /* localeCompare是一种基于国际化字体的地区字符比较，例如中国用中文，美国用英文，法国用法文，德国用德文。。将这些国家的文字按照国家/地区等进行编号，然后每个编号都对应了该国/地区的文字。 */
              return a.querySelectorAll('td')[index].innerHTML.localeCompare(b.querySelectorAll('td')[index].innerHTML, 'zh')
            }
            return a.querySelectorAll('td')[index].innerHTML - b.querySelectorAll('td')[index].innerHTML
          })
          
        //   for(var i =0;i<arr.length;i++){
        //     tbody.appendChild(arr[i]);
        //   }
        //   改进代码：利用foreach减少代码量
        arr.forEach(function (node) {
            tbody.appendChild(node)
        })
    // })
    
}