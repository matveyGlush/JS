// eslint-disable-next-line import/extensions
import { SERVER_URL } from './manifest.js';

// database storage
export async function loadTodoItems(owner) {
  const response = await fetch(`${SERVER_URL}?owner=${owner}`);
  return await response.json();
}

export async function createTodoItem({ owner, name }) {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      owner,
    }),
  });
  return await response.json();
}

export async function markTodoAsDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  await fetch(`${SERVER_URL}/${todoItem.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: todoItem.done }),
  });
}

export async function deleteTodoItem({ element, todoItem }) {
  element.remove();
  await fetch(`${SERVER_URL}/${todoItem.id}`, {
    method: 'DELETE',
  });
}
