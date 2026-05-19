const input = document.getElementById("todoinput") as HTMLInputElement;
const btn = document.getElementById("myButton") as HTMLButtonElement;
const form = document.getElementById("todoForm") as HTMLFormElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const clearBtn = document.getElementById("clearButton") as HTMLButtonElement;

interface Todo {
    name: string,
    completed: boolean
};

let todos: Todo[] = readTodosFromLocalStorage();
todos.forEach(createTodo); // this will list all todos from local storage when the page is refreshed

function readTodosFromLocalStorage(): Todo[] {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        return JSON.parse(storedTodos);
    }
    return [];
}

readTodosFromLocalStorage();

form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodo: Todo = {
        name: input.value,
        completed: false
    };

    todos.push(newTodo);
    createTodo(newTodo);

    saveTodosToLocalStorage();
    input.value = "";
});

clearBtn?.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos= [];
});

function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(toDo: Todo): void {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = toDo.completed;

    checkbox.addEventListener("change", () => {
        toDo.completed = checkbox.checked;
        saveTodosToLocalStorage();
    });

    const li = document.createElement("li");
    li.append(checkbox);
    li.append(toDo.name);

    todoList.appendChild(li);
}
