import type { z } from "zod";
import type { localeSchema } from "./schema";

export function formatPrice(
  price: number,
  currency: Intl.NumberFormatOptions["currency"],
  locale: z.infer<typeof localeSchema>,
) {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
    currencySign: "standard",
    maximumFractionDigits: 0,
  });

  // switch (locale) {
  //   case "en": {
  //     return price.toLocaleString("es", {
  //       style: "currency",
  //       currency: currency,
  //       currencyDisplay: "symbol",
  //       currencySign: "standard",
  //     });
  //   }
  //   case "es": {
  //     return price.toLocaleString("es-ES");
  //   }
  //   case "de": {
  //     return price.toLocaleString("de-DE");
  //   }
  // }
}
