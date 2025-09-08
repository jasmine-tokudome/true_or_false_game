// ゲームの状態
const CONTINUE = null; // まだ決着がついていない
const WIN_PLAYER_1 = 1; // 〇の勝ち
const WIN_PLAYER_2 = -1; // ✕の勝ち
const DRAW_GAME = 0; // 引き分け

const cells = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
let turn = 1;
let result = CONTINUE;

// セルをクリックしたときのイベントを登録
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        const cell = document.querySelector(`#cell_${row}_${col}`);
        cell.addEventListener("click", () => {
            if (result !== CONTINUE) {
                window.location.reload(true); // 決着がついた後にクリックしたらリロード
            }
            if (cells[row][col === 0]){
            putMark(row, col); // ○か×を置く
            turn = turn * -1;
            check(); // ゲームの状態を確認
            }
        });
    }
}

// ○か×を置く
function putMark(row, col) {
    const cell = document.querySelector(`#cell_${row}_${col}`);
    if (turn === 1){
        cell.textContent = "o";
        cell.classList.add("o");
        cells[row] = 1;
[col]    } else {
    cell.textConstent = "x";
    cell.classList.add("x");
    cells[row][col] = -1;
}
}

// ゲームの状態を確認
function check() {

}

// 勝敗を判定する処理
function judge(_cells) {

}