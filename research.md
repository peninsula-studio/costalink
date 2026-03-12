# CostaLink - Research & Implementation Plan

## Project Overview

**Goal:** Build a subscription-based SaaS platform for Spanish real estate agents and agencies to import, manage, and share properties with other professionals and clients.

**Key Objectives:**
- Enable property import from external feeds (primarily Kyero XML v3 format)
- Implement subscription tiers for agencies/agents
- Create public, shareable property URLs for non-subscribed users
- Build an MLS-like network for coastal real estate regions in Spain
- Ensure compliance with Spanish real estate regulations (energy certificates, catastral references, GDPR)

**Technical Stack:**
- TanStack Router with file-based routing
- React Query for data fetching
- Zod for validation
- Better Auth with organization plugins
- PostgreSQL (NeonDB) with Drizzle ORM
- TanStack Start for server functions

---

## Codebase Analysis

### Authentication & Organization

**File:** `/src/lib/auth/index.ts`
- Better Auth configured with Drizzle adapter
- Organization plugin enabled
- Admin users can create organizations
- Session cookies via TanStack Start adapter

**File:** `/src/middleware/auth.ts`
- Session cookie middleware for protected routes
- `authMiddleware` and `adminMiddleware` available

**File:** `/src/lib/db/schema.ts`

#### Organization Schema
```typescript
export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  plan: planEnum("plan").default("free").notNull(), // free | pro | enterprise
  createdAt: timestamp("created_at").notNull(),
  metadata: text("metadata"),
});
```

#### Member Schema
```typescript
export const member = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organization_id").references(() => organization.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  role: memberRoleEnum("role").default("member").notNull(), // owner | admin | member
  createdAt: timestamp("created_at").notNull(),
});
```

**File:** `/src/lib/fn/organization.ts`
- Organization list query
- Active organization management
- Full organization details with members

### Property Management

**File:** `/src/lib/db/schema.ts` - Property Table
```typescript
export const property = pgTable("property", {
  id: uuid("id").primaryKey().defaultRandom(),
  ref: text("ref").unique(),
  price: integer("price").notNull(),
  type: text("type").notNull(),
  town: text("town").notNull(),
  province: text("province").notNull(),
  organizationId: text("organization_id").references(() => organization.id, { onDelete: "cascade" }),
  
  // Optional fields
  priceFreq: text("price_freq").default("sale"),
  currency: text("currency").default("eur"),
  partOwnership: boolean("part_ownership").default(false),
  leasehold: boolean("leasehold").default(false),
  newBuild: boolean("new_build").default(false),
  locationDetail: text("location_detail"),
  beds: integer("beds").notNull(),
  baths: integer("baths").notNull(),
  pool: boolean("pool").default(false),
  
  // Nested objects (JSONB)
  surfaceArea: jsonb("surface_area"),
  energyRating: jsonb("energy_rating"),
  
  // Multi-language (JSONB)
  desc: jsonb("desc"), // i18nStringSchema
  features: jsonb("features"), // i18nStringSchema
  
  // Arrays (JSONB)
  images: jsonb("images"), // kyeroImageSchema[]
  
  // V3.5+ additions
  videoUrl: text("video_url"),
  virtualTourUrl: text("virtual_tour_url"),
  catastral: text("catastral"),
  
  // V3.7+ additions
  email: text("email"),
  
  // V3.8+ additions
  prime: boolean("prime").default(false),
  
  // V3.9+ additions
  contactNumber: text("contact_number"),
  whatsappNumber: text("whatsapp_number"),
  
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});
```

**File:** `/src/lib/fn/property.ts`
- `getOrganizationPropertiesFn` - List properties by organization
- `createPropertyFn` - Create single property
- `extractAndSavePropertiesFromKyeroXMLFn` - Import from XML
- `extractPropertiesFromKyeroXMLFn` - Parse XML without saving
- `checkPropertyReferenceFn` - Check if reference exists

**File:** `/src/lib/fn/kyero/extract-kyero-property.ts`
- Parses Kyero XML v3 format
- Extracts all property fields including multi-language content
- Returns validated data via Zod schema

**File:** `/src/lib/fn/kyero/schemas.ts`
- `kyeroPropertySchema` - Full property validation
- `kyeroImageSchema` - Image URL validation
- `kyeroSurfaceAreaSchema` - Built/plot area
- `kyeroEnergyRatingSchema` - Energy consumption/emissions
- `kyeroFeedSchema` - Root XML structure

### i18n Support

**File:** `/src/lib/i18n/schema.ts`
```typescript
export const LOCALES = ["es", "en", "de", "fr", "nl", "no", "sv", "ru"] as const;
export const i18nStringSchema = z.record(localeSchema, z.string());
```

### Import UI

**File:** `/src/routes/app/$organizationId/property/import.tsx`
- Form to input Kyero XML feed URL
- Preview extracted properties before import
- Bulk import functionality
- Loading states and error handling

### Current Routes

