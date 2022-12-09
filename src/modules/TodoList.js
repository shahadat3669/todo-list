export default class TodoList {
  constructor() {
    this.todoList = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
  }
}
