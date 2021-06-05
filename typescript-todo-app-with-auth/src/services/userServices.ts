import {UserModel} from '../models/userModel';
import UserRepositories from '../repositories/userRepositories';
import {IuserLogin} from '../interface/userInterface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {commonStatus} from '../constant/commonStatus'
class UserServices {
  userRepositories: UserRepositories;
  constructor() {
    this.userRepositories = new UserRepositories();
  };

  generateToken(user: object) {
    return jwt.sign(user, process.env.JWT_SECRET ?? '', { expiresIn: "10m" });
  }

  async loginUser<T extends IuserLogin>(payload: T): Promise<{message: string, status: number, data: {}}> {
    if (!payload.username || !payload.password) {
      return commonStatus.error('pls input all field', 400, {})
    }
    const findUser = await this.userRepositories.findOne({ username: payload.username })
    const comparePassword = await bcrypt.compare(payload.password, findUser!.password);
    if (!findUser || !comparePassword){
      return commonStatus.error('User Not Found', 404, {})
    }
    const generateToken = this.generateToken({ id: findUser._id})
    return commonStatus.success('Success Login', 200, { token : generateToken })
  }

  async registerUser<T extends IuserLogin>(payload: T): Promise<{message: string, status: number, data: {}}> {

    const findUser = await this.userRepositories.findOne({ username: payload.username })
    if(findUser) { 
      return commonStatus.error('User Already Exist', 409, {});
    }
    const hashedPassword: string = await this._hashPassword(payload.password)

    const saveUser: IuserLogin = {
      username : payload.username,
      password: hashedPassword
    }
    const save =await this.userRepositories.create(saveUser);
    return commonStatus.success('Register Success', 200, {
      username: save.username
    })
  }

  _hashPassword(password: string): Promise<string> {
    const bcrypts: Promise<string> = new Promise((resolve, rejects): void => {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
           resolve(hash)
        });
      });
    });
    return bcrypts
  }
}


export default UserServices;
