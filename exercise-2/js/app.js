var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");


const createId = () => (Math.random() + 1).toString(36).substring(7);

let initialState = [{
        id: createId(),
        checked: false,
        title: "Pay Bills",
        editMode: false,
    },
    {
        id: createId(),
        checked: false,
        title: "Go Shopping",
        editMode: true,
    },
    {
        id: createId(),
        checked: true,
        title: "See the Doctor",
        editMode: false,
    }
]


var createNewTaskElement = function(taskString, id, checked = false, editMode = false) {
    hiddenInput = document.createElement("input");
    hiddenInput.value = id;
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.classList.add("id-hidden-intput");

    listItem = document.createElement("li");
    checkBox = document.createElement("input");

    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    checkBox.checked = checked;
    editInput.type = "text";
    editInput.value = taskString;
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    if (editMode) {
        editButton.innerText = "Save";
        listItem.classList.toggle("editMode");
    }

    listItem.appendChild(hiddenInput);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

var initTaskElement = function(item) {
    listItem = createNewTaskElement(item.title, item.id, item.checked, item.editMode)
    if (item.checked) {
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    } else {
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
    taskInput.value = "";
};

const buildApp = function(items = []) {
    items.forEach(item => {
        initTaskElement(item)
    });
}

var initTodoApp = function() {
    let tasksStored = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasksStored.length == 0) {
        localStorage.setItem("tasks", JSON.stringify(initialState));
        tasksStored = [...initialState];
    }
    buildApp(tasksStored);
}


var addTask = function() {
    const id = createId();
    var listItemName = taskInput.value || "New Item"
    listItem = createNewTaskElement(listItemName, id)
    incompleteTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
    taskInput.value = "";


    let tasksStored = JSON.parse(localStorage.getItem("tasks")) || [];

    tasksStored.push({ title: listItemName, checked: false, editMode: false, id });
    localStorage.setItem("tasks", JSON.stringify(tasksStored));

    console.log(tasksStored)
};

var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var idValue = listItem.querySelectorAll('.id-hidden-intput')[0].value
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value
        button.innerText = "Edit";
    } else {
        editInput.value = label.innerText
        button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");

    let tasksStored = JSON.parse(localStorage.getItem("tasks")) || [];
    editMode = listItem.classList.contains("editMode");

    tasksStored = tasksStored.map(item => {
        if (item.id === idValue) {
            return {
                ...item,
                title: editInput.value,
                editMode
            }
        }
        return item;
    })
    localStorage.setItem("tasks", JSON.stringify(tasksStored));
};

var deleteTask = function(el) {

    var listItem = this.parentNode;
    var idValue = listItem.querySelectorAll('.id-hidden-intput')[0].value

    var ul = listItem.parentNode;
    ul.removeChild(listItem);

    let tasksStored = JSON.parse(localStorage.getItem("tasks")) || [];
    tasksStored = tasksStored.filter(item => item.id !== idValue)
    localStorage.setItem("tasks", JSON.stringify(tasksStored));
};

var taskCompleted = function() {
    var listItem = this.parentNode;
    var idValue = listItem.querySelectorAll('.id-hidden-intput')[0].value

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

    let tasksStored = JSON.parse(localStorage.getItem("tasks")) || [];

    tasksStored = tasksStored.map(item => {
        if (item.id === idValue) {
            return {
                ...item,
                checked: true
            }
        }
        return item;
    })
    localStorage.setItem("tasks", JSON.stringify(tasksStored));
};

var taskIncomplete = function() {
    var listItem = this.parentNode;
    var idValue = listItem.querySelectorAll('.id-hidden-intput')[0].value

    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    let tasksStored = JSON.parse(localStorage.getItem("tasks")) || [];

    tasksStored = tasksStored.map(item => {
        if (item.id === idValue) {
            return {
                ...item,
                checked: false
            }
        }
        return item;
    })
    localStorage.setItem("tasks", JSON.stringify(tasksStored));
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

initTodoApp();

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    const value = taskInput.value;

    if (value.trim() !== "") {
        addTask();
    }
})

const triggerNewTaskButtonClick = function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
    }
}

taskInput.addEventListener("keypress", triggerNewTaskButtonClick);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}