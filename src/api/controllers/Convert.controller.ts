import { ConvertService } from "../services/Convert.service";
import { StatusCodes } from 'http-status-codes';
import {
  Request, Response
} from 'express';
import { createLogger } from 'winston';

const logger = createLogger();

export class ConvertController {
  public static async createDeepLink(req: Request, res: Response) {
    try {
      const convertService = new ConvertService();
      const data = await convertService.createDeepLink(req);
      res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
      throw logger.error(error);
    }
  }

  public static async getDeepLink(req: Request, res: Response) {
    try {
      const convertService = new ConvertService();
      const data = await convertService.getDeepLink(req);
      if (!data) {
        res.status(StatusCodes.NOT_FOUND).json('Not Found');
      }
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      throw logger.error(error);
    }
  }
}
