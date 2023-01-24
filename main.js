let todoInput = document.getElementById("todo-input");
let todoButton = document.getElementById("todo-button");
let todoList = document.getElementById("todo-list");
// let editBtn = document.getElementById("edit-btn");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addItem);
// editBtn.addEventListener("click", (e) => {
//   console.log("edit");
// });

function addItem(e) {
  if (!todoInput.value) {
    return;
  }
  //to prevent the button from reloading the page
  e.preventDefault();

  //1) create the li div
  const newItemDiv = document.createElement("div");
  newItemDiv.classList.add("todo-div");
  //1.1 create li and append it to parent
  const newLi = document.createElement("li");
  newLi.id = "todo-li";
  newLi.innerText = todoInput.value;
  newItemDiv.appendChild(newLi);

  // ### add value to local storage
  const id = addToLocal(todoInput.value);
  newItemDiv.id = id; //to give id as in the local storage

  //1.2 create done button
  const doneBtn = document.createElement("button");
  doneBtn.id = "done-btn";
  doneBtn.innerHTML = "done";
  newItemDiv.appendChild(doneBtn);

  //1.3 create edit btn
  const editBtn = document.createElement("button");
  editBtn.id = "edit-btn";
  editBtn.innerHTML = "edit";
  newItemDiv.appendChild(editBtn);

  //1.4 create delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "delete-btn";
  deleteBtn.innerHTML = "delete";
  newItemDiv.appendChild(deleteBtn);

  //   //## create event listener on all buttons once created
  //   editBtn.addEventListener("click", editItem);
  //   doneBtn.addEventListener("click", doneItem);
  //   deleteBtn.addEventListener("click", deleteItem);

  newItemDiv.addEventListener("click", edit);

  //1.5 append the div to main ul todoList
  todoList.appendChild(newItemDiv);
  todoInput.value = "";
}

//to edit once edit button is pressed
function editItem(e) {
  console.log(e.target.id);
}

function doneItem(e) {
  console.log("done");
}

function deleteItem(id) {
  //1 remove element from dom (todoList)

  let elementToBeRemoved = document.getElementById(id);
  elementToBeRemoved.remove();

  //2 remove element from local storage
  //   let localStorageValue = returnLocalStorage();
  let localStorageValue = JSON.parse(localStorage.getItem("done"));

  let indexDeleted = 0;
  for (let i = 0; i < localStorageValue.length; i++) {
    if (localStorageValue[i].id === parseInt(id)) {
      //   localStorageValue.splice(i, 1);
      indexDeleted = i;
    }
  }
  console.log(`indexDeleted : ${indexDeleted}`);
  localStorageValue.splice(indexDeleted, 1);
  console.log(localStorageValue);
  //reset the new array with deleted element
  localStorage.setItem("done", JSON.stringify(localStorageValue));
}

function edit(e) {
  //element id using parent
  let id = e.target.parentElement.id;

  if (e.target.id === "done-btn") {
    console.log("done");
  } else if (e.target.id === "edit-btn") {
    console.log("edit");
  } else if (e.target.id === "delete-btn") {
    deleteItem(id);
  }
}

function getLocalTodos() {
  let done;
  if (localStorage.getItem("done") === null) {
    done = [];
  } else {
    done = JSON.parse(localStorage.getItem("done"));
  }
  done.forEach(function (todo) {
    //1) create the li div
    const newItemDiv = document.createElement("div");
    newItemDiv.classList.add("todo-div");
    //1.1 create li and append it to parent
    const newLi = document.createElement("li");
    newLi.id = "todo-li";
    newLi.innerText = todo.value;
    newItemDiv.appendChild(newLi);

    //1.2 create done button
    const doneBtn = document.createElement("button");
    doneBtn.id = "done-btn";
    doneBtn.innerHTML = "done";
    newItemDiv.appendChild(doneBtn);

    //1.3 create edit btn
    const editBtn = document.createElement("button");
    editBtn.id = "edit-btn";
    editBtn.innerHTML = "edit";
    newItemDiv.appendChild(editBtn);

    //1.4 create delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.id = "delete-btn";
    deleteBtn.innerHTML = "delete";
    newItemDiv.appendChild(deleteBtn);

    //1.5 append the div to main ul todoList
    todoList.appendChild(newItemDiv);
  });
}

function addToLocal(value) {
  let task = {};
  let done;
  if (localStorage.getItem("done") === null) {
    done = [];
  } else {
    done = JSON.parse(localStorage.getItem("done"));
  }
  const d = new Date();
  task.id = Math.round(d.getTime());
  task.value = value;
  task.finished = false;

  done.push(task);
  localStorage.setItem("done", JSON.stringify(done));
  return task.id;
}

function returnLocalStorage() {
  let done;
  if (localStorage.getItem("done") === null) {
    return;
  } else {
    done = JSON.parse(localStorage.getItem("done"));
  }
  return done;
}