**File:** `/src/routes/app/route.tsx`
- Dashboard entry point with auth protection
- Sidebar layout with navigation

**File:** `/src/routes/app/$organizationId/property/index.tsx`
- Placeholder route for property list
- Currently just shows "Property list" button

**File:** `/src/routes/app/$organizationId/property/create.tsx`
- Manual property creation form

---

## Current Gaps Identified

### 1. No Property List UI
- `/property/index.tsx` is a placeholder
- Need full property list view with:
  - Search/filter by price, beds, location, status
  - Sort options
  - Pagination or infinite scroll
  - Bulk actions (delete, update status)

### 2. No Subscription/Billing Implementation
- Plan enum exists (`free`, `pro`, `enterprise`) but no logic:
  - Plan limits (e.g., free: 10 properties, pro: 100, enterprise: unlimited)
  - Import quota tracking per organization
  - Plan upgrade prompts based on usage
  - Billing integration (Stripe recommended)

### 3. No Public Property Sharing
- No mechanism to generate shareable URLs for non-subscribed users
- Need:
  - Public URL generation: `costalink.com/p/{propertyId}`
  - Public property detail view (no login required)
  - Lead capture form on public views
  - Email notifications when leads are generated

### 4. Limited Property CRUD
- Only create property exists
- Missing:
  - Edit property functionality
  - Delete property with confirmation
  - Property status management (active, pending, sold)
  - Bulk operations

### 5. No Lead Tracking
- No system to track inquiries from public property views
- Need:
  - Lead database (name, email, phone, interested property)
  - Lead status (new, contacted, qualified, converted)
  - Lead assignment to agents
  - Export functionality

### 6. No Import History
- No tracking of what was imported when
- Need:
  - Import history table
  - Import status (success, partial, failed)
  - Error reporting for failed imports
  - Re-import functionality

---

## Implementation Plan

### Phase 1: Property Management (Critical)

**Priority:** High - Core functionality agents need daily

**Tasks:**
1. **Property List View** (`/app/$organizationId/property/list.tsx`)
   - Table/Grid view of all properties
   - Search by: ref, town, province, price range, beds, baths
   - Filter by: type (sale/rent), status (active/pending/sold)
   - Sort by: price, date added, ref
   - Pagination (50 items per page)
   - Bulk actions checkbox

2. **Property Edit View** (`/app/$organizationId/property/$propertyId/edit.tsx`)
   - Pre-filled form with current data
   - Image gallery with add/remove
   - Multi-language editors for desc/features
   - Save with validation

3. **Property Detail View** (`/app/$organizationId/property/$propertyId/index.tsx`)
   - Full property information display
   - Image carousel
   - Edit/Delete buttons
   - Import history (if imported from XML)

4. **Property Status Management**
   - Add `status` field to property schema
   - Status enum: `active`, `pending`, `sold`, `rented`
   - Quick status toggle in list view

5. **Delete with Confirmation**
   - Confirm dialog before delete
   - Soft delete (set status instead of hard delete)
   - Restore functionality for soft deletes

**Files to Create/Modify:**
- `/src/routes/app/$organizationId/property/list.tsx` (NEW)
- `/src/routes/app/$organizationId/property/$propertyId/index.tsx` (NEW)
- `/src/routes/app/$organizationId/property/$propertyId/edit.tsx` (NEW)
- `/src/lib/db/schema.ts` (ADD status field)
- `/src/lib/fn/property.ts` (ADD update/delete functions)

### Phase 2: Subscription Model

**Priority:** Medium - Business logic for monetization

**Tasks:**
1. **Plan Limits**
   - Define limits per plan:
     - Free: 10 properties, 1 import/month
     - Pro: 100 properties, 10 imports/month
     - Enterprise: Unlimited
   - Add `propertyCount` field to organization
   - Track import count per month

2. **Quota Tracking**
   - Check quota before import
   - Show quota warning in UI
   - Block imports over quota (with upgrade prompt)

3. **Billing Integration** (Stripe)
   - Install Stripe SDK
   - Create customer on organization creation
   - Handle subscription webhooks
   - Plan upgrade/downgrade flows

4. **Upgrade Prompts**
   - Modal when hitting quota
   - Pricing page comparison
   - Admin panel to manually adjust limits

**Files to Create/Modify:**
- `/src/lib/db/schema.ts` (ADD quota fields to organization)
- `/src/lib/fn/property.ts` (ADD quota checking)
- `/src/routes/app/$organizationId/settings.tsx` (NEW - plan management)
- `/src/routes/app/$organizationId/billing.tsx` (NEW - upgrade UI)

### Phase 3: Public Property Sharing

**Priority:** Medium - Enable client-facing features

**Tasks:**
1. **Public URL Generation**
   - Add `publicId` field to property (UUID or slug)
   - Route: `/p/$publicId` (public, no auth)
   - SEO meta tags for social sharing

2. **Public Property Detail View**
   - Simplified view (no admin buttons)
   - Full image gallery
   - Contact form (name, email, phone, message)
   - "Request viewing" CTA

