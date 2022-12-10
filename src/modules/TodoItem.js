export default class TodoItem {
  constructor(data) {
    this.index = data.index;
    this.description = data.description;
    this.completed = data.completed;
  }
}
