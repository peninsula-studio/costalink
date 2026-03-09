import { ArrowRight, Bath, BedDouble, Expand } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
} from "@/components/ui/item";
import type { property } from "@/lib/db/schema";
import { formatPrice } from "@/lib/i18n/format";

export const PropertyCard = ({
  data,
}: {
  data: typeof property.$inferSelect;
}) => {
  return (
    <Card className="group relative px-0 pt-0 transition-shadow hover:shadow-3xl">
      <CardHeader className="overflow-hidden px-0">
        <div className="h-72 w-full">
          <img
            alt="Serenity Residential Home"
            className="h-full w-full object-cover transition-all group-hover:scale-110 group-hover:brightness-75"
            height={300}
            src={
              data.images?.[0].url ||
              "https://images.shadcnspace.com/assets/card/property-cover-1.jpg"
            }
            width={440}
          />
        </div>

        <div className="absolute top-6 right-6 rounded-full bg-foreground p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowRight className="text-background" />
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <ItemGroup className="flex-row justify-between *:w-fit">
          <Item>
            <ItemContent>
              <h3 className="font-medium text-xl duration-300 group-hover:text-primary">
                Serenity Residential Home
              </h3>

              <p className="font-normal text-base text-muted-foreground">
                15 S Aurora Ave, Miami
              </p>
            </ItemContent>
          </Item>

          <Item>
            <ItemContent className="font-medium text-lg">
              {formatPrice(data.price, data.currency, "es")}
            </ItemContent>
          </Item>
        </ItemGroup>

        <ItemGroup className="flex-row">
          <Item className="flex-col" size="xs">
            <ItemMedia variant="icon">
              <BedDouble />
            </ItemMedia>
            <ItemContent>{data.beds} Bedrooms</ItemContent>
          </Item>

          <ItemSeparator orientation="vertical" />

          <Item className="flex-col" size="xs">
            <ItemMedia variant="icon">
              <Bath />
            </ItemMedia>
            {data.baths} Bathrooms
          </Item>

          <ItemSeparator orientation="vertical" />

          {data.surfaceArea && (
            <Item className="flex-col" size="xs">
              <ItemMedia variant="icon">
                <Expand />
              </ItemMedia>
              <ItemContent className="whitespace-nowrap">
                {data.surfaceArea.built} m<sup>2</sup>
              </ItemContent>
            </Item>
          )}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};
