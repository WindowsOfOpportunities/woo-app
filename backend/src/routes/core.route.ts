import { Elysia } from 'elysia';
import { coreController } from '../controllers/core.controller';

export const coreRoutes = new Elysia().group('/core', (app) => app.use(coreController));
