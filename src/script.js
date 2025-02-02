const timer = document.querySelector('.timer');
const start = document.querySelector('.start-timer');
const add5 = document.querySelector(`.add-5`);
const sub5 = document.querySelector(`.sub-5`);
const reset = document.querySelector(`.reset-timer`);
let interval;
let isRunning = false;
let currentMM = 25;
let currentSS = 0;

document.addEventListener('DOMContentLoaded', () => {
    start.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            start.textContent = 'stop';
            
            const startTime = timer.textContent;
            currentMM = parseInt(startTime.slice(0, 2), 10);
            currentSS = parseInt(startTime.slice(3, 5), 10);
            
            countdown();
        } else {
            isRunning = false;
            start.textContent = 'start';
            clearInterval(interval);
        }
    });

    reset.addEventListener('click', () => {
        currentMM = 25;
        currentSS = 0;
        updateDisplay();
    });

    add5.addEventListener('click', () => {
        currentMM = Number(timer.textContent.slice(0,2)) + 5;
        updateDisplay();
        currentMM = timer.textContent.slice(0,2);
        currentSS = timer.textContent.slice(3,5);
    });

    sub5.addEventListener('click', () => {
        currentMM = Number(timer.textContent.slice(0,2)) - 5;
        updateDisplay();
        currentMM = timer.textContent.slice(0,2);
        currentSS = timer.textContent.slice(3,5);
    });
});



function countdown() {
    interval = setInterval(() => {
        updateDisplay();

        if (currentMM === 0 && currentSS === 0) {
            clearInterval(interval);
            isRunning = false;
            start.textContent = 'start';
            return;
        }

        if (currentSS === 0) {
            currentMM--;
            currentSS = 59;
        } else {
            currentSS--;
        }
    }, 1000);
}

function updateDisplay() {
    timer.textContent = `${String(currentMM).padStart(2, '0')}:${String(currentSS).padStart(2, '0')}`;
}