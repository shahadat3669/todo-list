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

const bindTaskEvents = async (taskListItem) => {
  const todoItemId = taskListItem.id;
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const icon1 = taskListItem.querySelector('.trash');
  const icon2 = taskListItem.querySelector('.ellipsis');
  const description = taskListItem.querySelector('input[name="description"]');

  description.addEventListener('click', (event) => {
    event.target.removeAttribute('readOnly');
    event.target.classList.add('active-item');
    icon1.classList.remove('hidden');
    icon2.classList.add('hidden');
  });
  icon1.addEventListener('click', async () => {
    await newTodoList.removeTodoItem(parseInt(todoItemId, 10));
    // eslint-disable-next-line no-use-before-define
    generateListHTML(newTodoList.getTodoList());
  });

  description.addEventListener('focusout', (event) => {
    newTodoList.editToDoItem(todoItemId, { description: event.target.value });
    description.setAttribute('readonly', true);
    description.classList.remove('active-item');
  });

  document.addEventListener('click', (event) => {
    const isClickInsideElement = taskListItem.contains(event.target);
    if (!isClickInsideElement) {
      icon1.classList.add('hidden');
      icon2.classList.remove('hidden');
    }
  });

  checkBox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      newTodoList.editToDoItem(todoItemId, { completed: true });
      checkBox.nextElementSibling.classList.add('strike-through');
    } else {
      newTodoList.editToDoItem(todoItemId, { completed: false });
      checkBox.nextElementSibling.classList.remove('strike-through');
    }
  });
};

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
