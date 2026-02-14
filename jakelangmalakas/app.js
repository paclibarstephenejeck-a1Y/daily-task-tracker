const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

render();

/* EVENTS */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

clearDoneBtn.addEventListener("click", function() {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

clearAllBtn.addEventListener("click", function() {
  tasks = [];
  save();
  render();
});

/* FUNCTIONS */

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Please type a task first.");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.unshift(newTask);
  taskInput.value = "";

  save();
  render();
}

function render() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "item" + (task.done ? " done" : "");

    const left = document.createElement("div");
    left.className = "left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", function() {
      task.done = checkbox.checked;
      save();
      render();
    });

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.className = "smallBtn";
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", function() {
      tasks = tasks.filter(t => t.id !== task.id);
      save();
      render();
    });

    left.appendChild(checkbox);
    left.appendChild(span);
    li.appendChild(left);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  totalCount.textContent = "Total: " + tasks.length;
  doneCount.textContent =
    "Done: " + tasks.filter(t => t.done).length;
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
