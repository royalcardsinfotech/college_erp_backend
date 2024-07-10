
import { Router } from 'express';

import { getApplicationReport, getEducationaldetailsReport } from '../../controllers/reports/report';
import { authenticateUser } from 'src/middlewares/auth';

const reportRouter = Router();

reportRouter.get('/application/:courselvl/:basicCourse/:course',authenticateUser(false), getApplicationReport);
reportRouter.get('/eduDetails/:courselvl/:basicCourse/:course', authenticateUser(false),getEducationaldetailsReport);
