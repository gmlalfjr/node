import { Router, Request, Response } from 'express';
import TodoServices from '../../services/todoServices';
import authorization from '../../authorization/verifyToken';
const router: Router = Router()
const todoServices: TodoServices = new TodoServices();

const todoHandler = async ( req: Request, res: Response) => {
  try {
    const result = await todoServices.getAll()
    const { message, status, data } = result;
    res.status(status).send({
      message,
      data
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

router.get('/todo',authorization, todoHandler)

export default router;