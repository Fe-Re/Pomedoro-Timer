const timer = document.querySelector('.timer');
const start = document.querySelector('.start-timer');
let interval; 

start.addEventListener('click', () => {
    console.log(`Timer started!`);
    if(interval) clearInterval(interval);
    
    const startTime = timer.textContent;
    let mm = parseInt(startTime.slice(0, 2), 10);
    let ss = parseInt(startTime.slice(3, 5), 10);
    
    countdown(mm, ss);

    start.textContent = `stop`;
});

function countdown(mm, ss) {
    interval = setInterval(() => {


        const displayMM = String(mm).padStart(2, '0');
        const displaySS = String(ss).padStart(2, '0');
        timer.textContent = `${displayMM}:${displaySS}`;

        if(mm === 0 && ss === 0) {
            clearInterval(interval);
            timer.textContent = "00:00";
            return;
        }

        if(ss === 0) {
            mm--;
            ss = 59;
        } else {
            ss--;
        }


    }, 1000);
}