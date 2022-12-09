import './style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

require('./assets/logo.png');
// Create heading node
const list = document.querySelector('.list-ul');
const taskList = [
  { index: 0, description: 'Fist task', completed: false },
  { index: 1, description: 'Fist task', completed: false },
  { index: 2, description: 'Fist task', completed: false },
  { index: 3, description: 'Fist task', completed: false },
  { index: 4, description: 'Fist task', completed: false },
  { index: 5, description: 'Fist task', completed: false },
];

const sortItems = (items) => {
  const sortedItems = items.sort((a, b) => a.index - b.index);
  return sortedItems;
};

const generateTaskListHTML = () => {
  const sortedList = sortItems(taskList);
  sortedList.forEach((item) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('list-item', 'list-style');
    todoItem.innerHTML = `
            <div class="list-item-content">
              <input  type="checkbox" />
              <label>${item.description}</label>
            </div>
            <div class="list-item-action">
              <i class="fa-solid fa-trash icon hidden"></i>
              <i class="fa-solid fa-ellipsis-vertical icon"></i>
            </div>`;
    list.appendChild(todoItem);
  });
};

// Append heading node to the DOM
document.addEventListener('DOMContentLoaded', generateTaskListHTML);
