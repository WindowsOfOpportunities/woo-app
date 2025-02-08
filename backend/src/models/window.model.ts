import { PostWindowBodySchemaType } from '../controllers/window.controllers';
import { db } from '../db/db';
import { project, windowItem } from '../db/migration';

export const windowModel = {
    insertWindow: async (body: PostWindowBodySchemaType) => {
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

            const insertWindowResult = await tx.insert(windowItem).values({
                windowItemId: crypto.randomUUID(),
                projectId: newProjectId,
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
            });
        });

        return true;
    },
};
