// ============================================================================
// GEOGRAPHIC DATA - Autonomous Communities & Provinces of Spain
// ============================================================================

export const SPAIN_AUTONOMOUS_COMMUNITIES = {
  // Andalusia - Costa del Sol, Costa de Almería, Cádiz coastline
  Andalucía: [
    "Almería",
    "Cádiz",
    "Córdoba",
    "Granada",
    "Huelva",
    "Jaén",
    "Málaga",
    "Sevilla",
  ],

  // Aragon - Inland, no coast
  Aragón: ["Huesca", "Teruel", "Zaragoza"],

  // Asturias - Cantabrian coast
  "Principado de Asturias": ["Asturias"],

  // Balearic Islands - Mediterranean islands (Mallorca, Menorca, Ibiza, Formentera)
  "Illes Balears": ["Illes Balears"],

  // Basque Country - Cantabrian coast
  "País Vasco": ["Álava", "Bizkaia", "Gipuzkoa"],

  // Canary Islands - Atlantic islands
  "Islas Canarias": ["Las Palmas", "Santa Cruz de Tenerife"],

  // Cantabria - Cantabrian coast (Costa Verde)
  "Principado de Cantabria": ["Cantabria"],

  // Castile and León - Inland, no coast
  "Castilla y León": [
    "Ávila",
    "Burgos",
    "León",
    "Palencia",
    "Salamanca",
    "Segovia",
    "Soria",
    "Valladolid",
    "Zamora",
  ],

  // Castile-La Mancha - Inland, no coast
  "Castilla-La Mancha": [
    "Albacete",
    "Ciudad Real",
    "Cuenca",
    "Guadalajara",
    "Toledo",
  ],

  // Catalonia - Costa Brava, Costa Dorada
  Cataluña: ["Barcelona", "Girona", "Lleida", "Tarragona"],

  // Ceuta - Autonomous city on North African coast (Mediterranean)
  Ceuta: ["Ceuta"],

  // Community of Madrid - Inland, no coast
  "Comunidad de Madrid": ["Madrid"],

  // Extremadura - Costa de la Luz (Huelva portion), inland mostly
  Extremadura: ["Badajoz", "Cáceres"],

  // Galicia - Rías Baixas, Rías Altas (Atlantic)
  Galicia: ["A Coruña", "Lugo", "Ourense", "Pontevedra"],

  // La Rioja - Inland, no coast
  "La Rioja": ["La Rioja"],

  // Melilla - Autonomous city on North African coast (Mediterranean)
  Melilla: ["Melilla"],

  // Region of Murcia - Costa Cálida
  "Región de Murcia": ["Murcia"],

  // Navarre - Inland, no coast
  "Comunidad Foral de Navarra": ["Navarra"],

  // Valencian Community - Costa Blanca, Costa del Azahar
  "Comunidad Valenciana": ["Alicante", "Castellón", "Valencia"],
} as const;

export type SpanishAutonomousCommunity =
  keyof typeof SPAIN_AUTONOMOUS_COMMUNITIES;

export type SpanishProvince =
  (typeof SPAIN_AUTONOMOUS_COMMUNITIES)[SpanishAutonomousCommunity][number];

// Individual coastal provinces (for easier filtering)
const COASTAL_PROVINCES_LIST = [
  "Girona",
  "Barcelona",
  "Tarragona",
  "Castellón",
  "Valencia",
  "Alicante",
  "Murcia",
  "Almería",
  "Málaga",
  "Cádiz",
  "Huelva",
  "Illes Balears",
  "Las Palmas",
  "Santa Cruz de Tenerife",
  "A Coruña",
  "Pontevedra",
  "Asturias",
  "Cantabria",
  "Gipuzkoa",
  "Bizkaia",
  "Ceuta",
  "Melilla",
] as const;

export type CoastalProvince = (typeof COASTAL_PROVINCES_LIST)[number];

