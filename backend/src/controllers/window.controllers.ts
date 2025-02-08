import Elysia, { t } from 'elysia';
import { windowModel } from '../models/window.model';

export const windowController = new Elysia().post(
    '/window',
    async ({ params, body, set }) => {
        const insertResult = await windowModel.insertWindow({});

        set.status = 200;
        return {
            message: 'Successfully added to DB',
        };
    },
    {
        body: t.Object({
            // Contact
            projectName: t.String(),
            streetName: t.String(),
            streetNumber: t.String(),
            postcode: t.String(),
            city: t.String(),
            country: t.String(),
            // Window details
            window: t.Object({
                count: t.Integer(),
                height: t.Number(),
                width: t.Number(),
                year: t.String(),
                glassPane: t.Integer(),
                coating: t.Integer(),
                uValue: t.Number(),
                dismantleDate: t.Optional(t.Date()),
                image: t.File(),
            }),
        }),
    }
);
