// 此效果无初始化，直接进入交互环节

// 1.生成省会
var provinceDom = document.getElementById("province");
var cityDom = document.getElementById("city");
var schoolDom = document.getElementById("school");
// 循环生成select-province

// 遍历对象，使用for in
// <option value="省编号">省会名称</option>
// province{省编号:省会名称}
for (var prop in province) {
    var optionDom = document.createElement("option");
        optionDom.value = prop;
        optionDom.innerText = province[prop];
        provinceDom.appendChild(optionDom);
}


// 当select元素内部的选择改变时，需要为select注册事件change来判断改变后的option.value
provinceDom.onchange = function(){
    // 由于每次都是将option加入当前的dom元素末尾，因此每次调用函数前将使用的dom从而实现联动
    cityDom.innerHTML="";
    showCity(provinceDom.value);
    schoolDom.innerHTML="";
    showSchool(cityDom.value)
    console.log("省份编号",provinceDom.value)
    cityDom.onchange=function(){
        // schoolDom.innerHTML=`<select name="school" id="school"></select>`;
        schoolDom.innerHTML=""
        showSchool(cityDom.value);
    }
}


// 展示省会下的市
// city{省编号：{市编号：市名称}}
function showCity(index){
    // 确定被选中的省份后显示被选中的城市opt
    // curPrivince表示当前的省份编号
    var curPrivince= city[index];
    
    // cityLength表示此省份的市的个数
   for (const prop in curPrivince) {
    var optionDom = document.createElement("option");
        optionDom.value = prop;
        optionDom.innerText = curPrivince[prop];
        
        cityDom.appendChild(optionDom); 
        console.log(cityDom)  
   }
}

// 展示市下面的学校
function showSchool(index){
    // curCity表示当前的市编号
    var curCity = allschool[index.toString()];
    
    // cityLength表示此省份的市的个数
   for (var i of curCity) {
    var optionDom = document.createElement("option");
        optionDom.innerText = i;
        schoolDom.appendChild(optionDom);   
   }
}