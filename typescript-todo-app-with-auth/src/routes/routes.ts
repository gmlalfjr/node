import login from './auth/login/login'
import register from './auth/register/register'
import todo from './todo/index'

export default [
  login,
  register,
  ...todo
]