3. **Lead Capture**
   - Lead schema: `id`, `propertyId`, `name`, `email`, `phone`, `message`, `status`
   - Form submission creates lead
   - Email notification to property owner
   - Lead dashboard for agents

4. **Share Buttons**
   - Social media share buttons
   - Copy link functionality
   - QR code generation for print materials

**Files to Create/Modify:**
- `/src/lib/db/schema.ts` (ADD publicId to property, ADD lead table)
- `/src/routes/p/$publicId.tsx` (NEW - public view)
- `/src/routes/app/$organizationId/leads.tsx` (NEW - lead dashboard)
- `/src/lib/fn/property.ts` (ADD public ID generation)
- `/src/lib/fn/lead.ts` (NEW - lead CRUD)

### Phase 4: Advanced Features

**Priority:** Low - Nice-to-have enhancements

**Tasks:**
1. **Analytics Dashboard**
   - Property view counts (public and private)
   - Lead conversion rates
   - Import success rates
   - Traffic sources

2. **Additional Import Formats**
   - CSV import (with mapping UI)
   - Excel import (with parsing library)
   - API integration for other feeds

3. **Compliance Features**
   - Energy certificate upload (PDF)
   - COP (Certificado de Eficiencia Energética) display on public views
   - GDPR compliance: data export, data deletion
   - Cookie consent banner

4. **Multi-Agency Network**
   - Property sharing between agencies
   - Commission tracking
   - Co-brokerage features
   - Network directory

**Files to Create/Modify:**
- `/src/routes/app/$organizationId/analytics.tsx` (NEW)
- `/src/routes/app/$organizationId/import/csv.tsx` (NEW)
- `/src/routes/app/$organizationId/compliance.tsx` (NEW)
- `/src/lib/db/schema.ts` (ADD analytics tables)

---

## Environment Configuration

**Current `.env`:**
```
DATABASE_URL="postgresql://neondb_owner:***@ep-wild-meadow-agxq4ss4-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
SERVER_URL="http://localhost:3000"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="64wM5v7u19Zk9ytyiDWD3UO2gGLtpJEt"
VITE_APP_TITLE="My app title"
VITE_ROOT_DOMAIN="http://localhost:3000"
```

**Required Additions:**
```
STRIPE_SECRET_KEY=sk_test_***
STRIPE_WEBHOOK_SECRET=whsec_***
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_***
```

---

## Database Schema Recommendations

### Additional Fields for Organization
```typescript
export const organization = pgTable("organization", {
  // ... existing fields
  plan: planEnum("plan").default("free").notNull(),
  maxProperties: integer("max_properties").default(10), // Plan-based limit
  propertyCount: integer("property_count").default(0), // Current count
  monthlyImports: integer("monthly_imports").default(0), // Tracked monthly
  importResetDate: timestamp("import_reset_date"), // When to reset counter
});
```

### New Lead Table
```typescript
export const lead = pgTable("lead", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: uuid("property_id").references(() => property.id, { onDelete: "cascade" }),
  organizationId: text("organization_id").references(() => organization.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  status: text("status").default("new").notNull(), // new | contacted | qualified | converted | lost
  source: text("source").default("public").notNull(), // public | private | import
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### Import History Table
```typescript
export const importHistory = pgTable("import_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: text("organization_id").references(() => organization.id, { onDelete: "cascade" }),
  sourceUrl: text("source_url").notNull(),
  status: text("status").notNull(), // success | partial | failed
  totalProperties: integer("total_properties").notNull(),
  importedCount: integer("imported_count").notNull(),
  failedCount: integer("failed_count").notNull(),
  errors: jsonb("errors"), // Array of error objects
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

---

## Implementation Progress

### Phase 1: Property Management - IN PROGRESS

**Completed:**
- ✅ Analyzed existing codebase structure
- ✅ Added `status` field to property schema (active, pending, sold, rented)
- ✅ Created property list view (`/src/routes/app/$organizationId/property/index.tsx`)
  - Search by ref, town, province
  - Filter by type and status
  - Sort by price, date, ref
  - Pagination (20 items per page)
- ✅ Created property detail view (`/src/routes/app/$organizationId/property/$propertyId.tsx`)
  - Full property information display
  - Contact info and features
  - Image gallery
- ✅ Added update/delete functions to `property.ts`
- ✅ Added query options for single property

**Remaining:**
- Fix LSP errors in property list (Field labels)
- Create property edit view
- Add subscription quota checking
- Add public property sharing
- Build lead capture system

**Once Phase 1 is stable:**
5. Implement subscription quota checking
6. Add public property sharing
7. Build lead capture system

---

## Notes

- All property data uses JSONB for flexible multi-language content
- Images stored as array of objects with id and url (Kyero format)
- Energy certificates and catastral references already supported in schema
- Contact info (email, whatsapp, phone) already in schema for V3.9+
- Consider adding `isActive` flag for soft deletes instead of hard deletes
- Public properties should be indexed for SEO
- Lead notifications should go to organization admin email
