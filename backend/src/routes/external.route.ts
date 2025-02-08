import { Elysia } from 'elysia';
import { windowController } from '../controllers/window.controllers';

export const externalRoutes = new Elysia().group('/external', (app) => app.use(windowController));
