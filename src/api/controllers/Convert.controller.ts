import { ConvertService } from "../services/Convert.service";
import { StatusCodes } from 'http-status-codes';
import {
  Request, Response
} from 'express';
import { createLogger } from 'winston';

const logger = createLogger();

export class ConvertController {
  public static async create(req: Request, res: Response) {
    try {
      const convertService = new ConvertService();
      const data = await convertService.create(req);
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      throw logger.error(error);
    }
  }
}
