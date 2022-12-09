import './style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import TodoList from './modules/TodoList.js';

require('./assets/logo.png');

const list = document.querySelector('.list-ul');

const sortItems = (items) => {
  const sortedItems = items.sort((a, b) => a.index - b.index);
  return sortedItems;
};

// Append  node to the DOM
formAddItem.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  newTodoList.addTodoItem({
    description: data.get('description'),
  });

  formAddItem.reset();
  generateTaskListHTML(newTodoList.getTodoList());
});

document.addEventListener(
  'DOMContentLoaded',
  generateTaskListHTML(newTodoList.getTodoList())
);
