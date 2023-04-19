let taskInput = document.querySelector(".input-wrapper__text");
let addButton = document.querySelector(".input-wrapper__btn");
let incompleteTaskHolder = document.getElementById("incomplete");
let completedTasksHolder = document.getElementById("completed");

//New task list item
function createNewTaskElement(taskString){
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let p = document.createElement("p");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("input")
  p.innerText = taskString;
  p.className = "tasks-list__name";

  //Each elements, needs appending
  checkBox.classList.add('tasks-list__checkbox');
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "tasks-list__input-edit";
  editButton.innerText = "Edit"; 
  editButton.className = "tasks-list__btn-edit";
  deleteButton.className = "tasks-list__btn-delete";
  deleteButton.type = "image";
  deleteButton.src = "./remove.svg";
  deleteButton.alt = "button «delete»";
  listItem.appendChild(checkBox);
  listItem.appendChild(p);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function addTask() {

  //Create a new list item with the text from the .input-wrapper__text:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  listItem.classList.add('tasks-list');

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

addButton.addEventListener("click", addTask);

//Edit an existing task.
function editTask(){
  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");
  let p = listItem.querySelector("p");;
  let editBtn = listItem.querySelector(".tasks-list__btn-edit");
  let containsClass = listItem.classList.contains("edit-mode");

  //If class of the parent is .edit-mode
  if(containsClass){

    //switch to .edit-mode
    //label becomes the inputs value.
    p.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = p.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};

//Delete task.
function deleteTask() {
  let listItem=this.parentNode;
  let ul=listItem.parentNode;

  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {

  //Append the task list item to the #completed
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {

  //Append the task list item to the #incomplete.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

function bindTaskEvents(taskListItem,checkBoxEventHandler) {

  //select ListItems children
  let checkBox = taskListItem.querySelector("input.tasks-list__checkbox");
  let editButton = taskListItem.querySelector("button.tasks-list__btn-edit");
  let deleteButton = taskListItem.querySelector("input.tasks-list__btn-delete");
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
}

//cycle over incompleteTaskHolder ul list items
for(let i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for(let i = 0; i < completedTasksHolder.children.length; i++) {
    
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}