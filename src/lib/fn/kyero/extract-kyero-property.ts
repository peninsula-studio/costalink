import { XMLParser } from "fast-xml-parser";
import type {
  KyeroImage,
  KyeroProperty,
  KyeroMultiLanguageString,
} from "@/lib/fn/kyero/types";

// --- Extraction Function ---

/**
 * Parses a raw Kyero V3 XML string and extracts all property fields.
 * @param xmlData The raw XML string content.
 * @returns An array of KyeroProperty objects.
 */
export function extractKyeroProperties(xmlData: string): KyeroProperty[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "", // Keeps attribute names simple (e.g., 'id' instead of '@_id')
    isArray: (name, jpath) => {
      // Force these tags to always be arrays, even if there is only one item
      const arrayTags = ["property", "image"];
      return arrayTags.includes(name);
    },
    tagValueProcessor: (
      tagName,
      tagValue,
      jPath,
      hasAttributes,
      isLeafNode,
    ) => {
      // Optional: formatting specific values if needed
      return tagValue;
    },
  });

  const parsedResult = parser.parse(xmlData);

  // Navigate to the list of properties.
  // Structure is usually <root><property>...</property>...</root>
  // or sometimes <root><kyero><feed_version>...</feed_version></kyero><property>...</property></root>

  const root = parsedResult.root || parsedResult.kyero; // Handle potential root naming variations
  if (!root || !root.property) {
    return [];
  }

  // Map the parsed raw data to our typed structure to ensure cleanliness
  const properties: KyeroProperty[] = root.property.map((rawProp: any) => {
    // Helper to handle boolean conversion from "1"/"0"/"true"/"false"
    const toBool = (val: any) => val === 1 || val === "1" || val === "true";

    // Helper to handle images extraction
    let images: KyeroImage[] = [];
    if (rawProp.images && rawProp.images.image) {
      // If fast-xml-parser didn't auto-array it (handled by isArray option, but double checking)
      const rawImages = Array.isArray(rawProp.images.image)
        ? rawProp.images.image
        : [rawProp.images.image];

      images = rawImages.map((img: any) => ({
        id: img.id,
        url: img.url || img["#text"] || img, // Handle <url> tag vs direct text
      }));
    }

    // Helper to extract nested MultiLanguage objects (desc, features)
    const extractMultiLang = (node: any): KyeroMultiLanguageString | undefined => {
      if (!node) return undefined;
      // Filter out non-language keys if any artifact exists
      const result: KyeroMultiLanguageString = {};
      Object.keys(node).forEach((key) => {
        if (typeof node[key] === "string") {
          result[key] = node[key];
        }
      });
      return result;
    };

    const prop: KyeroProperty = {
      id: rawProp.id,
      date: rawProp.date,
      ref: rawProp.ref,
      price: Number(rawProp.price),
      currency: rawProp.currency,
      price_freq: rawProp.price_freq,
      type: rawProp.type,
      town: rawProp.town,
      province: rawProp.province,
      location_detail: rawProp.location_detail,
      beds: rawProp.beds ? Number(rawProp.beds) : undefined,
      baths: rawProp.baths ? Number(rawProp.baths) : undefined,
      pool: toBool(rawProp.pool),
      part_ownership: toBool(rawProp.part_ownership),
      leasehold: toBool(rawProp.leasehold),
      new_build: toBool(rawProp.new_build),
      prime: toBool(rawProp.prime),

      surface_area: rawProp.surface_area
        ? {
            built: rawProp.surface_area.built
              ? Number(rawProp.surface_area.built)
              : undefined,
            plot: rawProp.surface_area.plot
              ? Number(rawProp.surface_area.plot)
              : undefined,
          }
        : undefined,

      energy_rating: rawProp.energy_rating
        ? {
            consumption: rawProp.energy_rating.consumption,
            emissions: rawProp.energy_rating.emissions,
          }
        : undefined,

      url: rawProp.url,
      desc: extractMultiLang(rawProp.desc),
      features: extractMultiLang(rawProp.features),
      images: images,
      notes: rawProp.notes,

      video_url: rawProp.video_url,
      virtual_tour_url: rawProp.virtual_tour_url,
      catastral: rawProp.catastral,
      email: rawProp.email,
      contact_number: rawProp.contact_number,
      whatsapp_number: rawProp.whatsapp_number,
    };

    return prop;
  });

  return properties;
}

// --- Example Usage ---
/*
(async () => {
    // In a real scenario, fetch the feed content first
    const response = await fetch('https://feeds.kyero.com/assets/kyero_v3_test_feed.xml');
    const xmlContent = await response.text();
    
    const data = extractKyeroProperties(xmlContent);
    console.log(JSON.stringify(data[0], null, 2));
})();
*/
