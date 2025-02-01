const app = document.querySelector('#app');
const playQuiz = document.querySelector('#playQuiz');

async function getData(){
    let data=await (await fetch("/quizdata")).json()
    console.log(data);
    return data;
}


function winPopUp(score){
    app.innerHTML+=(
        `<div class="columncontainer" id="popupContainer">
            <!-- Future task me gif add karna hai 
            yaad rakhna ki popupcontainer ki 
            top property heigh sab change kar dena -->
            <h2>Correct Answer</h2>
            <h2>Score: ${score+10}</h2>
            <div class="buttoncontainer" style="width:60%; height:35%">
                <button onclick="window.location.href='/static/homepage.html'">Menu</button>
                <button id='next'>Next</button>
            </div>
        </div>`
    );
}

function losePopUp(score){
    app.innerHTML+=(
        `<div class="columncontainer" id="popupContainer">
            <!-- Future task me gif add karna hai 
            yaad rakhna ki popupcontainer ki 
            top property heigh sab change kar dena -->
            <h2>Wrong Answer</h2>
            <h2>Score: ${score}</h2>
            <div class="buttoncontainer" style="width:60%; height:35%">
                <button onclick="window.location.href='homepage.html'">Menu</button>
                <button id='retry'>Retry</button>
            </div>
        </div>`
    );
}

async function CreateQ(i,score,lives){

    let noOfLives='';
    for(let j=0;j<lives;j++)noOfLives+='❤️';

    let data = await getData();
    app.innerHTML=(
        `        <!-- Q page -->
        <h1>Share Quiz Start 😊</h1>
        <h3 style="width:70%">${data[i].q}</h3>
        <div class="columncontainer" style="height: 100%;">
            <div class="buttoncontainer" style="width:60%; height:10%; position:absolute; bottom: 40%">
                <button id="op1">${data[i]["option 1"]}</button>
                <button id="op2">${data[i]["option 2"]}</button>
            </div>
        </div>
        <div class="columncontainer" style="height: 100%;">
            <div class="buttoncontainer" style="width:60%; height:10%; position:absolute; bottom: 20%">
                <button id="op3">${data[i]["option 3"]}</button>
                <button id="op4">${data[i]["option 4"]}</button>
            </div>
        </div>
        <div class="rowcontainer" style="width:80%; position:absolute; bottom:0%">
            <h5>scrore: ${score}</h5>
            <h5>lives: ${noOfLives} </h5>
        </div>`
    );
    optionLogic(data[i].ans,score);
}

async function optionLogic(ans,score,lives){
    let btn = document.querySelectorAll('button');
    console.log(btn[0]);
    for(let i=0;i<=3;i++){
        if(ans==1+i){btn[i].onclick = function()
            {
            winPopUp(score);
            console.log("dd");
            }
        }
        else {
        btn[i].onclick = function()
            {
            losePopUp(score);
            console.log("dd");
            lives--;
            }
        }
    }
}
// console.log(data);
CreateQ(1,2,3)