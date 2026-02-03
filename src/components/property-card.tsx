import { ArrowRight, Bath, BedDouble, Expand } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const PropertyCard = () => (
  <Card className="group relative gap-0 rounded-2xl py-0 duration-300 hover:shadow-3xl">
    <div className="overflow-hidden rounded-t-2xl">
      <a href="#">
        <div className="h-72 w-full">
          <img
            alt="Serenity Residential Home"
            className="h-full w-full rounded-t-2xl object-cover transition delay-75 duration-300 group-hover:scale-125 group-hover:brightness-50"
            height={300}
            src="https://images.shadcnspace.com/assets/card/property-cover-1.jpg"
            width={440}
          />
        </div>
      </a>

      <div className="absolute top-6 right-6 hidden rounded-full bg-white p-4 group-hover:block">
        <ArrowRight className="text-card-foreground" />
      </div>
    </div>

    <div className="p-6">
      <div className="mb-6 flex justify-between gap-5">
        <div>
          <a href="#">
            <h3 className="font-medium text-xl duration-300 group-hover:text-primary">
              Serenity Residential Home
            </h3>
          </a>
          <p className="font-normal text-base text-muted-foreground">
            15 S Aurora Ave, Miami
          </p>
        </div>

        <Badge className="rounded-full bg-teal-500/10 px-5 py-4 font-normal text-base text-teal-500">
          $570,000
        </Badge>
      </div>

      <div className="flex">
        <div className="flex flex-col gap-2 border-border border-e pr-8 xs:pr-4">
          <BedDouble size={20} />
          <p className="text-sm sm:text-base">5 Bedrooms</p>
        </div>

        <div className="flex flex-col gap-2 border-border border-e px-8 xs:px-4">
          <Bath size={20} />
          <p className="text-sm sm:text-base">3 Bathrooms</p>
        </div>

        <div className="flex flex-col gap-2 pl-8 xs:pl-4">
          <Expand size={20} />
          <p className="text-sm sm:text-base">
            120m<sup>2</sup>
          </p>
        </div>
      </div>
    </div>
  </Card>
);
