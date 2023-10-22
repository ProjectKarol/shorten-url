import { Application } from 'express';
import { config } from './src/config/config';
import { initializeDB } from './src/config/initializeDB';
import { createLogger } from 'winston';
import App from './app';
import * as schedule from 'node-schedule';
import { ConversionRepository } from './src/repository/Convert.repository';



class Server {
  private app: Application;
  private port: number;
  private host: string;
  private logger = createLogger();

  constructor(app: Application, port: number, host = '0.0.0.0') {
    this.port = port;
    this.host = host;
    this.app = app;

  }

  private async startExpress() {
    this.app.listen(this.port, () => {
      console.log(`App Started on ${this.port}`);
    });

  }

  public async start(): Promise<void> {
    await initializeDB();
    await this.startExpress();
    process.on('unhandledRejection', this.handleUnhandledRejection.bind(this));
    process.on('uncaughtException', this.handleUncaughtException.bind(this));
  }


  private handleUnhandledRejection(err: unknown): void {
    setTimeout(() => { throw err; }, 0);
  }

  private handleUncaughtException(error: Error): void {
    this.logger.error('There was an uncaught error', error);
  }
}

const server = new Server(App, config.port);

// Schedule the cleanup job to run every day at 3am
schedule.scheduleJob('0 3 * * *', () => new ConversionRepository().cleanupDatabase());
server.start();
