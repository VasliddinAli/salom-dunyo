const todoListDisplay = document.querySelector("#todolist-content");
const addTodoInput = document.querySelector("#add-todo");
const submitTodoButton = document.querySelector("#submit-todo");
let todoList = [];

submitTodoButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (addTodoInput.value.trim() != "" && submitTodoButton.value == "Submit") {
    let todo = {
      id: Math.floor(Math.random() * 10000) + todoList.length,
      content: addTodoInput.value,
    };
    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    addTodoInput.value = "";
    displayTodoList();
  }
});

function displayTodoList() {
  let todoListContent = "";
  todoList.forEach((todo) => {
    todoListContent += `<div class="basic">
        <div class="message">
          ${todo.content}
        </div>
        <div class="btns">
          <i data-id="${todo.id}" class="removeBtn fa-solid fa-trash"></i>
          <i data-id="${todo.id}" class="updateBtn fa-solid fa-pen-to-square"></i>
        </div>
        </div>`;
  });
  todoListDisplay.innerHTML = todoListContent;
}



window.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeBtn")) {
    todoList.forEach((todo) => {
      if (todo.id == e.target.dataset.id) {
        todoList.splice(todoList.indexOf(todo), 1);
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTodoList();
  }

  if (e.target.classList.contains("updateBtn")) {
    todoList.forEach((todo) => {
      if (todo.id == e.target.dataset.id) {
        submitTodoButton.value = "Save";
        addTodoInput.value = todo.content;
        addTodoInput.focus();
        submitTodoButton.onclick = (btn) => {
          btn.preventDefault();
          if (btn.target.value == "Save") {
            todo.content = addTodoInput.value;
            addTodoInput.value = "";
            e.target.value = "Submit";
            displayTodoList();
            localStorage.setItem("todoList", JSON.stringify(todoList));
          }
        };
      }
    });
  }
});



if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  displayTodoList();
}
