function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * 入口文件
 */

// 需要的dom
const container = $(".right");
const imgDom = $(".img");
const changeImg = $(".changeImg");
let isOver = false; //游戏是否结束
const maxIndex = 15;//图片最大索引值
function main() {
  // 初始化
  init();
  // 开始游戏
  startGame();
}
main();

/**
 * 初始化游戏界面
 */

function init() {
  //生成图形并放到右侧容器内
//   清空上一次生成的图片
container.innerHTML = "";
//   随机获取一张图片
//   共计100张图片
//   当下标为9的倍数时,显示同一张随机获取的图片
let targetIndex = getRandom(maxIndex,0);
for (let i = 0; i < 100; i++) {
    //   当前图片下标
    let curIndex=null;
    if(i%9===0){
        curIndex=targetIndex;
    }else{
        curIndex = getRandom(maxIndex,0);
    }
    container.innerHTML += `
    <div>
        <span>${i}</span>
        <img src="./images/values/${curIndex}.png"/>
    </div>
    `
}
}

/**
 * 开始游戏
 */
function startGame() {
  imgDom.onclick = function () {
    if (!isOver) {
      // 点击后旋转
      this.style.transition = "all 2s";
      this.style.transform = `rotate(2160deg)`;
    //   利用transitionend事件监听是否结束
    imgDom.addEventListener("transitionend",function(){
        console.log("over")
        // 随机显示图片
      const index = parseInt(getRandom(maxIndex, 0));
      changeImg.src = `./images/values/${index}.png`;
    })
      isOver = true;
    }else{
        if(window.confirm("是否再来一局")){
            location.reload();
        }
    }
  };
}

/**
 * 获取闭区间随机数
 * @param {Number} max 最大值
 * @param {Number} min 最小值
 * @returns
 */
function getRandom(max, min) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}