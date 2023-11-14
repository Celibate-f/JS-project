/**
 * 
 * @param {Number} curPage 当前页码
 * @param {Number} total 总页数
 * @param {Number} mostNumber 页码标签数
 * @param {HTMLElement} contaienr 容器
 */
function createPager(curPage,total,mostNumber,contaienr){
    // 创建分页容器
    const pager = document.createElement("div");
    pager.className = "pager";
    contaienr.appendChild(pager);

    /**
     * 创建一个页码标签
     * @param {String} className 需要挂载的类名
     * @param {String} text 页码标签显示文本
     * @param {Number} newPage 跳转的新页面
     */
    function createPage(className,text,newPage){
        const a = document.createElement("a");
        a.className = className;
        a.innerHTML = text;
        pager.appendChild(a);
        a.onclick =function(){
            
            createPager(newPage,total,mostNumber,contaienr)
            document.querySelector(".pager").remove();
        }
    }
    // 创建分页
    // 创建首页/上一页
    if(curPage===1){
        createPage("disabled","首页",1);
        createPage("disabled","上一页",1);
    }else{
        createPage("","首页",1);
        createPage("","上一页",curPage-1);
    }

    // 创建中间页
    const pages = [];
    let max = Math.floor(curPage + mostNumber / 2);
    let min = max - mostNumber + 1;
    if(max > total){
        max = total;
    }
    if(max < mostNumber){
        max = mostNumber;
    }
    if(min < 1){
        min = 1;
    }
    for (let i = min; i <= max; i++) {
        if(i===curPage){
            createPage("active",i,i);
        }else{
            createPage("",i,i);
        }
       
        
    }

    // 创建尾页/下一页
    if(curPage===total){
        createPage("disabled","下一页",total);
        createPage("disabled","尾页",total);
    }else{
        createPage("","下一页",curPage+1);
        createPage("","尾页",total);
    }

    // 创建页码标志
    const span = document.createElement("span");
    span.innerHTML = `${curPage}/${total}`;
    pager.appendChild(span);
}