if (!this.myPlugin) {
  this.myPlugin = {};
}

this.myPlugin.createWaterFall = function ({
  imgGap = 10,
  imgSrcs = [],
  container = document.body,
  imgWidth = 220,
}) {
  const imgs = [];
  // 创建图片
  createImages();
  // 设置容器定位方式
  setContainerPos(container);

  // 创建图片
  function createImages() {
    for (let i = 0; i < imgSrcs.length; i++) {
      const img = document.createElement("img");
      img.src = imgSrcs[i];
      img.style.transition = "0.3s"
      img.style.width = imgWidth + "px";
      img.style.position = "absolute";
      imgs.push(img);
      img.onload = debounce(setImgPositions,300);
      container.appendChild(img);
    }
  }

  // 设置容器定位方式
  function setContainerPos(container) {
    const style = getComputedStyle(container);
    if (style.position === "static") {
      container.style.position = "relative";
    }
  }

  // 计算水平相关数据
  function getPostionData() {
    // 计算一共几列数据
    const obj = {};
    obj.number = Math.floor(container.clientWidth / imgWidth);
    // 计算间隔
    obj.gap =
      (container.clientWidth - obj.number * imgWidth) / (obj.number - 1);
    return obj;
  }

  //   设置img元素的位置

  function setImgPositions() {
    //计算水平相关数据
    const positionDate = getPostionData();
    // 设置图片位置
    const arr = new Array(positionDate.number);
    arr.fill(0);
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
    //   console.log(arr)
      // 计算img的top值
      let minTop = Math.min(...arr);
      img.style.top = minTop + "px";
      let index = arr.indexOf(minTop);
    //   更新数组
      arr[index] += img.height + positionDate.gap;
      // 计算img的left
      img.style.left = index * (imgWidth + positionDate.gap) + "px";
    }
    container.style.height = Math.max(...arr) - positionDate.gap + "px"
  }

  function debounce(func,time){
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, time);
    }
  }
  // 窗口尺寸改变时，重新为图片设置位置
  window.onresize = debounce(setImgPositions,300);
};
