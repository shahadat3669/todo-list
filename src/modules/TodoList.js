import TodoItem from './TodoItem.js';

export default class TodoList {
  constructor() {
    this.todoList = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }

  addTodoItem(todoItem) {
    todoItem.index = this.todoList.length + 1;
    todoItem.completed = false;
    const newTodoItem = new TodoItem(todoItem);
    this.todoList.push(newTodoItem);
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
