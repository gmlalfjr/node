import { ObjectId } from 'mongoose';
import { Iitem } from '../interface/itemInterface';
import TodoRepositories from '../repositories/todoRepositories';
import {commonStatus} from '../constant/commonStatus'
class TodoServices {
  private todoRepositories: TodoRepositories;
  constructor() {
    this.todoRepositories = new TodoRepositories();
  }
  async addItem<T extends Iitem>(payload: T): Promise<{message: string, status: number, data: {}}> {
    const addData = await this.todoRepositories.create(payload)
    if (!addData) {
      return commonStatus.error('got an error when create data', 400, {})
    }
    return commonStatus.success('success add item', 200, addData)
  }

  async deleteItem(_id: String): Promise<{message: string, status: number, data: {}}> {
   try{
    const deleteItem = await this.todoRepositories.delete({ _id });
    if (deleteItem.n === 0) {
      throw new Error('No Data Deleted')
    }
    return commonStatus.success('success delete item', 200, {})
   } catch(e) {
    throw {
      message: 'error',
      status: 404
    }
   }
  }

  async getAll(): Promise<{message: string, status: number, data: {}}> {
    const getAllData = await this.todoRepositories.get()

    return commonStatus.success('success delete item', 200, {item: getAllData})
  }
}

export default TodoServices;