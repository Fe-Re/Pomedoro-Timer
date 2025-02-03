const timer = document.querySelector('.timer');
const start = document.querySelector('.start-timer');
const add5 = document.querySelector(`.add-5`);
const sub5 = document.querySelector(`.sub-5`);
const reset = document.querySelector(`.reset-timer`);
const short = document.querySelector(`.short-btn`);
const long = document.querySelector(`.long-btn`);
timer.style.setProperty('--timer-label', "'Work'");
const today = new Date().toISOString().split("T")[0];
const quote = document.querySelector(`.quote`);

let interval;
let isRunning = false;
let currentMM = 25;
let currentSS = 0;

let stats = [{
    date: '2025-02-03',
    workSec: 0,
    breakSec: 0,
}];

if (today !== stats[0].date) {
    stats.unshift({ date: today, workSec: 0, breakSec: 0 });
    console.log(`added new stats object.`);
}

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
        timer.style.setProperty('--timer-label', "'Work'");
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

    short.addEventListener('click', () => {
        const currentLabel = timer.style.getPropertyValue('--timer-label');
        const newLabel = currentLabel === "'Break'" ? "'Work'" : "'Break'";
        timer.style.setProperty('--timer-label', newLabel);
        currentMM = 5;
        updateDisplay();
    });

    long.addEventListener('click', () => {
        const currentLabel = timer.style.getPropertyValue('--timer-label');
        const newLabel = currentLabel === "'Break'" ? "'Work'" : "'Break'";
        timer.style.setProperty('--timer-label', newLabel);
        currentMM = 15;
        updateDisplay();
    });

    loadQuote();
    switchView('timer');
});

function loadQuote(){
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    let quotes = [`“Create with the heart; build with the mind.” ― Criss Jami`,
        `“When you have to make a choice and don’t make it, that in itself is a choice.” ― William James`,
        `“What we fear doing most is usually what we most need to do.” – Tim Ferriss`,
        `“If you spend too much time thinking about a thing, you’ll never get it done.” – Bruce Lee`,
        `“Action is the foundational key to all success.” – Pablo Picasso`,
        `“You may delay, but time will not.” – Benjamin Franklin`,
        `“It is not the mountain we conquer, but ourselves.” ― Sir Edmund Hillary`,
        `“If you love life, don’t waste time, for time is what life is made of.” – Bruce Lee`]

    let randomSelect = getRandomInt(quotes.length);
    quote.innerHTML = quotes[randomSelect];
}



function countdown() {
    interval = setInterval(() => {
        updateDisplay();

        if (currentMM === 0 && currentSS === 0) {
            clearInterval(interval);
            isRunning = false;
            start.textContent = 'start';
            return;
        }

        getWorkOrBreakTime();

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

function switchView(viewId) {


    document.querySelectorAll('.content-container > div').forEach(container => {
      container.classList.add('hidden-view');
      container.classList.remove('active-view');
    });
  
    const activeView = document.querySelector(`.${viewId}-container`);
    if (activeView) {
        activeView.classList.remove('hidden-view');
        activeView.classList.add('active-view');
      } else {
        console.error(`Container für ${viewId} nicht gefunden!`);
      }

    document.querySelectorAll('[data-view]').forEach(link => {
      link.classList.remove('active-tab');
    });
    document.querySelector(`[data-view="${viewId}"]`).classList.add('active-tab');
  }

  document.querySelectorAll('[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = e.currentTarget.dataset.view;
      switchView(viewId);
    });
  });

function getWorkOrBreakTime() {
    const currentLabel = timer.style.getPropertyValue('--timer-label').replace(/'/g, "");
    if(currentLabel === 'Work'){
        const start = Date.now();
        console.log('work starting timer...');
        setTimeout(() => {
            const millis = Date.now() - start;
            console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
        }, 1000);
        stats[0].workSec += 1;
        console.log(stats[0].workSec);
    }   
    if(currentLabel === 'Break'){
        const start = Date.now();
        console.log('break starting timer...');
        setTimeout(() => {
            const millis = Date.now() - start;
            console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
        }, 1000);
        stats[0].breakSec += 1;
        console.log(stats[0].breakSec);
    }
}