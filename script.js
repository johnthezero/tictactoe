let currentChar="X";
let currentPlayer=1;
let messageDisplay=document.querySelector(".message");

let current=`Player ${currentPlayer} turn`;
let winMessage=`Player ${currentPlayer} WINS!!`;
let resetBtn=document.querySelector(".restart");
let positions=document.querySelectorAll(".cell");
messageDisplay.innerText=current;
let counter=0;

let stop=false;
const p1=[];
const p2=[];
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];



  ///MAIN

  addListeners();
  

  //FUNCTIONS

function isWon(array){
    let win=false;
    let counter=0;
    for(let j=0;j<8 && !win ;j++){
        win=array.includes(winCombinations[j][0]) && array.includes(winCombinations[j][1]) && array.includes(winCombinations[j][2]);
    }
    return win;
}
function changeCurrent(){
    if(currentChar=='X'){
        currentChar='O';
        currentPlayer=2;
    }else {
        currentChar='X';
        currentPlayer=1;
    }
    current=`Player ${currentPlayer} turn`;
    console.log(current);
}

function add(pos){
    if(counter%2==0){
        p1.push(pos);
        stop=(isWon(p1) || ((p1.length+p2.length)==9));
    }else {
        p2.push(pos);
        stop=(isWon(p1) || ((p1.length+p2.length)==9));
    }
    counter++;
    if(stop){
        removeListeners();
        if(!isWon(p1) && !isWon(p2)){
            winMessage=`DRAW !!`;
        }
        messageDisplay.innerText=winMessage;
    }else {
        changeCurrent();
        messageDisplay.innerText=current;
    }
}
function addListeners(){
    for(let i=0;i<positions.length;i++){
        positions[i].addEventListener("click",func,{once :true});
    }
    resetBtn.addEventListener("click",reset);

}
function removeListeners(){
        for(let i=0;i<positions.length;i++){
            positions[i].removeEventListener("click",func);
        }   
}
function reset(){
    positions=document.querySelectorAll(".cell");
    counter=0;
    p1.length=0;
    p2.length=0;
    currentChar="X";
    currentPlayer=1;
    for(let i=0;i<positions.length;i++){
        positions[i].innerHTML="";
    }
    current=`Player ${currentPlayer} turn`;
    winMessage=`Player ${currentPlayer} WINS!!`;
    messageDisplay.innerText=current;
    stop=false;
    removeListeners();
    addListeners();
}

function func (event){
    event.target.innerHTML=currentChar;
    messageDisplay.innerText=current;
    add(getPosition(event));
}
function getPosition(event){
    let position;
    switch (event.target){
        case positions[0] : position=0;break;
        case positions[1] : position=1;break;
        case positions[2] : position=2;break;
        case positions[3] : position=3;break;
        case positions[4] : position=4;break;
        case positions[5] : position=5;break;
        case positions[6] : position=6;break;
        case positions[7] : position=7;break;
        case positions[8] : position=8;break;
        default : break;
    }
    return position;
}










