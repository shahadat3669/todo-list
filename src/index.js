import './style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';
import TodoList from './modules/TodoList.js';

require('./assets/logo.png');

const list = document.querySelector('.list-ul');
const newTodoList = new TodoList();
const formAddItem = document.querySelector('.form-add-item');

const sortItems = (items) => {
  const sortedItems = items.sort((a, b) => a.index - b.index);
  return sortedItems;
};

const bindTaskEvents = (taskListItem) => {};

const generateListHTML = (taskList) => {
  list.innerHTML = '';
  const sortedList = taskList.length > 0 ? sortItems(taskList) : taskList;
  sortedList.forEach((item) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('list-item', 'list-style');
    todoItem.id = item.index;
    todoItem.innerHTML = `
            <div class="list-item-content">
              <input  type="checkbox" class="check-box" />
              <input name= "description" class="list-item-description" type="text" value="${item.description}" readonly/>
            </div>
            <div class="list-item-action">
            <div class="trash "> 
              <i class="fa-solid fa-trash icon btn"></i></div>
            <div class="ellipsis"> 
              <i class="fa-solid fa-ellipsis-vertical icon btn"></i></div>
            </div>`;
    list.appendChild(todoItem);
    bindTaskEvents(todoItem);
  });
};

// Append  node to the DOM
formAddItem.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  newTodoList.addTodoItem({
    description: data.get('description'),
  });

  formAddItem.reset();
  generateListHTML(newTodoList.getTodoList());
});

generateListHTML(newTodoList.getTodoList());
