import { UserModel } from '../models/userModel'

class UserRepositories {
  model;
  
  constructor() {
    this.model = UserModel;
  }

  async create(payload: object) {
    return this.model.create(payload)
  }

  async findOne(payload: object) { 
    return this.model.findOne(payload)
  }
}

export default UserRepositories