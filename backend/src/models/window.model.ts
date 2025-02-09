import { desc, eq } from 'drizzle-orm';
import { EnrichedWindowBody } from '../controllers/window.controllers';
import { db } from '../db/db';
import { project, windowItem } from '../db/migration';
import { WindowOpportunitiesCalculator } from '../helpers/rating-algorithm';
import { getImageFromS3, uploadImageToS3 } from '../storage/s3storage';

export const windowModel = {
    insertWindow: async (body: EnrichedWindowBody) => {
        const windowTransactionResult = await db.transaction(async (tx) => {
            const newProjectId = crypto.randomUUID();
            const insertProjectResult = await tx.insert(project).values({
                uuid: newProjectId,
                city: body.city,
                country: body.country,
                postcode: body.postcode,
                projectName: body.projectName,
                streetName: body.streetName,
                streetNumber: body.streetNumber,
            });

            let imageId = null;
            if (body.image && body.image !== 'undefined') {
                try {
                    imageId = crypto.randomUUID();
                    const uploadResult = await uploadImageToS3(body.image as any, imageId);
                    if (!uploadResult) {
                        imageId = null;
                    }
                } catch (error) {
                    console.error('Failed to upload image:', error);
                    imageId = null;
                }
            }

            const insertWindowResult = await tx.insert(windowItem).values({
                windowItemId: crypto.randomUUID(),
                projectId: newProjectId,
                imageUrl: imageId,
                coating: Number(body.coating),
                glassPane: Number(body.glassPane),
                windowCount: Number(body.count),
                windowHeight: Number(body.height),
                windowWidth: Number(body.width),
                windowYearFrom: Number(body.yearFrom),
                windowYearTo: Number(body.yearTo),
                airResistance: body.airResistance,
                windResistance: body.windResistance,
                soundResistance: body.soundResistance,
                fireproof: body.fireproof,
                gasFilling1: body.gasFilling1,
                gasFilling2: body.gasFilling2,
                gValue: Number(body.gValue),
                materialFrame: body.materialFrame,
                light_transmittance: Number(body.lightTransmittance),
                security: body.security,
                spacerMaterial: body.spacerMaterial,
                soundProofingDb: Number(body.soundProofingDb),
                thicknessGlassMm1: Number(body.thicknessGlassMm1),
                thicknessGlassMm2: Number(body.thicknessGlassMm2),
                thicknessGlassMm3: Number(body.thicknessGlassMm3),
                uValue: Number(body.uValue),
                color: body.color,
                dismantleDate: new Date(body.dismantleDate)?.toISOString(),
                lon: body.lon,
                lat: body.lat,
                createDate: new Date().toISOString(),
            });
        });

        return true;
    },
    getWindows: async () => {
        const windows = await db
            .select()
            .from(windowItem)
            .leftJoin(project, eq(windowItem.projectId, project.uuid))
            .orderBy(desc(windowItem.createDate));

        return windows.map((window) => {
            const calc = new WindowOpportunitiesCalculator();
            let rating;
            try {
                rating = calc.calculate({
                    coatingNumber: window.windowItem.coating,
                    glassPanelNumber: window.windowItem.glassPane,
                    year: window.windowItem.windowYearFrom,
                    uValue: window.windowItem.uValue!,
                });
            } catch (error) {
                rating = null;
            }

            return { ...window.windowItem, windowRating: rating, project: window.project };
        });
    },
    getWindowImage: async (imageId: string) => {
        const image = await getImageFromS3(imageId);
        return image;
    },
};
