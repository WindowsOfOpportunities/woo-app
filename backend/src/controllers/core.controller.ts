import Elysia, { t } from 'elysia';
import { version as versionBackend } from '../../package.json';
import { version as versionFrontend } from '../../../frontend/WOO/package.json';

export const coreController = new Elysia().get('/version', async ({ params, body }) => {
    return { versionBackend, versionFrontend };
});
