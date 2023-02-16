// all squares
let slots = document.getElementsByClassName("slot");

// start-button
let start = document.getElementsByClassName("start-button")

// signs
let current_sign = "X";

const X_element = document.createElement('p');
const O_element = document.createElement('p');
X_element.classList.add("X_element");
O_element.classList.add("O_element");

X_element.innerHTML = "X";
O_element.innerHTML = "O";

// sign text
let sign_text = document.getElementById("turn");
let sign_span = document.getElementById("sign-span");


let game_state = "ongoing";

function fix_width(){
    for(let i = 3; i < slots.length; i++){
        let current = slots[i];
        current.style.borderTopWidth = "0px";
    }
    for (let i = 0; i < slots.length; i++){
        let current = slots[i];
        if(i%3 == 0 || i == 1 || i == 4 || i == 7){
            current.style.borderRightWidth = "0px";
        }
    }
}

function add_sign(current){
    if (current.childElementCount == 0){
        if (current_sign == "X"){
            current.appendChild(X_element.cloneNode(true));
            let current_text = current.firstChild;

            current_text.classList.add("appear")
            setTimeout(() => {
                current_text.classList.remove("appear");
            }, 750);

            current_sign = "O";
            sign_span.style.color = "blue";
            sign_span.innerText = "O";
        }
        else{
            current.appendChild(O_element.cloneNode(true));

            let current_text = current.firstChild;
            
            current_text.classList.add("appear")
            setTimeout(() => {
                current_text.classList.remove("appear");
            }, 750);

            current_sign = "X";
            sign_span.style.color = "red";
            sign_span.innerText = "X";
        }
    }
}

function create_arr(){
    let arr = [];
    let temp_arr = [];
    for(let i = 0; i < slots.length; i++){
        current_slot = slots[i];

        try{
            temp_arr.push(current_slot.firstChild.innerHTML);
        }
        catch{
            temp_arr.push("none");
        }

        if (temp_arr.length == 3){
            arr.push(temp_arr);
            temp_arr = [];
        }   
    }
    return arr;
}
function tie_check(board){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if (board[i][j] == "none"){
                return false;
            }
        }
    }
    return true;
}

function diagonal_check(board){
    if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != "none"){
        return board[0][0];
    }
    if(board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != "none"){
        return board[0][2];
    }
    return "none";
}
function vertical_check(board){
    for(let i = 0; i < board.length; i++){

        if(board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] != "none"){
            return board[0][i];
        }
    }
    return "none"; 
}
function horizontal_check(board){
    for(let i = 0; i < board.length; i++){

        if(board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] != "none"){
            return board[i][0];
        }
    }
    return "none";    
}
function check_win(board){
    let horizontal = horizontal_check(board);
    let vertical = vertical_check(board);
    let diagonal = diagonal_check(board);
    if (horizontal != "none"){
        return horizontal;
    }
    if (vertical != "none"){
        return vertical;
    }
    if (diagonal != "none"){
        return diagonal;
    }
    return null;
}

function win_func(winner){
    game_state = "done";


    let winner_sign = document.getElementById("win-sign");
    let winner_div = document.getElementById("title-win");

    winner_sign.innerText = winner;

    if (winner == "O"){
        winner_sign.style.color = "blue";
    }
    if(winner == "X"){
        winner_sign.style.color = "red";
    }
    winner_div.classList.add("appear");
    setTimeout(() => {
        winner_div.classList.remove("appear");
    }, 750);

    current_sign = "X";
    sign_span.innerHTML = "X";
    sign_span.style.color = "red";
    winner_div.style.opacity = 1;
}

function draw_func(){
    console.log("in")
    game_state = "done";

    let winner_div = document.getElementById("title-win");
    let winner_sign = document.getElementById("win-sign");

    winner_sign.innerText = "NO ONE";
    winner_sign.style.color = "goldenrod";

    winner_div.classList.add("appear");
    setTimeout(() => {
        winner_div.classList.remove("appear");
    }, 750);

    current_sign = "X";
    sign_span.innerHTML = "X";
    sign_span.style.color = "red";
    winner_div.style.opacity = 1;
}


function add_listeners(){ 

    onkeydown = function(e) {
        e = e || window.event;
        if(e.key == "g"){
            if (game_state == "done"){
                for(let i = 0; i < slots.length; i++){
                    slots[i].innerHTML = "";
                }
                game_state = "ongoing";
                let winner_div = document.getElementById("title-win")
                winner_div.style.opacity = 0;
                add_listeners();
            }
        }
    }   

    for(let i = 0; i < slots.length; i++){
        let current = slots[i];
        current.addEventListener("click", function(){
           if(game_state == "ongoing"){ 
                add_sign(current);

                let board_arr = create_arr();
                let win_check = check_win(board_arr);
                let tie_check1  = tie_check(board_arr);
                console.log(win_check)
                if (win_check != null){
                    win_func(win_check);
                }
                if(tie_check1 == true){
                    draw_func();
                }

            }
        })
    }
}

fix_width();
add_listeners();