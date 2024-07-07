// document.addEventListener("DOMContentLoaded", () => {
//   const taskInput = document.getElementById("taskInput");
//   const addTaskButton = document.getElementById("addTaskButton");
//   const taskList = document.getElementById("taskList");

//   // Adding/Removing/Toggle Tasks Functions

//   function addTask(taskText) {
//     const li = document.createElement("li");
//     li.textContent = taskText;

//     taskList.appendChild(li);
//   }

//   // Adding Tasks
//   addTaskButton.addEventListener("click", () => {
//     const taskText = taskInput.value.trim();
//     if (taskText) {
//       addTask(taskText);
//       taskInput.value = "";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const addTaskButton = document.getElementById("addTaskButton");

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = "";
      }
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
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
    });

    actions.appendChild(deleteButton);
    li.appendChild(actions);
    taskList.insertBefore(li, taskList.firstChild);
  }

  function removeTask(taskElement) {
    taskElement.remove();
  }
});
