import { Static } from '@sinclair/typebox';
import Elysia, { t } from 'elysia';
import { windowModel } from '../models/window.model';
import { getCoordinatesFromAddress } from '../helpers/adress-parser';

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
    image: t.Union([t.File(), t.String()]),
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

export type EnrichedWindowBody = PostWindowBodySchemaType & {
    lat?: number | null;
    lon?: number | null;
};

export const windowController = new Elysia()
    .post(
        '/window',
        async ({ params, body, set }) => {


            const { lat, lon, error } = await getCoordinatesFromAddress({
                streetName: body.streetName,
                streetNumber: body.streetNumber,
                postcode: body.postcode,
                city: body.city,
                country: body.country,
            });

            if (error) {
                console.warn('Geocoding warning:', error);
            }

            const enrichedBody = {
                ...body,
                lat,
                lon,
            };

            const insertResult = await windowModel.insertWindow(enrichedBody);


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
    .get('/window', async ({ }) => {
        const windows = await windowModel.getWindows();

        return windows;
    })
    .get('/window-image/:imageId', async ({ params }) => {
        const image = await windowModel.getWindowImage(params.imageId);

        return image;
    });
