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
let mode = "hard";

// セルをクリックしたときのイベントを登録
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        const cell = document.querySelector(`#cell_${row}_${col}`);
        cell.addEventListener("click", () => {
            if (result !== CONTINUE) {
                window.location.reload(true); // 決着がついた後にクリックしたらリロード
            }
            if (cells[row][col] === 0){}
            putMark(row,col);
            turn = turn * -1;
            thinkAI();
            turn = turn * -1;
            check();
        }
        );
    }
}

// モードが切り替わった時の処理
const modeElements = document.querySelectorAll("input[name='mode']");
for (let modeElement of modeElements){
    modeElement.addEventListener("change",(event) => {
        mode = event.target.value;
    });
}

// ○か×を置く
function putMark(row, col) {
    const cell = document.querySelector(`#cell_${row}_${col}`);
    if (turn === 1){
        cell.textContent = "o";
        cell.classList.add("o");
        cells[row][col] = 1;
    } else {
        cell.textContent = "x";
        cell.classList.add("x");
        cells[row][col] = -1;
    }
}

// ゲームの状態を確認
function check() {
    result = judge(cells);
    const message = document.querySelector("#message");
    switch(result){
        case WIN_PLAYER_1:
            message.textContent = "oの勝ち!";
            break;
        case WIN_PLAYER_2:
            message.textContent = "xの勝ち!";
            break;
        case DRAW_GAME:
            message.textContent = "引き分け!";
            break;
    }
}

// 勝敗を判定する処理
function judge(_cells) {
    // 調べる必要があるラインをリストアップ
    const lines = [
        // 横をチェック
        [_cells[0][0], _cells[0][1], _cells[0][2]],
        [_cells[1][0], _cells[1][1], _cells[1][2]],
        [_cells[2][0], _cells[2][1], _cells[2][2]],
        // 縦をチェック
        [_cells[0][0], _cells[1][0], _cells[2][0]],
        [_cells[0][1], _cells[1][1], _cells[2][1]],
        [_cells[0][2], _cells[1][2], _cells[2][2]],
        // 斜めをチェック
        [_cells[0][0], _cells[1][1], _cells[2][2]],
        [_cells[0][2], _cells[1][1], _cells[0][0]],
    ]
    // 勝ち負けチェック
    for (let line of lines){
        const sum = line[0] + line[1] + line[2];
        if (sum === 3) {
            return WIN_PLAYER_1;
        }
        if (sum === -3) {
            return WIN_PLAYER_2;
        }
    }
    // 継続チェック
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            if (_cells[row][col] === 0){
                return CONTINUE;
            }
        }
    }
    return DRAW_GAME;
}

function thinkAI() {
    const hand = think(cells, -1, 9, mode === "easy")
    if (hand){
        const cell = document.querySelector(`#cell_${hand[0]}_${hand[1]}`);
        cell.textContent = " x ";
        cell.classList.add("x");
        cell[hand[0]][hand[1]] = -1;
    }
}