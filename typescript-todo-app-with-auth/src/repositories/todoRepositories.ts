import { TodoModel } from '../models/todoModel'
class TodoRepositories {
  private model;
  
  constructor() {
    this.model = TodoModel;
  }

  async create(payload: object) {
    return this.model.create(payload)
  }

  async get() {
    return this.model.find()
  }


  async delete(payload: object) {
    return this.model.deleteOne(payload)
  }
}

export default TodoRepositories;