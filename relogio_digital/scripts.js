function updateClock(){
    const hourElement = document.querySelector(".hours");
    const minuteElement = document.querySelector(".minutes");
    const secondElement = document.querySelector(".seconds");
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);

    hourElement.textContent = hours;
    minuteElement.textContent = minutes;
    secondElement.textContent = seconds

}

setInterval(updateClock, 1000);