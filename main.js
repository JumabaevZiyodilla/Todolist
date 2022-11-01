// IMPORT HTML ELEMENTS
const elForm = document.querySelector(".wrap__form");
const elInput = elForm.querySelector(".wrap__input");
const elBtn = elForm.querySelector(".wrap__btn");
const elList = document.querySelector(".list");

let completed = document.querySelector(".completed");
let uncompleted = document.querySelector(".uncompleted");
let all = document.querySelector(".all");

const LocalTodos = JSON.parse(window.localStorage.getItem('todos'));
const todos = LocalTodos || [];

let initialId = 0;
let count = {
    completed: 0,
    uncompleted: 0,
    all: 0,
}

const renderArray = function (array, wrapper) {
    wrapper.innerHTML = "";

    let isComp = todos.filter((add) =>{
        return add.isCompleted == false;
    });
    uncompleted.textContent = isComp.length
    let isCheck = todos.filter((param) =>{
        return param.isCompleted == true;
    });
    completed.textContent = isCheck.length;
    all.textContent = array.length;

    array.forEach(function (element) {

        const items = document.createElement("li");
        items.classList.add("items");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "user_checkbox"
        checkbox.classList.add("input_checkbox");
        checkbox.dataset.id = element.id;
        items.appendChild(checkbox);

        const text = document.createElement("p");
        text.textContent = element.title;
        text.classList.add("text");
        items.appendChild(text);

        if (element.isCompleted) {
            checkbox.checked = true;
            text.style.textDecoration = "line-through";
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.dataset.id = element.id;
        editButton.classList.add("btn_edit");
        items.appendChild(editButton);
        wrapper.appendChild(items);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = element.id;
        deleteButton.classList.add("btn_remove");
        items.appendChild(deleteButton);
    });

};
renderArray(todos, elList);
const formTypes = {
    SAVE: "save",
    EDIT: "edit",
}

let formType = formTypes.SAVE;
let editingId = null;

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (formType === formTypes.SAVE) {
        todos.push({
            id: ++initialId,
            title: elInput.value,
            isCompleted: false,

        });
        elForm.reset();
        window.localStorage.setItem("todos", JSON.stringify(todos));
        renderArray(todos, elList);
    }
    if (formType === formTypes.EDIT) {
        const obj = {
            id: editingId,
            title: elInput.value,
            isCompleted: false,
        };

        const editingFoundIndex = todos.findIndex(function (todo) {
            return todo.id === obj.id;
        });
        todos.splice(editingFoundIndex, 1, obj);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        formType = formTypes.SAVE;
        renderArray(todos, elList);
        elBtn.textContent = "Add";
        elForm.reset();
    }

});

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".btn_remove")) {
        const deletedTodoId = Number(evt.target.dataset.id);
        const foundIndexTodo = todos.findIndex(function (element) {
            return element.id === deletedTodoId;
        });
        todos.splice(foundIndexTodo, 1);
        renderArray(todos, elList);
        window.localStorage.setItem("todos", JSON.stringify(todos));

    }

    if (evt.target.matches(".btn_edit")) {
        const editedTodoId = Number(evt.target.dataset.id);
        const editedTodo = todos.find(function (todo) {
            return todo.id === editedTodoId;
        });
        elInput.value = editedTodo.title;
        elBtn.textContent = "edit";
        editingId = editedTodo.id;
        formType = formTypes.EDIT;
    }

    if (evt.target.matches(".input_checkbox")) {
        const checkboxId = Number(evt.target.dataset.id);
        const foundTodoCheckbox = todos.find(function (todo) {
            return todo.id === checkboxId;
        });
        foundTodoCheckbox.isCompleted = !foundTodoCheckbox.isCompleted;
        window.localStorage.setItem("todos", JSON.stringify(todos));  
        renderArray(todos, elList);
    }
});