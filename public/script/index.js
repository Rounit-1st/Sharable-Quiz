const app = document.querySelector('#app');
const playQuiz = document.querySelector('#playQuiz');

async function getData(){
    let data=await (await fetch("/quizdata")).json()
    console.log(data);
    return data;
}


function winPopUp(score,lives){
    // lives
    console.log("dfkdmdf");
    app.innerHTML+=(
        `<div class="columncontainer" id="popupContainer">
            <!-- Future task me gif add karna hai 
            yaad rakhna ki popupcontainer ki 
            top property heigh sab change kar dena -->
            <h2>Correct Answer</h2>
            <h2>Score: ${score+10}</h2>
            <div class="buttoncontainer" style="width:60%; height:35%">
                <button onclick="window.location.href='/'">Menu</button>
                <button id='next'>Next</button>
            </div>
        </div>`
    );
}

async function losePopUp(score,lives){
    lives--;
    app.innerHTML+=(
        `<div class="columncontainer" id="popupContainer">
            <!-- Future task me gif add karna hai 
            yaad rakhna ki popupcontainer ki 
            top property heigh sab change kar dena -->
            <h2>Wrong Answer</h2>
            <h2>Score: ${score}</h2>
            <div class="buttoncontainer" style="width:60%; height:35%">
                <button onclick="window.location.href='/'">Menu</button>
                <button id='retry'>Retry</button>
            </div>
        </div>`
    );
}

async function createQ(lives,score,QueryObject){
    let livesString="";
    for(let i=0;i<lives;i++)livesString+='❤️';
    app.innerHTML=`
        <h1>Share Quiz Start 😊</h1>
        <h3 style="width:70%">${QueryObject.q}</h3>
        <div class="columncontainer" style="height: 100%;">
            <div class="buttoncontainer" style="width:60%; height:10%; position:absolute; bottom: 40%">
                <button>${QueryObject["option 1"]}</button>
                <button>${QueryObject["option 2"]}</button>
            </div>
        </div>
        <div class="columncontainer" style="height: 100%;">
            <div class="buttoncontainer" style="width:60%; height:10%; position:absolute; bottom: 20%">
                <button>${QueryObject["option 3"]}</button>
                <button>${QueryObject["option 4"]}</button>
            </div>
        </div>
        <div class="rowcontainer" style="width:80%; position:absolute; bottom:0%">
            <h5>scrore: ${score}</h5>
            <h5>lives: ${livesString}</h5>
        </div>
    `;
    let optionArray;
    return optionArray= await selectOptionButton();
}

async function selectOptionButton (){
    let optionButtonArray = document.querySelectorAll("button");
    console.log(optionButtonArray);
    return optionButtonArray;
    
}

function loadResult(){
    app.innerHTML=`
        <h1>Quiz Score: ${score} 🥳</h1>
        <div class="buttoncontainer" style="width:80%; margin-top:20%;">
            <button style="height:10vh" onclick="window.location.href='homepage.html'">Menu</button>
            <button style="height:10vh">Retry Quiz</button>
        </div>
    `
}

function getSelectedOption(optionArray){
    // chatgpt code bhenchod pata nhi kya hai iss function me
    return new Promise((resolve) => {
        optionArray.forEach((button, index) => {
            button.onclick = function () {
                resolve(index); // Return the index of the clicked button
            };
        });
    });
}

playQuiz.onclick = async function () {
    let i=0;
    let lives=3;
    let score=0;
    let data = await getData();
    let n=data.length;
    console.log(data[0]);
    while(i<n){
        let ans=data[i].ans;
        console.log(ans);
        
        let optionArray = await createQ(lives,score,data[i]);
        let selectedIndexFromArray = await getSelectedOption(optionArray);
        if(selectedIndexFromArray+1==ans){
            winPopUp(score,lives)
        }
        else {
            await losePopUp(score,lives);
            
        }
        // bad code idk chatgpt told me
        // document.querySelector("#next").onclick = function(){i++;}
        // document.querySelector("#retry").onclick = function(){
        //     if(lives<0){
        //         window.alert("No More Lives Left")
        //         i=n;
        //     }
        //     else {
                
        //     }
        // };
        // await waitForNextButton();
        
    }
    loadResult(score);
};

function waitForNextButton() {
    return new Promise((resolve) => {
        document.querySelector("#next").onclick = function () {
            resolve();
        };
    });
}