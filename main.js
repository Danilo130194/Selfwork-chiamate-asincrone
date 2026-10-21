// Elementi HTML
let secondsInput = document.querySelector('#secondsInput');
let timerDisplay = document.querySelector('#timerDisplay');
let statusMessage = document.querySelector('#statusMessage');
let startButton = document.querySelector('#startButton');
let pauseButton = document.querySelector('#pauseButton');
let resetButton = document.querySelector('#resetButton');


let intervalId = null;

// remainingSeconds conserva il tempo rimasto anche quando mettiamo in pausa
// null significa che non abbiamo ancora avviato un countdown (o è stato azzerato)
let remainingSeconds = null;

// Mostra il tempo in formato minuti:secondi, 
function updateDisplay(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(secondsLeft).padStart(2, '0');

    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Fa partire il countdown oppure riprende 
function startCountdown() {
    // Evita di avviare più setInterval contemporaneamente
    if (intervalId !== null) {
        return;
    }

    // Se remainingSeconds è null, è un nuovo countdown: leggiamo l'input
    // Se invece ha già un valore, riprendiamo dal tempo rimasto in memoria
    if (remainingSeconds === null) {
        let inputValue = secondsInput.value.trim();
        let selectedSeconds = Number(inputValue);

        if (inputValue === '' || !Number.isInteger(selectedSeconds) || selectedSeconds <= 0) {
            statusMessage.textContent = 'Inserisci un numero intero di secondi maggiore di zero.';
            return;
        }

        remainingSeconds = selectedSeconds;
    }

    // stop finché il countdown non viene completato o azzerato
    secondsInput.disabled = true;
    updateDisplay(remainingSeconds);
    statusMessage.textContent = 'Countdown in corso...';
    startButton.disabled = true;
    pauseButton.disabled = false;

    
    intervalId = setInterval(() => {
        remainingSeconds--;
        updateDisplay(remainingSeconds);

        // Quando arriviamo a zero, fermo l'intervallo
        if (remainingSeconds <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            remainingSeconds = null;

            secondsInput.disabled = false;
            startButton.disabled = false;
            pauseButton.disabled = true;
            statusMessage.textContent = 'Tempo scaduto!';
        }
    }, 1000);
}

// Pausa e riprendi
function pauseCountdown() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;

        startButton.disabled = false;
        pauseButton.disabled = true;
        statusMessage.textContent = 'Countdown in pausa. Premi Avvia / Riprendi per continuare.';
    }
}

// Azzera
function resetCountdown() {
    clearInterval(intervalId);
    intervalId = null;
    remainingSeconds = null;

    secondsInput.value = '';
    secondsInput.disabled = false;
    updateDisplay(0);

    startButton.disabled = false;
    pauseButton.disabled = true;
    statusMessage.textContent = 'Timer azzerato. Inserisci i secondi e premi Avvia.';
}

// pulsanti
startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resetButton.addEventListener('click', resetCountdown);
