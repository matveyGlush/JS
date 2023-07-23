// local storage
export async function loadTodoItemsLocal(owner) {
  return JSON.parse(window.localStorage.getItem(`${owner}`));
}

export async function createTodoItemLocal({ owner, name }) {
  let arr = JSON.parse(window.localStorage.getItem(owner));
  if (!arr) arr = [];
  const id = Date.now().toString();
  arr.push({
    owner,
    name,
    done: false,
    id,
  });
  window.localStorage.setItem(owner, JSON.stringify(arr));
  return {
    owner,
    name,
    done: false,
    id,
  };
}

export async function markTodoAsDoneLocal({ todoItem }) {
  todoItem.done = !todoItem.done;
  const arr = JSON.parse(window.localStorage.getItem(todoItem.owner));
  arr.forEach((el) => {
    if (el.id === todoItem.id) el.done = todoItem.done;
  });
  window.localStorage.setItem(todoItem.owner, JSON.stringify(arr));
}

export async function deleteTodoItemLocal({ element, todoItem }) {
  element.remove();
  const arr = JSON.parse(window.localStorage.getItem(todoItem.owner));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === todoItem.id) arr.splice(i, 1);
  }
  window.localStorage.setItem(todoItem.owner, JSON.stringify(arr));
}
