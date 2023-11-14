// 获取所需的dom
const tableProducts = document.querySelector(".product");

// 存储当前的所有数据
let selectData = {};
/**
 * 首先根据localStorage内部的值渲染页面，确保页面的一致性
 */
function init() {
	selectData = JSON.parse(localStorage.getItem('shoppingCart')) || {};  //第一次的时候取到的为空,但是JSON.parse返回的结果为Null
    // console.log(selectData);
	initSeleted();
}
init();

// 利用ajax获取数据
ajax("js/shoppingData.json",function(data){
    // 初始化商品
    initProducts(data);
    // 由于点击事件是以tr为单位
    // 为每一行tr注册事件
    const trs = tableProducts.querySelectorAll("tr");
    for (let i=0; i<trs.length; i++){
        regEvent(trs[i],i);
    }
})

/**
 * 根据获取的数据生成产品
 * @param {Object} data 
 */
function initProducts(data){
    // 存储模板字符串
    let str = '';
    data.forEach(item=>{
        // 获取颜色字符串模板
        let colors = '';
        item.list.forEach(product=>{
            colors += `<li data-id="${product.id}">${product.color}</li>`
        })
        // console.log(item.list[0])
        str += `<tr>
                    <td>
                        <img src="${item.list[0].img}" alt="">
                    </td>
                    <td>
                        <p class="title">${item.name}</p>
                        <ul class="colors">${colors}</ul>
                    </td>
                    <td class="price">${item.list[0].price}.00元</td>
                    <td>
                        <span>-</span>
                        <strong>0</strong>
                        <span>+</span>
                    </td>
                    <td>
                        <button>加入购物车</button>
                    </td>
                </tr>`
    })
    tableProducts.innerHTML = str;
}

/**
 * 为第index个tr注册事件
 * @param {HTMLElement} tr 
 * @param {Number} i 
 */
function regEvent(tr,i){
    // 设置变量保存数据，后期将需要的数据放到对象内部
    // 下方已选择的商品需要的数据有
    // 图片地址
    let imgSrc = `./images/img_0${i+1}-1.png`;
    // 商品名称
    let name = tr.querySelector(".title").innerHTML;
    // 商品颜色
    let color = "";
    // 商品id
    let colorId = null;
    // 商品单价
    let price = parseFloat(tr.querySelector(".price").innerHTML);
    // 商品数量
    let selectNum = 0;


    // 获取所需的dom
    const colorsContainer = tr.querySelector('.colors');
    const img = tr.querySelector("td img");
    const stockContainer = tr.querySelectorAll("td")[3];
    const addBtns = tr.querySelectorAll("td button");
    // 设置选择颜色更改样式以及图片
    let last = null;//上次点击的li
    colorsContainer.onclick = function(e){
        if(e.target.tagName === "LI"){
            // 设置选中效果
            last && last !== e.target && (last.className = '');
            e.target.className = e.target.className ? "" : "active";
            

            // 保存变量
            color = e.target.innerHTML;
            name = e.target.parentElement.previousElementSibling.innerHTML;
            price =parseFloat(e.target.parentElement.parentElement.nextElementSibling.innerHTML);
            colorId = e.target.dataset.id;

            // 切换图片
            const index = Array.from(this.children).indexOf(e.target);
            imgSrc = e.target.className ? `./images/img_0${i+1}-${index+1}.png` : `./images/img_0${i+1}-1.png`;
            img.src = imgSrc;

            last = e.target;
        }
    }

    // 修改库存数
    stockContainer.onclick = function(e){
        if(e.target.tagName === 'SPAN'){
            if(e.target.innerHTML==='-'){
                selectNum--;
                if(selectNum <0){
                    selectNum = 0
                }
                stockContainer.children[1].innerHTML = selectNum;
            }
            if(e.target.innerHTML==="+"){
                selectNum++;
                stockContainer.children[1].innerHTML = selectNum;
            }
        }
    }
    
    // 为加入购物车添加事件
    for(let i=0; i<addBtns.length;i++){
        const btn = addBtns[i];
        btn.onclick = function(e){
            // 是否选择颜色
            if(!color){
                alert("请选择颜色");
                return
            }
            // 是否添加数量
            if(!selectNum){
                alert("请添加购买数量");
                return;
            }
            // 设置商品库存变量
            const stock = selectData[colorId] && selectData[colorId].stock || 0;
            // 存储当前的所有数据
            selectData[colorId] = {
                "id":colorId,
                "imgSrc":imgSrc,
                "name":name,
                "color": color,
                "price":price,
                "stock":selectNum + stock,
                "time":new Date().getTime(),//用于已选择商品的排序
            }

            // 将数据放到localStorage内，实现跨页面访问数据
            localStorage.setItem("shoppingCart", JSON.stringify(selectData));

            // 将已选择的数据复原
            img.src = `./images/img_0${i+1}-1.png`;
            stockContainer.children[1].innerHTML = selectNum = 0;
            const li = tr.querySelector(".active");
            li.className = "";

            // 渲染下方已选择商品的表格
            initSeleted();
        }
    }
}

/**
 * 根据获取的数据生成产品
 * @param {Object}  
 */
function initSeleted(){
    let str = '';
    let total = 0;
    const data = Object.values(selectData);
    // 对data排序
    data.sort((product1, product2) =>product2.time - product1.time);
    data.forEach(item=>{
        console.log(item.stock)
        str += `<tr data-id="${item.id}">
                    <td>
                        <img src="${item.imgSrc}" alt="">
                    </td>
                    <td>${item.name}</td>
                    <td>${item.color}</td>
                    <td>${+item.price * + item.stock}.00元</td>
                    <td>x${item.stock}</td>
                    <td><button>删除</button></td>
                </tr>`;
        total += +item.price * + item.stock;
    })
    
    // 渲染表格
    const selected = document.querySelector(".selected tbody");
    selected.innerHTML = str;

    // 设置应付金额
    const totalDom = document.querySelector(".selected thead strong");
    totalDom.innerHTML = total + ".00元";

    // 为按钮注册删除事件
    del();
}

/**
 * 删除已选中的商品
 */
function del(){
    // 获取所有的删除按钮
    const delBtns = document.querySelectorAll(".selected button");
    for (let i = 0; i < delBtns.length;i++){
        const btn = delBtns[i];
        btn.onclick = function(){
            const prop = this.parentElement.parentElement.dataset.id;
            // 删除当前的数据
            delete selectData[prop];
            // 删除localStorage内的这条数据
            localStorage.setItem("shoppingCart",JSON.stringify(selectData));

            // 删除DOM结构
            this.parentElement.parentElement.remove();
            // 修改应付金额
            console.log()
            const totalDom = document.querySelector(".selected thead strong");
            totalDom.innerHTML = parseFloat(totalDom.innerHTML) - parseFloat(this.parentElement.parentElement.children[3].innerHTML) + ".00元";
        }
    }
}

// 注册事件，实现页面一致
window.addEventListener('storage',function(){
    init();
})