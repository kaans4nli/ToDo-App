// Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);
    li.innerHTML = `
      <span>${task.name}</span>
      <div class="action-buttons">
        <button onclick="toggleComplete(${index})">✓</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    const newTask = { name: taskName, completed: false };
    tasks.push(newTask);
    taskInput.value = "";
    updateLocalStorage();
    displayTasks();
  }
});

function filterTasks() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const listItems = document.querySelectorAll("#taskList li");

  listItems.forEach((item) => {
    const span = item.querySelector("span");
    const taskText = span.textContent;
    const lowerText = taskText.toLowerCase();

    if (lowerText.includes(search)) {
      // Vurgulama yapılacak kısmı span içinde göster
      const startIndex = lowerText.indexOf(search);
      const endIndex = startIndex + search.length;

      const highlighted =
        taskText.slice(0, startIndex) +
        `<mark>${taskText.slice(startIndex, endIndex)}</mark>` +
        taskText.slice(endIndex);

      span.innerHTML = highlighted;

      item.style.display = "flex";
      item.classList.remove("fadeOut");
      item.classList.add("fadeIn");
    } else {
      item.classList.remove("fadeIn");
      item.classList.add("fadeOut");
      setTimeout(() => {
        item.style.display = "none";
        span.innerHTML = taskText; // Orijinali geri yükle
      }, 300);
    }

    if (search === "") {
      span.innerHTML = taskText; // Arama boşsa vurgulamayı kaldır
    }
  });
}

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  displayTasks();
}

function bounceButton(btn) {
  btn.classList.add("button-pop");
  setTimeout(() => btn.classList.remove("button-pop"), 300);
}
// Delete task
function deleteTask(index) {
  const btn = document.querySelectorAll(".action-buttons button")[
    index * 2 + 1
  ]; // ikinci buton (delete)
  bounceButton(btn);
  tasks.splice(index, 1);
  updateLocalStorage();
  displayTasks();
}

// Update LocalStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial display
displayTasks();
