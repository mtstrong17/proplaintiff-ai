import { char, integer, jsonb, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { ulid } from 'ulidx';

// Organizations table - represents different law firms/companies
export const organizations = pgTable('organizations', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  // Branding fields
  logoUrl: varchar('logo_url', { length: 1024 }), // Default logo URL
  logoDarkUrl: varchar('logo_dark_url', { length: 1024 }), // Dark mode logo URL
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  subscriptionStatus: varchar('subscription_status', { length: 50 }),
  subscriptionPlan: varchar('subscription_plan', { length: 50 }),
  subscriptionPeriodEnd: timestamp('subscription_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Users table - represents individual users in the system
export const users = pgTable('users', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Organization Members table - join table for users and organizations with roles
export const organizationMembers = pgTable('organization_members', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  organizationId: varchar('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  userId: varchar('user_id', { length: 26 })
    .references(() => users.id)
    .notNull(),
  role: varchar('role', { length: 50 }).notNull(), // e.g., 'admin', 'member', 'viewer'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Cases table - represents legal cases
export const cases = pgTable('cases', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  organizationId: varchar('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  caseNumber: varchar('case_number', { length: 100 }),
  status: varchar('status', { length: 50 }).notNull(), // e.g., 'active', 'closed', 'archived'
  description: text('description'),
  metadata: jsonb('metadata'), // For storing additional case-specific data
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Documents table - represents various document types
export const documents = pgTable('documents', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  caseId: varchar('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 50 }).notNull(), // e.g., 'pdf', 'docx', 'mp4', 'mp3', 'png', 'jpeg'
  location: varchar('location', { length: 1024 }).notNull(), // URL or custom protocol location
  size: integer('size'), // File size in bytes
  mimeType: varchar('mime_type', { length: 100 }),
  metadata: jsonb('metadata'), // For storing document-specific metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Document Data table - stores processed data from documents
export const documentData = pgTable('document_data', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  documentId: varchar('document_id', { length: 26 })
    .references(() => documents.id)
    .notNull(),
  type: varchar('type', { length: 50 }).notNull(), // e.g., 'text', 'transcript', 'metadata'
  content: text('content').notNull(), // The processed data content
  metadata: jsonb('metadata'), // Additional data-specific metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Case Insights table - stores AI-generated insights for cases
export const caseInsights = pgTable('case_insights', {
  id: char('id', { length: 26 })
    .$default(() => ulid())
    .primaryKey(),
  caseId: varchar('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(), // Long text field for insight content
  type: varchar('type', { length: 50 }).notNull(), // e.g., 'summary', 'key_points', 'legal_analysis'
  source: varchar('source', { length: 50 }).notNull(), // 'generated', 'manual', 'clarification'
  question: text('question'), // Optional question for clarification requests
  documentSources: jsonb('document_sources'), // Array of document references with relevant sections
  citations: jsonb('citations'), // Array of citations/references
  confidence: integer('confidence'), // AI confidence score (0-100)
  metadata: jsonb('metadata'), // Additional insight-specific metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});
