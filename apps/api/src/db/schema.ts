import { sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { char } from 'drizzle-orm/pg-core';
import { ulid } from 'ulidx';

export const organizations = pgTable('organizations', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const users = pgTable('users', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .notNull()
    .references(() => organizations.id),
  role: varchar('role', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const cases = pgTable('cases', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .notNull()
    .references(() => organizations.id),
  caseNumber: varchar('case_number', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const caseInsights = pgTable('case_insights', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .notNull()
    .references(() => organizations.id),
  caseId: char('case_id', { length: 26 })
    .notNull()
    .references(() => cases.id),
  type: varchar('type', { length: 255 }).notNull(),
  subType: varchar('sub_type', { length: 255 }),
  significance: varchar('significance', { length: 255 }),
  title: varchar('title', { length: 255 }).notNull(),
  insight: text('insight').notNull(),
  citations: jsonb('citations'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const documents = pgTable('documents', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .notNull()
    .references(() => organizations.id),
  caseId: char('case_id', { length: 26 })
    .notNull()
    .references(() => cases.id),
  name: varchar('name', { length: 255 }).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 255 }).notNull(),
  fileSize: integer('file_size').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const demandLetters = pgTable(
  'demand_letters',
  {
    id: char('id', { length: 26 })
      .notNull()
      .$defaultFn(() => ulid()),
    version: integer('version').notNull(),
    organizationId: char('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id),
    caseId: char('case_id', { length: 26 })
      .notNull()
      .references(() => cases.id),
    name: varchar('name', { length: 255 }).notNull(),
    content: text('content').notNull(),
    isCurrent: boolean('is_current').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.id, table.version] }),
      index('demand_letters_current_version_idx')
        .on(table.id)
        .where(sql`${table.isCurrent} = true`),
    ];
  }
);
