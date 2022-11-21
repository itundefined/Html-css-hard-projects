// all rules
(function(){

    const trigger = document.querySelector(".moveButton");
    const allCard = document.querySelectorAll(".cards");
    const allMovesList = ["rock", "paper", "scissor", "spock", "lizard"];
    const gamelost = new Audio('../assets/lostgame.wav');
    const shortlose = new Audio('../assets/shortlose.wav');
    const gamewon = new Audio('../assets/wongame.wav');
    const winshort = new Audio('../assets/shortwin.wav');

    function showCards() {
        for (const element of allCard) {
            element.classList.remove("addblur");
            element.classList.add("removeblur");
            element.classList.remove("extrablur");
        }
    }

    function hideCards() {
        for (const element of allCard) {
            element.classList.remove("removeblur");
            element.classList.add("addblur");
            element.classList.add("extrablur");
        }
    }
    
    function increaseScore(whose) {
        if(whose === "player"){
            const player = document.querySelector("#playerScore");
            let currentScore = parseInt(player.innerHTML);
            currentScore++;
            player.innerHTML = currentScore;
            if(currentScore % 10 === 0) {
                gamewon.play();
            }
            else{winshort.play();}
        }
        
        else if(whose === "computer") {
            const computer = document.querySelector("#computerScore");
            let currentScore = parseInt(computer.innerHTML);
            currentScore++;
            computer.innerHTML = currentScore;
            if(currentScore % 10 === 0) {
                gamelost.play();
            }
            else{shortlose.play();}
        }
    }


    function outCome(playerMove) {
        const computerMove = allMovesList[Math.floor(Math.random() * 5)].toLowerCase();

        const rulesBook = {
            "rock": ["lizard", "scissor"],
            "spock": ["rock", "scissor"],
            "lizard":["spock", "paper"],
            "scissor":["lizard", "paper"],
            "paper":["spock", "rock"]
        }

        const [playerCardtext, computerCardtext] = document.querySelectorAll(".cards > p");
        playerCardtext.innerHTML = playerMove;
        computerCardtext.innerHTML = computerMove;


        if(rulesBook[computerMove].includes(playerMove)) {
            increaseScore("computer");
        }

        else if(rulesBook[playerMove].includes(computerMove)){
            increaseScore("player");
        }

        else{
            alert("tie")
        }

        setTimeout(() => {
            hideCards();
        }, 1500);

    }


    trigger.addEventListener("click", function(event){
        const PlayerchoosedMove = document.querySelector("#classicGame").value.toString().toLowerCase();

        // only if the one of the cards's classlist ===== NOT NOT NOT ===== contains the visible classes such as remove blur

        if(!allCard[0].classList.contains("removeblur")) {
            showCards();
            outCome(PlayerchoosedMove);
        }

    })


})();


(function bgMusic(){
    const backgroundMusic  = new Audio('../assets/bgMusic.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();
})();