// IMPORT HTML ELEMENTS
const elForm = document.querySelector(".wrap__form");
const elInput = elForm.querySelector(".wrap__input");
const elBtn = elForm.querySelector(".wrap__btn");
const elList = document.querySelector(".list");

let text1 = document.querySelector(".text1"); 
let text2 = document.querySelector(".text2"); 
let text3 = document.querySelector(".text3"); 

const todos = [];
let initialId = 0;

let t1 = 0;
let t2 = 0;
let t3 = 0;
const renderArray = function (array, wrapper) {
    wrapper.innerHTML = "";
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

        if(element.isCompleted){
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

        renderArray(todos, elList);
        elForm.reset();
    }
    
    if(formType === formTypes.EDIT){
        const obj = {
            id: editingId,
            title: elInput.value,
            isCompleted: false,
        };

        const editingFoundIndex = todos.findIndex(function (todo) {
            return todo.id === obj.id;
        });
        todos.splice(editingFoundIndex, 1, obj);
        renderArray(todos, elList);
        formType = formTypes.SAVE;
        elBtn.textContent = "Add";
        elForm.reset();
    }
    if(elForm.click){
        text3.textContent = ++t1;
    }
   
    
});

elList.addEventListener("click", function (evt) {
    if (evt.target.matches(".btn_remove")) {
        const deletedTodoId = Number(evt.target.dataset.id);
        const foundIndexTodo = todos.findIndex(function(element){
            return element.id === deletedTodoId;
        });
        todos.splice(foundIndexTodo, 1);
        renderArray(todos, elList);

        if(deleteButton.click){
            text2.textContent = --t1;
        }
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
        const foundTodoCheckbox = todos.find(function (todo){
            return todo.id === checkboxId;
        });
        foundTodoCheckbox.isCompleted = !foundTodoCheckbox.isCompleted;
        renderArray(todos, elList);
        text2.textContent = ++t2;
    }
    
});
