import { formatPrice } from "@repo/i18n/lib/format";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemSeparator,
} from "@repo/ui/components/item";
import { cn } from "@repo/ui/lib/utils";
import { Bath, BedDouble, Expand, MapPin } from "lucide-react";
import type { ComponentProps } from "react";
import type { property } from "@/lib/db/schema";

export const PropertyCard = ({
  data,
  className,
  ...props
}: ComponentProps<typeof Card> & {
  data: typeof property.$inferSelect;
}) => {
  return (
    <Card
      className={cn(
        "group relative pt-0 transition-shadow hover:shadow-3xl",
        className,
      )}
      {...props}
    >
      <CardHeader className="overflow-hidden p-0">
        <img
          alt="Serenity Residential Home"
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          height={300}
          src={
            data.images?.[0].url ||
            "https://images.shadcnspace.com/assets/card/property-cover-1.jpg"
          }
          width={440}
        />
      </CardHeader>

      <CardContent>
        <h3 className="font-bold text-xl">
          {formatPrice(data.price, data.currency, "es")}
        </h3>
        <p className="font-medium text-lg">{data.type}</p>
        <p className="inline-flex items-center gap-x-1 text-sm">
          <MapPin className="size-[1em]" /> {data.town}
        </p>

        <div className="flex flex-row">
          <Item className="flex-col" size="xs">
            <ItemMedia variant="icon">
              <BedDouble />
            </ItemMedia>
            <ItemContent>{data.beds} Bed</ItemContent>
          </Item>

          <ItemSeparator orientation="vertical" />

          <Item className="flex-col" size="xs">
            <ItemMedia variant="icon">
              <Bath />
            </ItemMedia>
            {data.baths} Bath
          </Item>

          <ItemSeparator orientation="vertical" />

          {data.surfaceArea && (
            <Item className="flex-col" size="xs">
              <ItemMedia variant="icon">
                <Expand />
              </ItemMedia>
              <ItemContent className="whitespace-nowrap">
                <span>
                  {data.surfaceArea.built} m<sup>2</sup>
                </span>
              </ItemContent>
            </Item>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