// Named coastal regions for display purposes
export const COASTAL_REGIONS = {
  COSTA_BRAVA: {
    provinces: ["Girona", "Barcelona"] as const,
    region: "Cataluña",
  },
  COSTA_DORADA: { provinces: ["Tarragona"] as const, region: "Cataluña" },
  COSTA_DEL_AZAHAR: {
    provinces: ["Castellón", "Valencia"] as const,
    region: "Comunidad Valenciana",
  },
  COSTA_BLANCA: {
    provinces: ["Alicante"] as const,
    region: "Comunidad Valenciana",
  },
  COSTA_CÁLIDA: {
    provinces: ["Murcia", "Almería"] as const,
    region: "Región de Murcia | Andalucía",
  },
  COSTA_DEL_SOL: {
    provinces: ["Málaga", "Cádiz"] as const,
    region: "Andalucía",
  },
  COSTA_DE_LA_LUZ: { provinces: ["Huelva"] as const, region: "Andalucía" },
  ISLAS_BALEARES: {
    provinces: ["Illes Balears"] as const,
    region: "Illes Balears",
  },
  CANARIAS_ESTE: {
    provinces: ["Las Palmas"] as const,
    region: "Islas Canarias",
  },
  CANARIAS_OESTE: {
    provinces: ["Santa Cruz de Tenerife"] as const,
    region: "Islas Canarias",
  },
  COSTA_DE_OURO: {
    provinces: ["A Coruña", "Pontevedra"] as const,
    region: "Galicia",
  },
  COSTA_VERDE: {
    provinces: ["Asturias", "Cantabria"] as const,
    region: "Principado de Asturias | Principado de Cantabria",
  },
  COSTA_VASCA: {
    provinces: ["Gipuzkoa", "Bizkaia"] as const,
    region: "País Vasco",
  },
} as const;

export type CoastalRegionKey = keyof typeof COASTAL_REGIONS;

// ============================================================================
// PROPERTY TYPES - Spanish Real Estate Market
// ============================================================================

export const PROPERTY_TYPES = [
  "Piso/Apartmento",
  "Casa/Villa",
  "Adosado/Chalet Adosado",
  "Local Comercial",
  "Terreno/Terreno Edificable",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PROPERTY_STATES = ["Nueva Construcción", "Segunda Mano"] as const;

export type PropertyState = (typeof PROPERTY_STATES)[number];

// ============================================================================
// LISTING STATUS
// ============================================================================

export const LISTING_STATUSES = [
  "active",
  "inactive",
  "pending",
  "reserved",
] as const;

export type ListingStatus = (typeof LISTING_STATUSES)[number];

// ============================================================================
// SUBSCRIPTION LEVELS
// ============================================================================

export const SUBSCRIPTION_LEVELS = ["free", "pro"] as const;

export type SubscriptionLevel = (typeof SUBSCRIPTION_LEVELS)[number];

// ============================================================================
// AGENT ROLES & PERMISSIONS
// ============================================================================

export const AGENT_ROLES = ["admin", "agent", "viewer"] as const;

export type AgentRole = (typeof AGENT_ROLES)[number];

// ============================================================================
// FORM VALIDATION LIMITS
// ============================================================================

export const MAX_TITLE_LENGTH = 150;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const MIN_PRICE_EUR = 10000;
export const MAX_PRICE_EUR = 99999999;
export const MIN_BEDROOMS = 0;
export const MAX_BEDROOMS = 20;
export const MIN_BATHROOMS = 0;
export const MAX_BATHROOMS = 20;
export const MIN_SQUARE_METERS = 10;
export const MAX_SQUARE_METERS = 99999;

// ============================================================================
// UI PLACEHOLDERS
// ============================================================================

export const PLACEHOLDER_AGENCY_LOGO = {
  alt: "Placeholder Agency Logo",
  src: "/placeholder-mesh-gradient.svg",
} as const;

export const PLACEHOLDER_PROPERTY_IMAGE = {
  alt: "Placeholder Property Image",
  src: "/placeholder-property-image.jpg",
} as const;
