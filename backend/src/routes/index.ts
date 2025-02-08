import { Elysia } from 'elysia';
import { windowRoutes } from './windows.route';

export const routesCore = new Elysia().group('/api/v1', (app) => app.use(windowRoutes));
