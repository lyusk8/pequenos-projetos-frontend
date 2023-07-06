const cards  = [1, 1, 2, 2, 3, 3, 4, 4];

async function generateImagePairs(){
    const imagePairs = {};

    for(let i = 0; i < cards.length; i++){
        if(!imagePairs[cards[i]]){
            const id = Math.floor(Math.random() * 1000) + 1;
            const url = `https://picsum.photos/id/${id}/300/400`;
            imagePairs[cards[i]] = [url, url];
        }
    }
    return imagePairs;
}

function shuffleCards(cards){
    cards.sort(() => Math.random() - 0.5);
}

async function createCards(){
    const imagePairs = await generateImagePairs();
    shuffleCards(cards);
    const cardList = document.querySelector(".container");
    for(let i = 0; i < cards.length; i++){
        const card = document.createElement("div");
        const cardBack = document.createElement("div");
        const cardFront = document.createElement("div");
        card.classList.add("card");
        cardBack.classList.add("back");
        cardFront.classList.add("front")
        cardBack.style.backgroundImage = `url('img/card-back.png')`;
        const cardNumber = cards[i];
        const cardImage = imagePairs[cardNumber].pop();
        cardFront.style.backgroundImage = `url(${cardImage})`;
        card.setAttribute("data-card", cardNumber);
        card.appendChild(cardBack)
        card.appendChild(cardFront);
        card.addEventListener("click", flipCards);
        cardList.appendChild(card);
    }
}

let flippedCards = 0;
let firstCard, secondCard;
let attempts = 0;

function flipCards(){
   if(flippedCards < 2 && !this.classList.contains("flip")){
    flippedCards++;
    this.classList.add("flip");
    if(flippedCards === 1){
        firstCard = this;        
    } else {
        secondCard = this;
        attempts++;
        updateAttempts();
        checkForMatch();
    }
   }
}

function CheckForMatch(){
    const isMatch = firstCard.getAttribute("data-card") ===
    secondCard.getAttribute("data-card");
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener("click", flipCards);
    secondtCard.removeEventListener("click", flipCards);

    if(document.querySelectorAll(".card:not(.flip)").length === 0){
        showCongratulations();
    }

    resetBoard()
}

function unflipCards(){
    setTimeout(()=>{
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

function resetBoard(){
    [flippedCards, firstCard, secondCard] = [0, null, null];
}

function updateAttempts(){
    const attemptsElement = document.querySelector(".attempts");
    attemptsElement.textContent = `Tentativas: ${attempts}`;
}

function showCongratulations() {
    const congratulationsContainer = document.querySelector(
      ".congratulations-container"
    );
    const congratulationsElement = document.createElement("p");
    congratulationsElement.classList.add("congratulations");
    congratulationsElement.textContent = `Parabéns! Você venceu em ${attempts} tentativas!`;
    congratulationsContainer.appendChild(congratulationsElement);
  }

createCards()