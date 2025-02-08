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
    count: t.String(),
    height: t.String(),
    width: t.String(),
    yearFrom: t.String(),
    yearTo: t.String(),
    glassPane: t.String(),
    coating: t.String(),
    uValue: t.String(),
    airResistance: t.String(),
    windResistance: t.String(),
    soundResistance: t.String(),
    fireproof: t.String(),
    dismantleDate: t.String(),
    image: t.File(),
    gasFilling1: t.String(),
    gasFilling2: t.String(),
    gValue: t.String(),
    materialFrame: t.String(),
    lightTransmittance: t.String(),
    security: t.String(),
    spacerMaterial: t.String(),
    soundProofingDb: t.String(),
    thicknessGlassMm1: t.String(),
    thicknessGlassMm2: t.String(),
    thicknessGlassMm3: t.String(),
    color: t.String(),
});
export type PostWindowBodySchemaType = Static<typeof postWindowBodySchema>;

export const windowController = new Elysia()
    .post(
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
            parse: 'formdata',
        }
    )
    .get('/window', async ({}) => {
        const windows = await windowModel.getWindows();

        return windows;
    })
    .get('/window-image/:imageId', async ({ params }) => {
        const image = await windowModel.getWindowImage(params.imageId);

        return image;
    });
