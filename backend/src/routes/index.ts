import { Elysia } from 'elysia';
import { coreRoutes } from './core.route';
import { externalRoutes } from './external.route';

export const routesCore = new Elysia().group('/api/v1', (app) => app.use([externalRoutes, coreRoutes]));
