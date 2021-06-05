import { Schema, model, connect } from 'mongoose';
// class UserModel {
//   username: string;
//   password: string;  
// }
interface User {
  username: string;
  password: string;
}

const schema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String }
});

const UserModel = model<User>('User', schema);

export { UserModel };
