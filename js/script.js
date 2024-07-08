document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const addTaskButton = document.getElementById("addTaskButton");

  loadTasks();

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = "";
      saveTasks();
    }
  });

  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = "";
        saveTasks();
      }
    }
  });

  function addTask(taskText, completed = false) {
    const li = document.createElement("li");
    li.textContent = taskText;
    if (completed) {
      li.classList.add("completed");
    }
    taskList.appendChild(li);

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const deleteButton = document.createElement("div");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete");
    actions.appendChild(deleteButton);

    const completeCheckbox = document.createElement("input");
    completeCheckbox.setAttribute("type", "checkbox");
    completeCheckbox.classList.add("completed");
    completeCheckbox.checked = completed;
    actions.appendChild(completeCheckbox);

    deleteButton.addEventListener("click", () => {
      removeTask(li);
    });

    completeCheckbox.addEventListener("change", () => {
      if (completeCheckbox.checked) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }
      saveTasks();
    });

    li.appendChild(actions);
    taskList.insertBefore(li, taskList.firstChild);
  }

  function removeTask(taskElement) {
    taskElement.remove();
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((task) => {
      tasks.push({
        text: task.firstChild.textContent.trim(),
        completed: task.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.reverse().forEach((task) => addTask(task.text, task.completed));
  }
});
