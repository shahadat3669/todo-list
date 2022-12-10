const list = document.querySelector('.list-ul');

const sortItems = (items) => {
  const sortedItems = items.sort((a, b) => a.index - b.index);
  return sortedItems;
};

const bindTaskEvents = async (taskListItem, newTodoList) => {
  const todoItemId = taskListItem.id;
  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const icon1 = taskListItem.querySelector('.trash');
  const icon2 = taskListItem.querySelector('.ellipsis');
  const description = taskListItem.querySelector('input[name="description"]');

  icon1.addEventListener('click', async () => {
    await newTodoList.removeTodoItem(parseInt(todoItemId, 10));
    // eslint-disable-next-line no-use-before-define
    generateListHTML(newTodoList);
  });
  icon2.addEventListener('click', () => {
    description.removeAttribute('readOnly');
    description.classList.add('active-item');
    icon1.classList.remove('hidden');
    icon2.classList.add('hidden');
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

const generateListHTML = (newTodoList) => {
  list.innerHTML = '';
  const taskList = newTodoList.getTodoList();
  const sortedList = taskList.length > 0 ? sortItems(taskList) : taskList;
  sortedList.forEach((item) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('list-item', 'list-style');
    todoItem.id = item.index;
    todoItem.innerHTML = `
              <div class="list-item-content">
                <input  type="checkbox" class="check-box" 
                ${item.completed ? 'checked' : ''} />
                <input name= "description" class="list-item-description
                ${item.completed ? 'strike-through' : ''}" type="text" 
                value="${item.description}" readonly/>
              </div>
              <div class="list-item-action">
              <div class="trash hidden"> 
                <i class="fa-solid fa-trash icon  btn"></i></div>
              <div class="ellipsis"> 
                <i class="fa-solid fa-ellipsis-vertical icon btn"></i></div>
              </div>`;
    list.appendChild(todoItem);
    bindTaskEvents(todoItem, newTodoList);
  });
};

export default generateListHTML;
