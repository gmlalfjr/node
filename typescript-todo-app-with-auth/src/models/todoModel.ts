import { Schema, model } from 'mongoose';
import { Iitem } from '../interface/itemInterface';

const schema = new Schema<Iitem>({
  todo: { type: String, required: true }
});

const TodoModel = model<Iitem>('Todo', schema);

export { TodoModel };
