import { pgTable, text, integer, real, date } from "drizzle-orm/pg-core";

export const windowItem = pgTable('profile', {
  // Contact information
  projectName: text('project_name').notNull(),
  streetName: text('street_name').notNull(),
  streetNumber: text('street_number').notNull(),
  postcode: text('postcode').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),

  // Window details
  windowCount: integer('window_count').notNull(),
  windowHeight: real('window_height').notNull(),
  windowWidth: real('window_width').notNull(),
  windowYear: text('window_year').notNull(),
  glassPane: integer('glass_pane').notNull(),
  coating: integer('coating').notNull(),
  uValue: real('u_value').notNull(),
  dismantleDate: date('dismantle_date'),
  imageUrl: text('image_url').notNull(),
});

export type WindowItem = typeof windowItem.$inferSelect;

