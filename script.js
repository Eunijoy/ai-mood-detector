// Simple keyword AI
function analyzeMood(text) {
    text = text.toLowerCase();

    const sadWords = ["sad", "lungkot", "down", "iyak", "pagod", "stress", "heavy", "heavier"];
    const happyWords = ["happy", "saya", "good", "okay", "masaya", "excited"];

    let sadCount = sadWords.filter(w => text.includes(w)).length;
    let happyCount = happyWords.filter(w => text.includes(w)).length;

    if (sadCount > happyCount) return "Stressed";
    if (happyCount > sadCount) return "Happy";

    return "Neutral";
}

// Get elements
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("historyList");
const input = document.getElementById("moodInput");

// load saved entries
let history = JSON.parse(localStorage.getItem("moodHistory") || "[]");

// show history
function renderHistory() {
    list.innerHTML = "";
    history.forEach(entry => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="entry-date">${entry.date}</div>
        <div class="entry-text">${entry.text}</div>
        <span class="mood-tag ${entry.mood.toLowerCase()}">${entry.mood}</span>
    `;

        list.appendChild(li);
    });
}

//save button
saveBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;

    const mood = analyzeMood(text);

    history.unshift({ date: new Date().toLocaleString(), text, mood });
    localStorage.setItem("moodHistory", JSON.stringify(history));

    renderHistory();
    input.value = "";

    notify("Saved successfully!");
};

//clear
clearBtn.onclick = () => {
    input.value = "";
    history = [];
    localStorage.setItem("moodHistory", JSON.stringify(history));
    renderHistory();

    notify("History cleared!");
};


renderHistory();


function notify(msg) {
    const box = document.getElementById("notify");
    box.textContent = msg;
    box.style.display = "block";
    box.style.opacity = "1";

    setTimeout(() => {
        box.style.opacity = "0";
        setTimeout(() => box.style.display = "none", 300);
    }, 1500);
}


// modal
const modal = document.getElementById("summaryModal");
const openBtn = document.getElementById("openSummaryBtn");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = () => modal.style.display = "flex";
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};
