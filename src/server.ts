import express, { Express } from 'express';
import { config } from './config/config';
import { initializeDB } from './config/initializeDB';
import * as http from 'http';
import { createLogger } from 'winston';

class Server {
  private app: Express;
  private port: number;
  private host: string;
  private logger = createLogger();

  constructor(port: number, host = '0.0.0.0') {
    this.port = port;
    this.host = host;
    this.app = express();
  }

  private async startExpress(): Promise<http.Server> {
    return new Promise((res) => {
      const server: http.Server = this.app.listen(this.port, this.host, () => res(server));
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

const server = new Server(config.port);
server.start();
