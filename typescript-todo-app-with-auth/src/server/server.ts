import express, {Request, Response} from 'express';
import router from '../routes/routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

class Server {
  app;
  
  port: number = 5000
  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
  }

  createServer() {
    mongoose.connect(process.env.DB_CONNECTION ?? '', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => {
      console.log('success running');
    })

    router.forEach(data => {
      this.app.use(data)
    })

    this.app.listen(5000, () => {
      console.log('server running at port 5000');
    })
  }
}

export default Server;