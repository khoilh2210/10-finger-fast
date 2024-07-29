const wordsArray = ["hello", "world", "javascript", "coding", "challenge", "typing", "test", "speed", "accuracy", "random", "words", "keyboard", "practice"];
let timeLimit, timer, wordsTyped = 0, correctChars = 0, totalChars = 0, interval;

function startTest() {
    const timeInput = document.getElementById("time-limit");
    timeLimit = parseInt(timeInput.value) * 60;

    displayNewWords();
    document.getElementById("user-input").disabled = false;
    document.getElementById("user-input").value = "";
    document.getElementById("user-input").focus();

    document.getElementById("time-left").textContent = formatTime(timeLimit);

    wordsTyped = 0;
    correctChars = 0;
    totalChars = 0;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    clearTimeout(interval);
    interval = setTimeout(endTest, timeLimit * 1000);
}

function generateRandomWords() {
    return wordsArray.sort(() => Math.random() - 0.5).join(" ");
}

function displayNewWords() {
    document.getElementById("random-words").innerHTML = generateRandomWords();
}

function updateTimer() {
    timeLimit--;
    document.getElementById("time-left").textContent = formatTime(timeLimit);

    if (timeLimit <= 0) {
        clearInterval(timer);
        endTest();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function endTest() {
    document.getElementById("user-input").disabled = true;
    clearInterval(timer);
    clearTimeout(interval);
    showResults();
}

document.getElementById("user-input").addEventListener("input", (e) => {
    const inputText = e.target.value;
    const randomWordsText = document.getElementById("random-words").textContent;
    totalChars = inputText.length;
    correctChars = 0;

    let highlightedText = '';

    for (let i = 0; i < randomWordsText.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === randomWordsText[i]) {
                highlightedText += `<span class="correct">${randomWordsText[i]}</span>`;
                correctChars++;
            } else {
                highlightedText += `<span class="incorrect">${randomWordsText[i]}</span>`;
            }
        } else {
            highlightedText += randomWordsText[i];
        }
    }

    document.getElementById("random-words").innerHTML = highlightedText;

    if (inputText.trim() === randomWordsText.trim()) {
        wordsTyped++;
        e.target.value = "";
        displayNewWords();
    }
});

function showResults() {
    const timeInput = document.getElementById("time-limit").value;
    const timeInMinutes = parseInt(timeInput) || 1;
    const wpm = (wordsTyped / timeInMinutes) * 60;
    const accuracy = (correctChars / totalChars) * 100;

    document.getElementById("wpm").textContent = `WPM: ${wpm.toFixed(2)}`;
    document.getElementById("accuracy").textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
}
