import Server from './server/server';

class Launcher {
  server:Server
  constructor() {
    this.server = new Server();
  }

  launchApp() {
    this.server.createServer();
  }

}

const runApp = new Launcher();

runApp.launchApp();