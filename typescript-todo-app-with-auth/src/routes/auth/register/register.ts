import { Router, Request, Response } from 'express';
import UserServices from '../../../services/userServices';

const router: Router = Router()
const userService: UserServices = new UserServices();

const registerHandler = async ( req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const regisResult = await userService.registerUser({ username, password})
    const { message, status, data } = regisResult;
    res.status(status).send({
      message,
      data
    });
  } catch (error) {
    res.status(500).send(error)
  }
}

router.post('/register', registerHandler)

export default router;