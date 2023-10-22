import * as express from 'express';
import convert from './convert/convert';

const Routes = express.Router();
Routes.use('/convert', convert);

export default Routes;
