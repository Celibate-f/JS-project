function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

const maxIndex = 5; //图片最大下标
const minIndex = 1; //图片最小下标
// 获取滚动按钮
const slide = $(".slide");
// 获取滚动条
const slider = $(".slider");
// 获取遮罩层
const mask = $(".mask");
// 获取空白块
const blank = $(".blank");
// 获取图片容器
const imgBox = $(".imgBox");
// 获取h3标题
const title = $(".title");
// 获取top
const topContainer = $(".top");
// 获取滑动文字提示
const tips = $(".slider span");
/**
 * 初始化
 */
function init() {
  // 1.初始化页面
  // 随机生成一个图片
  const index = getRandom(minIndex, maxIndex);
  // 将图片设置为imgBox的背景图片
  imgBox.style.backgroundImage = `url("./img/t${index}.png")`;
  // 生成空白小块到随机位置
//   计算最大高度和最大宽度
  const maxLeft = imgBox.offsetWidth / 2 - blank.offsetWidth + imgBox.offsetWidth / 2;
  const maxTop = imgBox.offsetHeight - blank.offsetHeight;
  const blankLeft = getRandom(imgBox.offsetWidth / 2, maxLeft);
  const blankTop = getRandom(0, maxTop);
//   设置滑块的宽度为最大宽度
slider.style.width = maxLeft + slide.offsetWidth + "px"
  // 设置空白小块位置
  blank.style.left = blankLeft + "px";
  blank.style.top = blankTop + "px";
  blank.style.opacity = 1;
  // 设置遮罩层小块的位置
  mask.style.top = blankTop + "px";
  // 设置遮罩层的背景图片
  mask.style.backgroundImage = `url("./img/t${index}.png")`;
  mask.style.backgroundPosition = `-${blankLeft}px -${blankTop}px`;
  // 设置标题颜色及文字
  title.innerText = "请完成图片验证";
  title.style.color = "#000";
//   设置滑块的位置
slide.style.left = "-2px";

  // 2.绑定对应的事件
    // 滑动鼠标
    slide.onmousedown = function (e) {
    // 显示遮罩层
    mask.style.opacity = 1;
    // 隐藏提示文字
    tips.style.opacity = 0;
    // 改变标题文字
    title.innerText = "拖动图片完成验证";
    title.style.color ="black";
    // 关闭transistion，市拖动效果更丝滑
    mask.style.transition = "none";
    slide.style.transition = "none";
    // 鼠标移动
    slider.onmousemove = function (ev) {
        // 计算left
        let newLeft = ev.clientX - e.clientX;
        // 判断边界
        if (newLeft < 0) {
        newLeft = 0;
        }
        if (newLeft > imgBox.offsetWidth - blank.offsetWidth) {
        newLeft = imgBox.offsetWidth - blank.offsetWidth;
        }
        // 设置遮罩层left
        mask.style.left = newLeft + "px";
        slide.style.left = newLeft + "px";
    };
    // 鼠标抬起，开始验证
    window.onmouseup = function () {
        // 预留5个像素的误差，验证成功
        const diff = blank.offsetLeft - mask.offsetLeft;
        if (Math.abs(diff) < 5) {
        // 验证成功，改变标题文字及样式
        title.innerText = "验证成功！";
        title.style.color = "green";
        // 隐藏空白小块和遮罩层
        mask.style.opacity = 0;
        blank.style.opacity = 0;
        // 删除所有的事件
        slider.onmousemove = slide.onmousedown = window.onmouseup = null;
        } else {
        // 验证失败
        // 遮罩层回到初始位置
        mask.style.left = "0px";
        slide.style.left = "-2px";
        mask.style.transition = `all 0.6s ease 0`;
        slide.style.transition = `all 0.6s ease 0`;

        // 
        slider.onmousemove = window.onmouseup = null;
        // 设置标题颜色及文字
        title.innerText = "验证失败";
        title.style.color = "red";

        // 显示滑块区域的文字
        tips.style.opacity = 1;

        // 显示空白块
        blank.style.opacity = 1;
        }
    };
    };
}

init();


topContainer.onclick = init;
/**
 * 得到一个随机数
 * @param {Number} min
 * @param {Number} max
 * @returns
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

