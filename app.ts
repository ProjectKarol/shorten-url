import express, { Application, Request, Response, NextFunction, RequestHandler } from 'express';
import { Routes } from './src/api/routes';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);

  }

  private config(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    this.app.use(express.json() as RequestHandler);

    this.app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
      colorize: false,
    }));
  }


}

export default new App().app;
