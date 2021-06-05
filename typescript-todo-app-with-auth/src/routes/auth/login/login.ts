import { Router, Request, Response } from 'express';
import UserServices from '../../../services/userServices';

const router: Router = Router()
const userService: UserServices = new UserServices();

const loginHandler = async (req: Request, res: Response) => {  
  try {
  const { username, password } = req.body;

  const result = await userService.loginUser({ username, password })

  const { message, status, data } = result;
  return res.status(status).send({
    message,
    data
  });
  } catch (error) {
    return res.status(500).send(error)
  }
}

router.post('/login', loginHandler)

export default router;