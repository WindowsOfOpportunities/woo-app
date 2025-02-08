import { color } from "bun";
import { pgTable, text, integer, real, date, uuid } from "drizzle-orm/pg-core";

export const project = pgTable('project', {
  uuid: uuid('project_id').primaryKey(),
  projectName: text('project_name').notNull(),
  streetName: text('street_name').notNull(),
  streetNumber: text('street_number').notNull(),
  postcode: text('postcode').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
});

export const windowItem = pgTable('windowItem', {
  windowItemId: uuid('window_item_id').primaryKey(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => project.uuid, { onDelete: 'cascade' }),
  windowCount: integer('window_count').notNull(),
  windowHeight: real('window_height').notNull(),
  windowWidth: real('window_width').notNull(),
  windowYearFrom: integer('window_year_from').notNull(),
  windowYearTo: integer('window_year_to'),
  glassPane: integer('glass_pane').notNull(),
  coating: integer('coating').notNull(),
  uValue: real('u_value'),
  dismantleDate: date('dismantle_date'),
  pdfUrl: text('pdf_url'),
  imageUrl: text('image_url'),
  materialFrame: text('material_frame'),
  spacerMaterial: text('spacer_material'),
  thicknessGlassMm1: real('thickness_glass_mm_1'),
  thicknessGlassMm2: real('thickness_glass_mm_2'),
  thicknessGlassMm3: real('thickness_glass_mm_3'),
  gasFilling1: text('gas_filling_1'),
  gasFilling2: text('gas_filling_2'),
  gValue: real('g_value'),
  soundProofingDb: real('sound_proofing_db'),
  windResistance: text('wind_resistance'),
  soundResistance: text('sound_resistance'),
  airResistance: text('air_resistance'),
  security: text('security'),
  light_transmittance: real('light_transmittance'),
  color: text('color'),
  fireproof: text('fireproof'),
  loadN: real('load_n'),
  lat: real("lat"),
  lon: real("lon"),
});

export type WindowItem = typeof windowItem.$inferSelect;

