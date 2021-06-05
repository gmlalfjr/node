import { Router, Request, Response } from 'express';
import TodoServices from '../../services/todoServices';
import authorization from '../../authorization/verifyToken';
const router: Router = Router()
const todoServices: TodoServices = new TodoServices();

const todoHandler = async ( req: Request, res: Response) => {
  try {
    const { todo } = req.body;
    const result = await todoServices.addItem({ todo })
    const { message, status, data } = result;
    res.status(status).send({
      message,
      data
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

router.post('/todo', authorization, todoHandler)

export default router;