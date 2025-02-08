import { Static } from '@sinclair/typebox';
import Elysia, { t } from 'elysia';
import { windowModel } from '../models/window.model';

const postWindowBodySchema = t.Object({
    // Contact
    projectName: t.String(),
    streetName: t.String(),
    streetNumber: t.String(),
    postcode: t.String(),
    city: t.String(),
    country: t.String(),
    // Window details
    windows: t.Array(
        t.Object({
            count: t.Integer(),
            height: t.Number(),
            width: t.Number(),
            yearFrom: t.Integer(),
            yearTo: t.Integer(),
            glassPane: t.Integer(),
            coating: t.Integer(),
            uValue: t.Number(),
            airResistance: t.String(),
            windResistance: t.String(),
            soundResistance: t.String(),
            fireproof: t.String(),
            dismantleDate: t.Optional(t.Date()),
            image: t.File(),
            gasFilling1: t.String(),
            gasFilling2: t.String(),
            gValue: t.Number(),
            materialFrame: t.String(),
            lightTransmittance: t.Number(),
            security: t.String(),
            spacerMaterial: t.String(),
            soundProofingDb: t.Number(),
            thicknessGlassMm1: t.Number(),
            thicknessGlassMm2: t.Number(),
            thicknessGlassMm3: t.Number(),
            color: t.String(),
        })
    ),
});
export type PostWindowBodySchemaType = Static<typeof postWindowBodySchema>;

export const windowController = new Elysia().post(
    '/window',
    async ({ params, body, set }) => {
        const insertResult = await windowModel.insertWindow(body);

        set.status = 200;
        return {
            message: 'Successfully added to DB',
        };
    },
    {
        body: postWindowBodySchema,
    }
);
