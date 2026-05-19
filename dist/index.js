"use strict";
var input = document.getElementById("todoinput");
var btn = document.getElementById("myButton");
var form = document.getElementById("todoForm");
var todoList = document.getElementById("todoList");
var clearBtn = document.getElementById("clearButton");
;
var todos = readTodosFromLocalStorage();
todos.forEach(createTodo); // this will list all todos from local storage when the page is refreshed
function readTodosFromLocalStorage() {
    var storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        return JSON.parse(storedTodos);
    }
    return [];
}
readTodosFromLocalStorage();
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    var newTodo = {
        name: input.value,
        completed: false
    };
    todos.push(newTodo);
    createTodo(newTodo);
    saveTodosToLocalStorage();
    input.value = "";
});
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener("click", function () {
    todoList.innerHTML = "";
    todos = [];
});
function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function createTodo(toDo) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = toDo.completed;
    checkbox.addEventListener("change", function () {
        toDo.completed = checkbox.checked;
        saveTodosToLocalStorage();
    });
    var li = document.createElement("li");
    li.append(checkbox);
    li.append(toDo.name);
    todoList.appendChild(li);
}
