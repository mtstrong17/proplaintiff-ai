import { relations } from 'drizzle-orm';
import {
  boolean,
  char,
  date,
  decimal,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { ulid } from 'ulidx';
// Enums
export const leadStatusEnum = pgEnum('lead_status', [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'CONVERTED',
  'LOST',
]);

export const caseStatusEnum = pgEnum('case_status', [
  'INTAKE',
  'INVESTIGATION',
  'NEGOTIATION',
  'LITIGATION',
  'SETTLEMENT',
  'CLOSED',
  'ARCHIVED',
]);

export const documentCategoryEnum = pgEnum('document_category', [
  'medical',
  'legal',
  'evidence',
  'correspondence',
  'billing',
]);

export const documentStatusEnum = pgEnum('document_status', ['draft', 'final', 'archived']);

export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high']);

export const taskStatusEnum = pgEnum('task_status', [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
]);

export const organizationRoleEnum = pgEnum('organization_role', [
  'OWNER',
  'ADMIN',
  'ATTORNEY',
  'PARALEGAL',
  'STAFF',
]);

export const insightSignificanceEnum = pgEnum('insight_significance', ['high', 'medium', 'low']);

export const insightTypeEnum = pgEnum('insight_type', [
  'document',
  'testimony',
  'legal',
  'evidence',
  'timeline',
]);

export const riskSeverityEnum = pgEnum('risk_severity', ['high', 'medium', 'low']);

export const strengthStatusEnum = pgEnum('strength_status', ['strong', 'moderate', 'weak']);

// Tables
export const users = pgTable('users', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizations = pgTable('organizations', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  settings: json('settings').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationMembers = pgTable('organization_members', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  userId: char('user_id', { length: 26 })
    .references(() => users.id)
    .notNull(),
  role: organizationRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  status: leadStatusEnum('status').notNull().default('NEW'),
  source: varchar('source', { length: 100 }),
  notes: text('notes'),
  assignedTo: char('assigned_to', { length: 26 }).references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastActivity: timestamp('last_activity'),
});

export const cases = pgTable('cases', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseNumber: varchar('case_number', { length: 50 }).notNull(),
  clientId: char('client_id', { length: 26 })
    .references(() => leads.id)
    .notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  status: caseStatusEnum('status').notNull().default('INTAKE'),
  description: text('description'),
  filingDate: date('filing_date'),
  nextHearing: timestamp('next_hearing'),
  assignedAttorneyId: char('assigned_attorney_id', { length: 26 }).references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastActivity: timestamp('last_activity'),
  estimatedValue: decimal('estimated_value', { precision: 10, scale: 2 }),
});

export const documents = pgTable('documents', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  category: documentCategoryEnum('category').notNull(),
  status: documentStatusEnum('status').notNull().default('draft'),
  fileUrl: varchar('file_url', { length: 1024 }).notNull(),
  fileSize: integer('file_size').notNull(), // in bytes
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  tags: json('tags').$type<string[]>().default([]),
  uploadedById: char('uploaded_by_id', { length: 26 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: taskStatusEnum('status').notNull().default('pending'),
  priority: taskPriorityEnum('priority').notNull().default('medium'),
  dueDate: timestamp('due_date'),
  assignedTo: char('assigned_to', { length: 26 }).references(() => users.id),
  createdBy: char('created_by', { length: 26 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const events = pgTable('events', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  location: varchar('location', { length: 255 }),
  isAllDay: boolean('is_all_day').default(false),
  createdBy: char('created_by', { length: 26 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const caseNotes = pgTable('case_notes', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  content: text('content').notNull(),
  createdBy: char('created_by', { length: 26 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const caseInsights = pgTable('case_insights', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  type: insightTypeEnum('type').notNull(),
  highlight: varchar('highlight', { length: 255 }),
  finding: text('finding').notNull(),
  significance: insightSignificanceEnum('significance').notNull(),
  source: varchar('source', { length: 255 }),
  sourceDate: date('source_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const caseStrengthAnalysis = pgTable('case_strength_analysis', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  overallScore: integer('overall_score').notNull(),
  details: json('details')
    .$type<
      Array<{
        name: string;
        score: number;
        status: 'strong' | 'moderate' | 'weak';
      }>
    >()
    .notNull(),
  analysisDate: timestamp('analysis_date').defaultNow().notNull(),
  nextReviewDate: timestamp('next_review_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const caseRisks = pgTable('case_risks', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  severity: riskSeverityEnum('severity').notNull(),
  mitigation: text('mitigation'),
  status: varchar('status', { length: 50 }).notNull().default('active'),
  identifiedBy: char('identified_by', { length: 26 })
    .references(() => users.id)
    .notNull(),
  identifiedAt: timestamp('identified_at').defaultNow().notNull(),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const caseStrategy = pgTable('case_strategy', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  type: varchar('type', { length: 50 }).notNull(), // e.g., 'negotiation', 'litigation'
  strengths: json('strengths')
    .$type<
      Array<{
        point: string;
        details: string;
        impact: 'high' | 'medium' | 'low';
      }>
    >()
    .notNull(),
  approach: json('approach')
    .$type<
      Array<{
        phase: string;
        strategy: string;
        timing: string;
      }>
    >()
    .notNull(),
  recommendedSettlementRange: json('recommended_settlement_range').$type<{
    min: number;
    max: number;
    confidence: number;
  }>(),
  createdBy: char('created_by', { length: 26 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const precedentCases = pgTable('precedent_cases', {
  id: char('id', { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  organizationId: char('organization_id', { length: 26 })
    .references(() => organizations.id)
    .notNull(),
  caseId: char('case_id', { length: 26 })
    .references(() => cases.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  citation: varchar('citation', { length: 255 }).notNull(),
  jurisdiction: varchar('jurisdiction', { length: 100 }).notNull(),
  outcome: text('outcome').notNull(),
  relevance: insightSignificanceEnum('relevance').notNull(),
  keyFactors: json('key_factors').$type<string[]>().notNull(),
  settlementAmount: decimal('settlement_amount', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  organizations: many(organizationMembers),
  assignedLeads: many(leads),
  assignedCases: many(cases),
  assignedTasks: many(tasks),
  createdTasks: many(tasks),
  uploadedDocuments: many(documents),
  createdEvents: many(events),
  caseNotes: many(caseNotes),
}));

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  leads: many(leads),
  cases: many(cases),
  documents: many(documents),
  tasks: many(tasks),
  events: many(events),
  notes: many(caseNotes),
}));

export const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationMembers.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [organizationMembers.userId],
    references: [users.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  organization: one(organizations, {
    fields: [leads.organizationId],
    references: [organizations.id],
  }),
  assignedUser: one(users, {
    fields: [leads.assignedTo],
    references: [users.id],
  }),
}));

export const casesRelations = relations(cases, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [cases.organizationId],
    references: [organizations.id],
  }),
  client: one(leads, {
    fields: [cases.clientId],
    references: [leads.id],
  }),
  assignedAttorney: one(users, {
    fields: [cases.assignedAttorneyId],
    references: [users.id],
  }),
  documents: many(documents),
  tasks: many(tasks),
  events: many(events),
  notes: many(caseNotes),
  insights: many(caseInsights),
  strengthAnalysis: many(caseStrengthAnalysis),
  risks: many(caseRisks),
  strategies: many(caseStrategy),
  precedents: many(precedentCases),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  organization: one(organizations, {
    fields: [documents.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [documents.caseId],
    references: [cases.id],
  }),
  uploadedBy: one(users, {
    fields: [documents.uploadedById],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  organization: one(organizations, {
    fields: [tasks.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [tasks.caseId],
    references: [cases.id],
  }),
  assignedUser: one(users, {
    fields: [tasks.assignedTo],
    references: [users.id],
  }),
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
  }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  organization: one(organizations, {
    fields: [events.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [events.caseId],
    references: [cases.id],
  }),
  creator: one(users, {
    fields: [events.createdBy],
    references: [users.id],
  }),
}));

export const caseNotesRelations = relations(caseNotes, ({ one }) => ({
  organization: one(organizations, {
    fields: [caseNotes.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [caseNotes.caseId],
    references: [cases.id],
  }),
  creator: one(users, {
    fields: [caseNotes.createdBy],
    references: [users.id],
  }),
}));

export const caseInsightsRelations = relations(caseInsights, ({ one }) => ({
  organization: one(organizations, {
    fields: [caseInsights.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [caseInsights.caseId],
    references: [cases.id],
  }),
}));

export const caseStrengthAnalysisRelations = relations(caseStrengthAnalysis, ({ one }) => ({
  organization: one(organizations, {
    fields: [caseStrengthAnalysis.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [caseStrengthAnalysis.caseId],
    references: [cases.id],
  }),
}));

export const caseRisksRelations = relations(caseRisks, ({ one }) => ({
  organization: one(organizations, {
    fields: [caseRisks.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [caseRisks.caseId],
    references: [cases.id],
  }),
  identifier: one(users, {
    fields: [caseRisks.identifiedBy],
    references: [users.id],
  }),
}));

export const caseStrategyRelations = relations(caseStrategy, ({ one }) => ({
  organization: one(organizations, {
    fields: [caseStrategy.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [caseStrategy.caseId],
    references: [cases.id],
  }),
  creator: one(users, {
    fields: [caseStrategy.createdBy],
    references: [users.id],
  }),
}));

export const precedentCasesRelations = relations(precedentCases, ({ one }) => ({
  organization: one(organizations, {
    fields: [precedentCases.organizationId],
    references: [organizations.id],
  }),
  case: one(cases, {
    fields: [precedentCases.caseId],
    references: [cases.id],
  }),
}));
