import { Elysia } from 'elysia';
import { windowController } from '../controllers/window.controllers';

export const windowRoutes = new Elysia().use(windowController);
