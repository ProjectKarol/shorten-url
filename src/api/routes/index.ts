import { Request, Response, Application } from 'express';
import Routers from './v1/Routes';

export class Routes {

  public routes(app: Application): void {
    app.route('/_status')
      .get((_req: Request, res: Response) => {
        res.status(200).send('Healthy!!!');
      });
    app.use('/v1', Routers);
  }
}
