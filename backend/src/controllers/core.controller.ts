import Elysia from 'elysia';
import { version as versionBackend } from '../../package.json';

export const coreController = new Elysia().get('/version', async ({ params, body }) => {
    return { versionBackend };
});
