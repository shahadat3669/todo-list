import './style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import TodoList from './modules/TodoList.js';
import generateListHTML from './modules/GenerateListHTML.js';

require('./assets/logo.png');

const newTodoList = new TodoList();
const formAddItem = document.querySelector('.form-add-item');
const btnClear = document.querySelector('.btn-clear');

// Append  node to the DOM
formAddItem.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  newTodoList.addTodoItem({
    description: data.get('description'),
  });

  formAddItem.reset();
  generateListHTML(newTodoList);
});

generateListHTML(newTodoList);

btnClear.addEventListener('click', () => {
  newTodoList.removeTodoItemByCompleted();
  generateListHTML(newTodoList);
});
