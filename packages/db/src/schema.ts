import type { i18nStringSchema } from "@repo/i18n/schemas";
import type { defaultRoles as userDefaultRoles } from "better-auth/plugins/admin/access";
import type { defaultRoles as memberDefaultRoles } from "better-auth/plugins/organization/access";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { z } from "zod";
import type {
  kyeroEnergyRatingDbType,
  kyeroImageDbType,
  kyeroSurfaceAreaDbType,
} from "./kyeroSchemas";

export const USER_ROLE_ENUM = ["user", "admin"] as const satisfies Array<
  keyof typeof userDefaultRoles
>;
export const MEMBER_ROLE_ENUM = [
  "admin",
  "member",
  "owner",
] as const satisfies Array<keyof typeof memberDefaultRoles>;
export const PROPERTY_STATUS_ENUM = [
  "active",
  "inactive",
  "pending",
  "sold",
  "rented",
] as const;
export const ORGANIZATION_PLAN_ENUM = ["free", "pro", "enterprise"] as const;

export const userRoleEnum = pgEnum("userRole", USER_ROLE_ENUM);
export const memberRoleEnum = pgEnum("memberRole", MEMBER_ROLE_ENUM);
export const planEnum = pgEnum("plan", ORGANIZATION_PLAN_ENUM);
export const propertyStatusEnum = pgEnum(
  "propertyStatus",
  PROPERTY_STATUS_ENUM,
);

export const property = pgTable(
  "property",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ref: text("ref").unique(),
    price: integer("price").notNull(),
    type: text("type").notNull(),
    town: text("town").notNull(),
    province: text("province").notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    // -- Optional / Conditional Fields --
    priceFreq: text("price_freq").notNull().default("sale"),
    currency: text("currency").notNull().default("eur"),
    partOwnership: boolean("part_ownership").default(false),
    leasehold: boolean("leasehold").default(false),
    newBuild: boolean("new_build").default(false),
    locationDetail: text("location_detail"),
    beds: integer("beds").notNull(),
    baths: integer("baths").notNull(),
    pool: boolean("pool").notNull().default(false),
    // -- Nested Objects --
    surfaceArea:
      jsonb("surface_area").$type<z.infer<typeof kyeroSurfaceAreaDbType>>(),
    energyRating:
      jsonb("energy_rating").$type<z.infer<typeof kyeroEnergyRatingDbType>>(),
    url: text("url"),
    notes: text("notes"),
    // -- Description and Features (Multi-language) --
    desc: jsonb("desc").$type<z.infer<typeof i18nStringSchema>>(),
    features: jsonb("features").$type<z.infer<typeof i18nStringSchema>>(),
    // -- Arrays --
    images: jsonb("images").$type<z.infer<typeof kyeroImageDbType>[]>(),
    // -- V3.5+ Additions --
    videoUrl: text("video_url"),
    virtualTourUrl: text("virtual_tour_url"),
    catastral: text("catastral"),
    // -- V3.7+ Additions --
    email: text("email"),
    // -- V3.8+ Additions --
    prime: boolean("prime").default(false),
    // -- V3.9+ Additions --
    contactNumber: text("contact_number"),
    whatsappNumber: text("whatsapp_number"),
    // -- Property status --
    status: propertyStatusEnum("status").default("active").notNull(),
    // -- Standard fields for created and updated timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("property_organizationId_idx").on(table.organizationId),
    index("property_status_idx").on(table.status),
  ],
);

// *****************************************************************
// ******************** BETTER AUTH ********************************
// *****************************************************************

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  role: userRoleEnum("role").default("user").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  defaultOrganizationId: text("default_organization_id").references(
    () => organization.id,
    { onDelete: "cascade" },
  ),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
    activeOrganizationId: text("active_organization_id"),
  },
  (table) => [
    index("session_userId_idx").on(table.userId),
    index("session_token_idx").on(table.token),
  ],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  plan: planEnum("plan").default("free").notNull(),
  createdAt: timestamp("created_at").notNull(),
  metadata: text("metadata"),
});

export const member = pgTable(
  "member",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: memberRoleEnum("role").default("member").notNull(),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => [
    index("member_organizationId_idx").on(table.organizationId),
    index("member_userId_idx").on(table.userId),
  ],
);

export const invitation = pgTable(
  "invitation",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: memberRoleEnum("role"),
    status: text("status").default("pending").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("invitation_organizationId_idx").on(table.organizationId),
    index("invitation_email_idx").on(table.email),
  ],
);
