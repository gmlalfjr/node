import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import TodoServices from '../../services/todoServices';
import authorization from '../../authorization/verifyToken';
const router: Router = Router()
const todoServices: TodoServices = new TodoServices();

const deleteTodo = async ( req: Request, res: Response) => {
  try {
    const ids =req.params.id
    const result = await todoServices.deleteItem(ids);
    const { message, status, data } = result;
    res.status(status).send({
      message,
      data
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

router.delete('/todo/:id',authorization, deleteTodo)

export default router;