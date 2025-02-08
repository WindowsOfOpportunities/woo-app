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

            // for (const window of body.windows) {
            //     const insertWindowResult = await tx.insert(windowItem).values({
            //         windowItemId: crypto.randomUUID(),
            //         projectId: newProjectId,
            //         coating: window.coating,
            //         glassPane: window.glassPane,
            //         windowCount: window.count,
            //         windowHeight: window.height,
            //         windowWidth: window.width,
            //         windowYearFrom: window.yearFrom,
            //         windowYearTo: window.yearTo,
            //         airResistance: window.airResistance,
            //         windResistance: window.windResistance,
            //         soundResistance: window.soundResistance,
            //         fireproof: window.fireproof,
            //         gasFilling1: window.gasFilling1,
            //         gasFilling2: window.gasFilling2,
            //         gValue: window.gValue,
            //         materialFrame: window.materialFrame,
            //         light_transmittance: window.lightTransmittance,
            //         security: window.security,
            //         spacerMaterial: window.spacerMaterial,
            //         soundProofingDb: window.soundProofingDb,
            //         thicknessGlassMm1: window.thicknessGlassMm1,
            //         thicknessGlassMm2: window.thicknessGlassMm2,
            //         thicknessGlassMm3: window.thicknessGlassMm3,
            //         uValue: window.uValue,
            //         color: window.color,
            //         dismantleDate: window.dismantleDate?.toISOString(),
            //     });
            // }
        });

        return true;
    },
};
