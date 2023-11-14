function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// 需要的dom
const chessBoard = $(".chessBoard");
// td的尺寸
const game = $("#game");
const size = (game.clientWidth * 0.92) / 14;
// 棋子的颜色
let c = "black";
// 游戏是否结束
let isOver = false;
// 存储所有的棋子
const chessArr = [];
//入口文件
function main() {
  // 初始化棋盘
  init();
  //   下棋
  play();
}
main();

/**
 * 初始化棋盘
 */
function init() {
  // 生成14*14的表格
  let tableContent = "";
  for (let i = 0; i < 14; i++) {
    let row = `<tr>`;
    for (let j = 0; j < 14; j++) {
      row += `<td data-row = "${j}" data-line = "${i}"></td>`;
    }
    row += `</tr>`;
    tableContent += row;
  }
  chessBoard.innerHTML = tableContent;
}

/**
 * 下棋
 */
function play() {
  chessBoard.onclick = function (e) {
    // 游戏没结束，继续下棋
    if (!isOver) {
      if (e.target.tagName === "TD") {
        // 当前的td
        const curTd = Object.assign({}, e.target.dataset);
        // 棋子的位置
        const positionX = e.offsetX > size / 2;
        const positionY = e.offsetY > size / 2;
        // 确定落子位置以及颜色
        const chess = {
          x: positionX ? parseInt(curTd.row) + 1 : parseInt(curTd.row),
          y: positionY ? parseInt(curTd.line) + 1 : parseInt(curTd.line),
          c,
        };
        // 渲染棋子
        chessDisplay(chess);
      }
    }else{
      // 游戏结束，是否再来一局
      const answer = window.confirm("是否再来一局?");
      if (answer) {
        location.reload();
      }
    }
    
    
   
  };
}

/**
 * 渲染棋子
 * @param {Object} chess
 */
function chessDisplay(chess) {
  // 游戏没结束且当前位置处没有棋子，落子
  if (!isExisit(chess)) {
    // 将棋子放入数组内
    chessArr.push(chess);
    // 新建一个棋子dom
    const newChess = `<div class="chess ${chess.c}" data-row="${chess.y}" data-line="${chess.x}"</div>`;
    // 根据chess.x,chess.y确定将棋子dom放入到哪个td中
    // 如果棋子不在最后一行或最后一列，找到对应的td，将dom放入td
    if (chess.x < 14 && chess.y < 14) {
      const tdPos = $(`td[data-row="${chess.x}"][data-line="${chess.y}"]`);
      tdPos.innerHTML += newChess;
    }

    // 如果棋子在最后一行，那么它需要和前一行的棋子共用同一个td，因此该td最后一个元素的top需要向下偏移50%
    if (chess.x < 14 && chess.y === 14) {
      const tdPos = $(`td[data-row="${chess.x}"][data-line="13"]`);
      tdPos.innerHTML += newChess;
      console.log(tdPos);
      tdPos.lastChild.style.top = "50%";
    }

    // 如果棋子在最后一行，那么它需要和前一行的棋子共用同一个td，因此该td最后一个元素的top需要向下偏移50%
    if (chess.x === 14 && chess.y < 14) {
      const tdPos = $(`td[data-row="13"][data-line="${chess.y}"]`);
      tdPos.innerHTML += newChess;
      tdPos.lastChild.style.left = "50%";
    }

    // 如果棋子在最右下角，那么它需要和它周边的3个棋子共用一个td，因此它需要向右向下偏移
    if (chess.x === 14 && chess.y === 14) {
      const tdPos = $(`td[data-row="13"][data-line="13"]`);
      tdPos.innerHTML += newChess;
      tdPos.lastChild.style.left = "50%";
      tdPos.lastChild.style.top = "50%";
    }
    c = c === "black" ? "white" : "black";
  }
  // 判断当前棋子落下后棋局是否结束
  check();
}

/**
 * 判定棋子是否已经存在
 * @param {Object} curChess 当前棋子
 * @returns true：棋子存在
 */
function isExisit(curChess) {
  const result = chessArr.find((chess) => {
    return (
      chess.x === curChess.x && chess.y === curChess.y && chess.c === curChess.c
    );
  });
  return result ? true : false;
}

/**
 * 检查当前棋子落下后游戏是否结束
 */
function check() {
  // 判定5个颜色相同的棋子相连
  // 判定横着相连
  let chess2,chess3,chess4,chess5;

   for (let i = 0; i < chessArr.length; i++) {
    const curChess = chessArr[i];
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 1 &&
        item.y === curChess.y &&
        item.c === curChess.c
      );
    });
     chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 2 &&
        item.y === curChess.y &&
        item.c === curChess.c
      );
    });
     chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 3 &&
        item.y === curChess.y &&
        item.c === curChess.c
      );
    });
     chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 4 &&
        item.y === curChess.y &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      end(curChess, chess2, chess3, chess4, chess5);
    }
    //   判定纵向5个棋子相连
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        item.y + 1 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        item.y + 2 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        item.y + 3 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x &&
        item.y + 4 === curChess.y &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      end(curChess, chess2, chess3, chess4, chess5);
    }
  
    //   斜着相连
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 1 &&
        item.y + 1 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 2 &&
        item.y + 2 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 3 &&
        item.y + 3 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x + 4 &&
        item.y + 4 === curChess.y &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      end(curChess, chess2, chess3, chess4, chess5);
    }
  
    chess2 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 1 &&
        item.y + 1 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess3 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 2 &&
        item.y + 2 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess4 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 3 &&
        item.y + 3 === curChess.y &&
        item.c === curChess.c
      );
    });
    chess5 = chessArr.find(function (item) {
      return (
        curChess.x === item.x - 4 &&
        item.y + 4 === curChess.y &&
        item.c === curChess.c
      );
    });
    if (chess2 && chess3 && chess4 && chess5) {
      end(curChess, chess2, chess3, chess4, chess5);
    }
   }
}

/**
 * 游戏结束，设置样式并显示
 * @param {object} 需要判定的5个棋子
 *
 */
function end(...args) {
  if (!isOver) {
    isOver = true;
    // 存储棋子
    const wins = [...args];
    for (let i = 0; i < wins.length; i++) {
      const chess = wins[i];
      // 根据棋子位置找到当前td下的div,并为所有的棋子添加样式
      const div = $(`td[data-row="${chess.x}"][data-line="${chess.y}"] div`);
      div.classList.add("win");
      // console.log(div.classList);
    }
    //   给所有的棋子加上文本并显示
    for (let j = 0; j < chessArr.length; j++) {
      const chess = chessArr[j];
      // 根据棋子位置找到当前td下的div,并为所有的棋子添加样式
      const div = $(`td[data-row="${chess.x}"][data-line="${chess.y}"] div`);
      div.innerHTML = `${j + 1}`;
    }
  }
}
