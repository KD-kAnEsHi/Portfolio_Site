const habits = ["Workout"];
const year = new Date().getFullYear();
let habitData = JSON.parse(localStorage.getItem("habitData")) || {};

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function renderHabits() {
  const container = document.getElementById("habits-container");
  container.innerHTML = "";

  habits.forEach((habit) => {
    const block = document.createElement("div");
    block.classList.add("habit-block");

    const title = document.createElement("div");
    title.classList.add("habit-title");
    title.textContent = habit;
    block.appendChild(title);

    const yearRow = document.createElement("div");
    yearRow.classList.add("year-row");

    for (let month = 0; month < 12; month++) {
      const monthDiv = document.createElement("div");
      monthDiv.classList.add("month");

      const monthName = new Date(year, month).toLocaleString("default", { month: "short" });
      const monthLabel = document.createElement("div");
      monthLabel.classList.add("month-name");
      monthLabel.textContent = monthName;
      monthDiv.appendChild(monthLabel);

      const heatmap = document.createElement("div");
      heatmap.classList.add("heatmap");

      const days = getDaysInMonth(month, year);
      for (let day = 1; day <= days; day++) {
        const date = new Date(year, month, day);
        const key = `${habit}_${formatDate(date)}`;
        const square = document.createElement("div");
        square.classList.add("square");
        if (habitData[key]) square.classList.add("active");
        heatmap.appendChild(square);
      }

      monthDiv.appendChild(heatmap);
      yearRow.appendChild(monthDiv);
    }

    block.appendChild(yearRow);
    container.appendChild(block);
  });
}

function logToday() {
  const today = formatDate(new Date());
  habits.forEach((habit) => {
    const key = `${habit}_${today}`;
    habitData[key] = true;
  });
  localStorage.setItem("habitData", JSON.stringify(habitData));
  renderHabits();
}

document.getElementById("log-today").addEventListener("click", logToday);
renderHabits();
