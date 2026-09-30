const form = document.getElementById("habit-form");
const input = document.getElementById("habit-input");
const list = document.getElementById("habit-list");
const progress = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");
const emptyMessage = document.getElementById("empty-message");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function updateProgress() {
    const total = habits.length;
    const completed = habits.filter(function (habit) {
        return habit.completed;
    }).length;

    progress.textContent = completed + " of " + total + " habits completed";

    const percentage = total === 0 ? 0 : (completed / total) * 100;
    progressFill.style.width = percentage + "%";

    emptyMessage.style.display = total === 0 ? "block" : "none";
}

function renderHabits() {
    list.innerHTML = "";

    habits.forEach(function (habit) {
        const li = document.createElement("li");
        if (habit.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.completed;

        const span = document.createElement("span");
        span.textContent = habit.name;

        checkbox.addEventListener("change", function () {
            habit.completed = checkbox.checked;
            saveHabits();
            renderHabits();
        });

                const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            habits = habits.filter(function (h) {
                return h !== habit;
            });
            saveHabits();
            renderHabits();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateProgress();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const habitName = input.value.trim();
    if (habitName === "") return;

    habits.push({ name: habitName, completed: false });
    saveHabits();
    renderHabits();

    input.value = "";
});

renderHabits();