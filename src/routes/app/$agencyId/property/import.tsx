import { zodResolver } from "@hookform/resolvers/zod";
import { useIsFetching, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileXCorner, HouseIcon, ImportIcon } from "lucide-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FlexContainer } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH2, TypographyLarge } from "@/components/ui/typography";
import { extractKyeroProperties } from "@/lib/fn/kyero/extract-kyero-property";

export const Route = createFileRoute("/app/$agencyId/property/import")({
  component: RouteComponent,
});

function RouteComponent() {
  const importKyeroXMLSchema = z.object({
    url: z.string(),
  });

  const { formState, register, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      // biome-error: THIS IS TESTING
      // ERROR: Don't build with this value
      url: "https://feeds.kyero.com/assets/kyero_v3_test_feed.xml",
    },
    mode: "onSubmit",
    resolver: zodResolver(importKyeroXMLSchema),
  });

  // const { data, mutate, isPending } = useMutation({
  //   mutationKey: ["getKyeroXML", watch("url")],
  //   mutationFn: async (data: z.infer<typeof importKyeroXMLSchema>) => {
  //     await new Promise((res) => setTimeout(res, 1000));
  //     const rawXmlData = await fetch(data.url);
  //     const blob = await rawXmlData.blob();
  //     const extracted = extractKyeroProperties(await blob.text());
  //     return extracted;
  //   },
  // });

  const isFetching = useIsFetching({
    fetchStatus: "fetching",
    queryKey: ["kyeroXML"],
  });

  return (
    <FlexContainer>
      <TypographyH2>Import properties from Kyero XML</TypographyH2>
      <form
        name="Import Kyero XML form"
        onSubmit={handleSubmit(async (data) => {})}
        // onSubmit={handleSubmit(async (data) => {
        //   mutate(data);
        // })}
      >
        <FieldSet>
          <Field className="max-w-2xl">
            <FieldContent>
              <FieldLabel htmlFor="kyero-feed-url">Kyero feed URL</FieldLabel>
              <Input
                id="kyero-feed-url"
                placeholder="https://www.website.com/feed/kyero-v3.xml"
                type="url"
                {...register("url", {
                  onChange: () => {
                    reset();
                  },
                })}
              />
            </FieldContent>
          </Field>
          <Field className="w-fit">
            <Button type="submit">
              {isFetching ? (
                <>
                  <Spinner /> Loading
                </>
              ) : (
                <>
                  <ImportIcon /> Import
                </>
              )}
            </Button>
          </Field>
        </FieldSet>
      </form>

      {(formState.isSubmitting || formState.isSubmitted) && (
        <Suspense fallback={<Skeleton className="h-12 w-full max-w-2xl" />}>
          <Results url={watch("url")} />
        </Suspense>
      )}
    </FlexContainer>
  );
}

function Results({ url }: { url: string }) {
  const { data } = useSuspenseQuery({
    queryKey: ["kyeroXML", url],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 1000));
      const rawXmlData = await fetch(url, {
        mode: "cors",
        // referrer: "https://www.medvillaspanje.com/",
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Content-Type": "application/json",
        // },
      });
      const blob = await rawXmlData.blob();
      const dev = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<root>
  <kyero>
    <feed_version>3</feed_version>
  </kyero>
  <property>
    <id>8983</id>
    <date>2026-01-30</date>
    <ref>MVS12-1200</ref>
    <price>293000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>Torrevieja</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.984881</latitude>
      <longitude>-0.680434</longitude>
    </location>
    <surface_area>
      <built>81</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//torrevieja/-8983.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//torrevieja/-8983.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//torrevieja/-8983.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and underground parking space with storage room. </p><p>La Hoya offers apartments and penthouses with spacious terraces or private solariums, including furniture, appliances, air conditioning, underfloor heating, and electric shutters. The complex features a large swimming pool, sports and recreational facilities, underground parking, a children's playground, barbecue areas, and a beautiful pond, all behind secure access.</p><p>Located next to the Lagunas de La Mata nature park and the pink salt lagoon, it's close to shops, schools, a hospital, and beaches. Alicante-Elche Airport is just 40 minutes away, with easy access via the N-332 and motorway.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en ondergrondse parkeerplaats met berging. </p><p>La Hoya biedt appartementen en penthouses met ruime terrassen of privé solarium, inclusief meubels, apparatuur, airco, vloerverwarming en elektrische rolluiken. Het complex heeft een groot zwembad, sport- en recreatiefaciliteiten, ondergrondse parking, kinderspeelplaats, barbecueplekken en een sierlijke vijver, alles achter beveiligde toegang.</p><p>Gelegen naast het natuurpark Lagunas de La Mata en de roze zoutlagune, dicht bij winkels, scholen, ziekenhuis en de stranden. Met snelle verbindingen via N-332 en snelweg bent u in 40 minuten op Alicante-Elche Airport.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking souterrain et débarras. </p><p>La Hoya propose des appartements et des penthouses avec de spacieuses terrasses ou des solariums privés, équipés de meubles, d'électroménagers, de la climatisation, du chauffage au sol et de volets électriques. Le complexe dispose d'une grande piscine, d'installations sportives et récréatives, d'un parking souterrain, d'une aire de jeux pour enfants, d'espaces barbecue et d'un magnifique étang, le tout avec un accès sécurisé.</p><p>Situé à proximité du parc naturel des Lagunas de La Mata et de la lagune de sel rose, il est proche des commerces, des écoles, d'un hôpital et des plages. L'aéroport d'Alicante-Elche est à seulement 40 minutes, facilement accessible par la N-332 et l'autoroute.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[all furniture]]>
      </feature>
      <feature>
        <![CDATA[furniture package]]>
      </feature>
      <feature>
        <![CDATA[electric shutters]]>
      </feature>
      <feature>
        <![CDATA[underfloor heating bathrooms]]>
      </feature>
      <feature>
        <![CDATA[Year construction:2027]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_la-hoya-hd-10.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_la-hoya-hd-1-.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_la-hoya-hd-4-.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-50.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-62.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-51.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-54.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-42.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-12.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-7.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-15.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_la-hoya-hd-2-.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_duly-san-miguel-de-salinas-1.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_la-hoya-hd-3-.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8983/g_la-hoya-hd-7-.jpg</url>
      </image>
    </images>
    <postcode>03181</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8192</id>
    <date>2026-02-20</date>
    <ref>MVS12-958</ref>
    <price>279900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>El Raso</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>38.059864</latitude>
      <longitude>-0.683335</longitude>
    </location>
    <surface_area>
      <built>101</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//el-raso/-8192.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//el-raso/-8192.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//el-raso/-8192.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 3 Bedrooms and 2 Bathrooms, inside & outside swimming pool and underground parking space. </p><p>We are pleased to inform you of <strong><em>VISTA AZUL XXXVII SPA & NATURE</em></strong> in <strong><em>El Raso Urbanization, in Guardamar del Segura - Alicante</em></strong>, a residential complex of <strong><em>175 apartments with 3 bedrooms and 2 bathrooms, </em></strong>all of them with large terraces where you can enjoy our climate.</p><p>This new Residential will have large common areas where you can relax in the large<strong><em>summer pool</em></strong> or in the <strong><em>Heated Spa</em></strong>, children will have to enjoy the <strong><em>"Vista Park"</em></strong> and the more sporty a <strong><em>gym area</em></strong> with bio-healthy machines and a <strong><em>" Putting Green Golf”</em></strong> to practice your swing, all in a closed complex with large and well-kept green areas for everyone to enjoy.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 3 Slaapkamers en 2 Badkamers, binnen & buiten zwembad en ondergrondse parkeerplaats. </p><p>175 appartementen met grote bewoonbare oppervlakte en ruime terrassen of tuinen, de penthouses bieden extra luxe met een buitenkeuken en jacuzzi op het solarium, waarvan de meesten panoramisch zicht hebben op het meer. Met een groot zwembad met jacuzzi, een verwarmd binnenzwembad met spa, een buiten gym en een "Putting Green" voor golfliefhebbers.</p><p>Gelegen in de groene en rustige wijk El Raso, bevindt het complex zich op korte afstand van de stranden van Guardamar, het natuurpark van La Mata en diverse voorzieningen. Met snelle verbindingen naar Guardamar, Torrevieja en de luchthaven van Alicante is dit een ideale locatie voor ontspanning en comfortabel wonen aan de Costa Blanca.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 3 Chambres et 2 Salles de bains, dedans & dehors piscine et parking souterrain. </p><p>Nous sommes ravis que VISTA AZUL XXXVII SPA & NATURE démarre dans l'urbanisation El Raso, à Guardamar del Segura - Alicante, un complexe résidentiel de 175 appartements avec 3 chambres et 2 salles de bain, tous avec de grandes terrasses où vous pourrez profiter de notre climat.</p><p>Cette nouvelle résidence disposera de grands espaces communs où vous pourrez vous détendre dans la grande piscine d'été ou dans le spa chauffé, les enfants pourront profiter du "Vista Park" et les plus sportifs, une salle de sport avec des machines bio-santé et un "Putting Green". Golf » pour pratiquer votre swing, le tout dans un complexe fermé avec de grands espaces verts bien entretenus pour le plaisir de tous.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[pre-air conditioning]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[Year construction:2025]]>
      </feature>
      <feature>
        <![CDATA[Special offer]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_whatsapp-image-2025-03-13-at-09-56-00-1.jpeg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-182519.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183142.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-182435.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183706.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183217.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183351.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-182413.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183456.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183645.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183314.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_whatsapp-image-2025-03-13-at-09-55-59.jpeg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_whatsapp-image-2025-03-13-at-09-55-58.jpeg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-183733.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_whatsapp-image-2025-03-13-at-09-56-00.jpeg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8192/g_tour-virtual-637-652-504-12132023-182630.jpg</url>
      </image>
    </images>
    <postcode>03149</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9180</id>
    <date>2026-02-11</date>
    <ref>MVS10-444</ref>
    <price>299900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Los Alcazares</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.748184</latitude>
      <longitude>-0.848066</longitude>
    </location>
    <surface_area>
      <built>59</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9180.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9180.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9180.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>The apartments are located in Los Alcázares, a short walk from the beach and right next to La Serena Golf, a beautiful 18-hole course renowned for its wide fairways and views of the Mar Menor. Murcia International Airport is approximately a 25-30 minute drive away, while Alicante Airport can be reached in approximately 55-60 minutes.</p><p>Cartagena is approximately 24 km away—ideal for a cultural or culinary outing. And for a day of shopping or urban amenities, the city of Murcia is about 50 km away.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>De appartementen liggen in Los Alcázares, op korte wandelafstand van het strand én direct bij La Serena Golf, een mooie 18-holes golfbaan die bekendstaat om haar brede fairways en uitzicht op de Mar Menor. Murcia International Airport ligt op ongeveer 25–30 minuten rijden, terwijl Alicante Airport in circa 55–60 minuten bereikbaar is.</p><p>Cartagena ligt op zo’n 24 km afstand — ideaal voor een cultureel of culinair uitstapje. En voor een dag winkelen of stedelijke voorzieningen ben je binnen ongeveer 50 km in de stad Murcia.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Les appartements se situent à Los Alcázares, à quelques pas de la plage et juste à côté du golf de La Serena, un magnifique parcours 18 trous réputé pour ses larges fairways et ses vues imprenables sur la Mar Menor. L'aéroport international de Murcie est à environ 25-30 minutes en voiture, tandis que l'aéroport d'Alicante est accessible en 55-60 minutes environ.</p><p>Carthagène se trouve à environ 24 km, idéal pour une escapade culturelle ou gastronomique. Enfin, pour une journée shopping ou profiter des commodités urbaines, la ville de Murcie est à environ 50 km.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[hob and extractor hood]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:-0001]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_dji_0841.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_dji_0809.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_t73a0486.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca05.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca02.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca16.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca31.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca30.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca38.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca28.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_dron01.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_ca27.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_t73a0496.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9180/g_t73a0492.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9181</id>
    <date>2026-02-11</date>
    <ref>MVS10-438</ref>
    <price>339900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Los Alcazares</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.748184</latitude>
      <longitude>-0.848066</longitude>
    </location>
    <surface_area>
      <built>80</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9181.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9181.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9181.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 3 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>The apartments are located in Los Alcázares, a short walk from the beach and right next to La Serena Golf, a beautiful 18-hole course renowned for its wide fairways and views of the Mar Menor. Murcia International Airport is approximately a 25-30 minute drive away, while Alicante Airport can be reached in approximately 55-60 minutes.</p><p>Cartagena is approximately 24 km away—ideal for a cultural or culinary outing. And for a day of shopping or urban amenities, the city of Murcia is about 50 km away.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 3 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>De appartementen liggen in Los Alcázares, op korte wandelafstand van het strand én direct bij La Serena Golf, een mooie 18-holes golfbaan die bekendstaat om haar brede fairways en uitzicht op de Mar Menor. Murcia International Airport ligt op ongeveer 25–30 minuten rijden, terwijl Alicante Airport in circa 55–60 minuten bereikbaar is.</p><p>Cartagena ligt op zo’n 24 km afstand — ideaal voor een cultureel of culinair uitstapje. En voor een dag winkelen of stedelijke voorzieningen ben je binnen ongeveer 50 km in de stad Murcia.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 3 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Les appartements se situent à Los Alcázares, à quelques pas de la plage et juste à côté du golf de La Serena, un magnifique parcours 18 trous réputé pour ses larges fairways et ses vues imprenables sur la Mar Menor. L'aéroport international de Murcie est à environ 25-30 minutes en voiture, tandis que l'aéroport d'Alicante est accessible en 55-60 minutes environ.</p><p>Carthagène se trouve à environ 24 km, idéal pour une escapade culturelle ou gastronomique. Enfin, pour une journée shopping ou profiter des commodités urbaines, la ville de Murcie est à environ 50 km.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[hob and extractor hood]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:-0001]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_t73a0552-01.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_t73a0526-01.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca26.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_3d5a9858.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca10.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca12.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca08.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca06.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca20.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_3d5a9825.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_ca21.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_3d5a9839.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_dji_0809.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9181/g_dron11.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9182</id>
    <date>2026-02-11</date>
    <ref>MVS10-427</ref>
    <price>319900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>Los Alcazares</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.748184</latitude>
      <longitude>-0.848066</longitude>
    </location>
    <surface_area>
      <built>80</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9182.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9182.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9182.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 3 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>The apartments are located in Los Alcázares, a short walk from the beach and right next to La Serena Golf, a beautiful 18-hole course renowned for its wide fairways and views of the Mar Menor. Murcia International Airport is approximately a 25-30 minute drive away, while Alicante Airport can be reached in approximately 55-60 minutes.</p><p>Cartagena is approximately 24 km away—ideal for a cultural or culinary outing. And for a day of shopping or urban amenities, the city of Murcia is about 50 km away.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 3 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>De appartementen liggen in Los Alcázares, op korte wandelafstand van het strand én direct bij La Serena Golf, een mooie 18-holes golfbaan die bekendstaat om haar brede fairways en uitzicht op de Mar Menor. Murcia International Airport ligt op ongeveer 25–30 minuten rijden, terwijl Alicante Airport in circa 55–60 minuten bereikbaar is.</p><p>Cartagena ligt op zo’n 24 km afstand — ideaal voor een cultureel of culinair uitstapje. En voor een dag winkelen of stedelijke voorzieningen ben je binnen ongeveer 50 km in de stad Murcia.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 3 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Les appartements se situent à Los Alcázares, à quelques pas de la plage et juste à côté du golf de La Serena, un magnifique parcours 18 trous réputé pour ses larges fairways et ses vues imprenables sur la Mar Menor. L'aéroport international de Murcie est à environ 25-30 minutes en voiture, tandis que l'aéroport d'Alicante est accessible en 55-60 minutes environ.</p><p>Carthagène se trouve à environ 24 km, idéal pour une escapade culturelle ou gastronomique. Enfin, pour une journée shopping ou profiter des commodités urbaines, la ville de Murcie est à environ 50 km.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[hob and extractor hood]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:-0001]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_dji_0846.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_ca06.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_ca08.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_ca10.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_ca12.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_t73a0492.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_t73a0496.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_t73a0486.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_3d5a9825.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_ca20.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_ca21.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9182/g_3d5a9839.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9183</id>
    <date>2026-02-11</date>
    <ref>MVS10-412</ref>
    <price>279900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>Los Alcazares</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.748184</latitude>
      <longitude>-0.848066</longitude>
    </location>
    <surface_area>
      <built>65</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9183.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9183.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9183.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>The apartments are located in Los Alcázares, a short walk from the beach and right next to La Serena Golf, a beautiful 18-hole course renowned for its wide fairways and views of the Mar Menor. Murcia International Airport is approximately a 25-30 minute drive away, while Alicante Airport can be reached in approximately 55-60 minutes.</p><p>Cartagena is approximately 24 km away—ideal for a cultural or culinary outing. And for a day of shopping or urban amenities, the city of Murcia is about 50 km away.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>De appartementen liggen in Los Alcázares, op korte wandelafstand van het strand én direct bij La Serena Golf, een mooie 18-holes golfbaan die bekendstaat om haar brede fairways en uitzicht op de Mar Menor. Murcia International Airport ligt op ongeveer 25–30 minuten rijden, terwijl Alicante Airport in circa 55–60 minuten bereikbaar is.</p><p>Cartagena ligt op zo’n 24 km afstand — ideaal voor een cultureel of culinair uitstapje. En voor een dag winkelen of stedelijke voorzieningen ben je binnen ongeveer 50 km in de stad Murcia.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Les appartements se situent à Los Alcázares, à quelques pas de la plage et juste à côté du golf de La Serena, un magnifique parcours 18 trous réputé pour ses larges fairways et ses vues imprenables sur la Mar Menor. L'aéroport international de Murcie est à environ 25-30 minutes en voiture, tandis que l'aéroport d'Alicante est accessible en 55-60 minutes environ.</p><p>Carthagène se trouve à environ 24 km, idéal pour une escapade culturelle ou gastronomique. Enfin, pour une journée shopping ou profiter des commodités urbaines, la ville de Murcie est à environ 50 km.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[hob and extractor hood]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:-0001]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_dron01.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_t73a0486.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_t73a0496.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_t73a0492.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca11.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca02.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca05.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca16.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca30.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca38.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca31.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca27.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9183/g_ca28.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9184</id>
    <date>2026-02-11</date>
    <ref>MVS10-411</ref>
    <price>339900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartments - solarium</type>
    <town>Los Alcazares</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.748184</latitude>
      <longitude>-0.848066</longitude>
    </location>
    <surface_area>
      <built>65</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9184.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9184.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9184.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartments - solarium provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>The apartments are located in Los Alcázares, a short walk from the beach and right next to La Serena Golf, a beautiful 18-hole course renowned for its wide fairways and views of the Mar Menor. Murcia International Airport is approximately a 25-30 minute drive away, while Alicante Airport can be reached in approximately 55-60 minutes.</p><p>Cartagena is approximately 24 km away—ideal for a cultural or culinary outing. And for a day of shopping or urban amenities, the city of Murcia is about 50 km away.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met dakterras voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>De appartementen liggen in Los Alcázares, op korte wandelafstand van het strand én direct bij La Serena Golf, een mooie 18-holes golfbaan die bekendstaat om haar brede fairways en uitzicht op de Mar Menor. Murcia International Airport ligt op ongeveer 25–30 minuten rijden, terwijl Alicante Airport in circa 55–60 minuten bereikbaar is.</p><p>Cartagena ligt op zo’n 24 km afstand — ideaal voor een cultureel of culinair uitstapje. En voor een dag winkelen of stedelijke voorzieningen ben je binnen ongeveer 50 km in de stad Murcia.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartements - terrasse sur le toit livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Les appartements se situent à Los Alcázares, à quelques pas de la plage et juste à côté du golf de La Serena, un magnifique parcours 18 trous réputé pour ses larges fairways et ses vues imprenables sur la Mar Menor. L'aéroport international de Murcie est à environ 25-30 minutes en voiture, tandis que l'aéroport d'Alicante est accessible en 55-60 minutes environ.</p><p>Carthagène se trouve à environ 24 km, idéal pour une escapade culturelle ou gastronomique. Enfin, pour une journée shopping ou profiter des commodités urbaines, la ville de Murcie est à environ 50 km.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[hob and extractor hood]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:-0001]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca41.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca11.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_dji_0846.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca02.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca05.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca16.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca30.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca27.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca38.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_t73a0486.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca40.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca31.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_ca28.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_dron01.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_t73a0496.jpg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9184/g_t73a0492.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9185</id>
    <date>2026-02-11</date>
    <ref>MVS10-406</ref>
    <price>399900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartments - solarium</type>
    <town>Los Alcazares</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.748184</latitude>
      <longitude>-0.848066</longitude>
    </location>
    <surface_area>
      <built>83</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9185.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9185.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//los-alcazares/-9185.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartments - solarium provided with 3 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>The apartments are located in Los Alcázares, a short walk from the beach and right next to La Serena Golf, a beautiful 18-hole course renowned for its wide fairways and views of the Mar Menor. Murcia International Airport is approximately a 25-30 minute drive away, while Alicante Airport can be reached in approximately 55-60 minutes.</p><p>Cartagena is approximately 24 km away—ideal for a cultural or culinary outing. And for a day of shopping or urban amenities, the city of Murcia is about 50 km away.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met dakterras voorzien van 3 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>De appartementen liggen in Los Alcázares, op korte wandelafstand van het strand én direct bij La Serena Golf, een mooie 18-holes golfbaan die bekendstaat om haar brede fairways en uitzicht op de Mar Menor. Murcia International Airport ligt op ongeveer 25–30 minuten rijden, terwijl Alicante Airport in circa 55–60 minuten bereikbaar is.</p><p>Cartagena ligt op zo’n 24 km afstand — ideaal voor een cultureel of culinair uitstapje. En voor een dag winkelen of stedelijke voorzieningen ben je binnen ongeveer 50 km in de stad Murcia.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartements - terrasse sur le toit livré avec 3 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Les appartements se situent à Los Alcázares, à quelques pas de la plage et juste à côté du golf de La Serena, un magnifique parcours 18 trous réputé pour ses larges fairways et ses vues imprenables sur la Mar Menor. L'aéroport international de Murcie est à environ 25-30 minutes en voiture, tandis que l'aéroport d'Alicante est accessible en 55-60 minutes environ.</p><p>Carthagène se trouve à environ 24 km, idéal pour une escapade culturelle ou gastronomique. Enfin, pour une journée shopping ou profiter des commodités urbaines, la ville de Murcie est à environ 50 km.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[hob and extractor hood]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:-0001]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_t73a0486.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_t73a0492.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca08.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca10.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca06.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca12.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_3d5a9825.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca20.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca21.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_3d5a9839.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca11.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca40.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_ca41.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9185/g_t73a0496.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8003</id>
    <date>2026-01-30</date>
    <ref>MVS12-428</ref>
    <price>297000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Ciudad Quesada</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>38.060243</latitude>
      <longitude>-0.721551</longitude>
    </location>
    <surface_area>
      <built>78</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8003.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8003.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8003.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and parking spot. </p><p>There is a choice between ground floor apartments with terrace and garden or apartments on the first floor with terrace and roof terrace.</p><p> These modern apartments are ideally located just a 15-minute drive from both the centre of Torrevieja and the expansive sandy beaches of Guardamar del Segura.</p><p> Ciudad Quesada offers a wide range of amenities, including supermarkets, restaurants, health centers, and recreational facilities such as golf courses and a water park. Its proximity to Torrevieja provides additional amenities, such as shopping centers, a vibrant promenade, and cultural attractions.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeerplaats. </p><p>Er is keuze tussen gelijkvloers appartementen met terras en tuin of appartementen op het eerste verdiep met terras en dakterras.</p><p>Deze moderne appartementen zijn ideaal gelegen, op slechts 15 minuten rijden van zowel het centrum van Torrevieja als de uitgestrekte zandstranden van Guardamar del Segura. </p><p>Ciudad Quesada biedt een scala aan voorzieningen, waaronder supermarkten, restaurants, gezondheidscentra en recreatiemogelijkheden zoals golfbanen en een waterpark. De nabijheid van Torrevieja zorgt voor extra faciliteiten, zoals winkelcentra, een bruisende boulevard en culturele attracties.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de stationnement. </p><p>Vous avez le choix entre des appartements en rez-de-chaussée avec terrasse et jardin ou des appartements au premier étage avec terrasse et terrasse sur le toit.</p><p> Ces appartements modernes sont idéalement situés à seulement 15 minutes en voiture du centre de Torrevieja et des vastes plages de sable de Guardamar del Segura.</p><p> Ciudad Quesada offre un large éventail de commodités, notamment des supermarchés, des restaurants, des centres de santé et des installations de loisirs comme des terrains de golf et un parc aquatique. Sa proximité avec Torrevieja lui confère des atouts supplémentaires, tels que des centres commerciaux, une promenade animée et des attractions culturelles.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[complete air conditioning installation]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[electric shutters]]>
      </feature>
      <feature>
        <![CDATA[Year construction:2026]]>
      </feature>
      <feature>
        <![CDATA[Special offer]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8003/g_bung02.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8003/g_bung01.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8003/g_fotom01.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8003/g_area-foto.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8003/g_duly-lo-marabu-villas-bungalows-zoom.jpg</url>
      </image>
    </images>
    <postcode>03170</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8787</id>
    <date>2026-01-30</date>
    <ref>MVS10-514</ref>
    <price>303000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Ciudad Quesada</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>38.068926</latitude>
      <longitude>-0.712901</longitude>
    </location>
    <surface_area>
      <built>73</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8787.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8787.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8787.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and parking spot. </p><p>the Lagunas de La Mata y Torrevieja Natural Park. The area offers numerous amenities such as restaurants, shops, and recreational facilities. The place is ideal for both permanent residence and holidays. It has an international community and offers a relaxed lifestyle. The central location allows easy access to nearby towns and attractions.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeerplaats. </p><p>Ciudad Quesada is populair bij zowel toeristen als expats vanwege de nabijheid van stranden, golfbanen, en het natuurpark Lagunas de La Mata y Torrevieja. De omgeving biedt tal van voorzieningen zoals restaurants, winkels, en recreatieve faciliteiten. De plaats is ideaal voor zowel permanente bewoning als vakanties. Het heeft een internationale gemeenschap en biedt een ontspannen levensstijl. De centrale ligging zorgt voor gemakkelijke toegang tot nabijgelegen steden en bezienswaardigheden.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de stationnement. </p><p>Ciudad Quesada est populaire auprès des touristes et des expatriés en raison de sa proximité avec les plages, les terrains de golf et le parc naturel des lagunes de La Mata et Torrevieja. Le quartier offre de nombreuses commodités telles que des restaurants, des magasins et des installations de loisirs. L'endroit est idéal aussi bien pour la résidence permanente que pour les vacances. Elle a une communauté internationale et offre un style de vie détendu. L'emplacement central permet un accès facile aux villes et attractions voisines.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[complete air conditioning installation]]>
      </feature>
      <feature>
        <![CDATA[finished kitchen]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[Year construction:2026]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-6.png</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-4.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-7.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-8.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-11.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-10.png</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-3.png</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-14.png</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-2.png</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-7.png</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-5.png</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-9.png</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-15.png</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-parcela-1.png</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-parcela-3.png</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-13.png</url>
      </image>
      <image id="17">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-11.png</url>
      </image>
      <image id="18">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-lo-marabu-ext-1.png</url>
      </image>
      <image id="19">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-1.jpg</url>
      </image>
      <image id="20">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-10.jpg</url>
      </image>
      <image id="21">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-12.jpg</url>
      </image>
      <image id="22">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-18.jpg</url>
      </image>
      <image id="23">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-13.jpg</url>
      </image>
      <image id="24">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-20.jpg</url>
      </image>
      <image id="25">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-22.jpg</url>
      </image>
      <image id="26">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-14.jpg</url>
      </image>
      <image id="27">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8787/g_areabeach-v-int-2.jpg</url>
      </image>
    </images>
    <postcode>03170</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8879</id>
    <date>2026-01-30</date>
    <ref>MVS14-1046</ref>
    <price>305000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Mar de Cristal</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude></latitude>
      <longitude></longitude>
    </location>
    <surface_area>
      <built>119</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>B</consumption>
      <emissions>B</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//mar-de-cristal/-8879.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//mar-de-cristal/-8879.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//mar-de-cristal/-8879.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and underground parking space with storage room. </p><p>Looking for a modern apartment on the Costa Cálida? This stylish new-build apartment in the exclusive Mar de Cristal development is just what you're looking for. Situated in a prime location within walking distance of the beach, this property combines comfort, modern architecture, and tranquility – perfect as a second home or investment.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en ondergrondse parkeerplaats met berging. </p><p>Ben je op zoek naar een modern appartement aan de Costa Cálida? Dit stijlvolle nieuwbouwappartement in het exclusieve project in Mar de Cristal is precies wat je zoekt. Gelegen op een toplocatie op wandelafstand van het strand, combineert deze woning comfort, moderne architectuur en rust – perfect als tweede verblijf of investering.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking souterrain et débarras. </p><p>Vous recherchez un appartement moderne sur la Costa Cálida ? Ce superbe appartement neuf, situé dans la résidence de standing Mar de Cristal, est fait pour vous. Idéalement situé à deux pas de la plage, il allie confort, architecture moderne et tranquillité – parfait comme résidence secondaire ou investissement.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[pre-air conditioning]]>
      </feature>
      <feature>
        <![CDATA[finished kitchen]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[Year construction:2027]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-2.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-4.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-6.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-7.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-1.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-9.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-14.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-5.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-13.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-16.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-12.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-17.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-15.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-8.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-18.jpg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-10.jpg</url>
      </image>
      <image id="17">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8879/g_23-3.jpg</url>
      </image>
    </images>
    <postcode>30384</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8656</id>
    <date>2026-01-30</date>
    <ref>MVS10-1100</ref>
    <price>309000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Ciudad Quesada</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>38.068926</latitude>
      <longitude>-0.712901</longitude>
    </location>
    <surface_area>
      <built>86</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8656.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8656.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//ciudad-quesada/-8656.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 3 Bedrooms and 2 Bathrooms, communal swimming pool and parking spot. </p><p>the Lagunas de La Mata y Torrevieja Natural Park. The area offers numerous amenities such as restaurants, shops, and recreational facilities. The place is ideal for both permanent residence and holidays. It has an international community and offers a relaxed lifestyle. The central location allows easy access to nearby towns and attractions.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 3 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeerplaats. </p><p>Ciudad Quesada is populair bij zowel toeristen als expats vanwege de nabijheid van stranden, golfbanen, en het natuurpark Lagunas de La Mata y Torrevieja. De omgeving biedt tal van voorzieningen zoals restaurants, winkels, en recreatieve faciliteiten. De plaats is ideaal voor zowel permanente bewoning als vakanties. Het heeft een internationale gemeenschap en biedt een ontspannen levensstijl. De centrale ligging zorgt voor gemakkelijke toegang tot nabijgelegen steden en bezienswaardigheden.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 3 Chambres et 2 Salles de bains, commun piscine et place de stationnement. </p><p>Ciudad Quesada est populaire auprès des touristes et des expatriés en raison de sa proximité avec les plages, les terrains de golf et le parc naturel des lagunes de La Mata et Torrevieja. Le quartier offre de nombreuses commodités telles que des restaurants, des magasins et des installations de loisirs. L'endroit est idéal aussi bien pour la résidence permanente que pour les vacances. Elle a une communauté internationale et offre un style de vie détendu. L'emplacement central permet un accès facile aux villes et attractions voisines.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[complete air conditioning installation]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
      <feature>
        <![CDATA[Year construction:2026]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-15.png</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-8.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-7.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-10.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-6.png</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-14.png</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-3.png</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-2.png</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-7.png</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-11.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-1.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-2.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-4.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-18.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-13.jpg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-5.png</url>
      </image>
      <image id="17">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_abv-collage-2.png</url>
      </image>
      <image id="18">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-10.png</url>
      </image>
      <image id="19">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-9.png</url>
      </image>
      <image id="20">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-parcela-1.png</url>
      </image>
      <image id="21">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-parcela-3.png</url>
      </image>
      <image id="22">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-13.png</url>
      </image>
      <image id="23">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-11.png</url>
      </image>
      <image id="24">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-lo-marabu-ext-1.png</url>
      </image>
      <image id="25">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-12.jpg</url>
      </image>
      <image id="26">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-20.jpg</url>
      </image>
      <image id="27">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8656/g_areabeach-v-int-14.jpg</url>
      </image>
    </images>
    <postcode>03170</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8839</id>
    <date>2025-11-24</date>
    <ref>MVS10-548</ref>
    <price>389000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Terraced villa</type>
    <town>Dolores</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>38.138686</latitude>
      <longitude>-0.769807</longitude>
    </location>
    <surface_area>
      <built>124</built>
      <plot>174</plot>
    </surface_area>
    <energy_rating>
      <consumption>A</consumption>
      <emissions>A</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//dolores/-8839.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//dolores/-8839.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//dolores/-8839.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Terraced villa provided with 3 Bedrooms and 2 Bathrooms, private swimming pool and parking space on own plot. </p><p>New complex of innovative semi-detached houses located in Dolores, a typical Spanish village south of Alicante. The properties feature a fully fitted modern kitchen and spacious open plan lounge/dining room leading out to a private swimming pool to enjoy the Mediterranean climate all year round.</p><p>The excellent access to the AP-7 means it is well connected to the rest of the Costa Blanca, with Dolores being just 15 minutes from the towns of Elche and Torrevieja, 30 minutes from Alicante city and just 25 minutes from Alicante airport.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Geschakelde woningen voorzien van 3 Slaapkamers en 2 Badkamers, privaat zwembad en parkeergelegenheid op eigen perceel. </p><p>Nieuw complex van innovatieve halfvrijstaande woningen gelegen in Dolores, een typisch Spaans dorp ten zuiden van Alicante. De woningen beschikken over een volledig ingerichte moderne keuken en ruime open lounge/eetkamer die uitkomt op een privé zwembad om het hele jaar door te genieten van het mediterrane klimaat.</p><p>De uitstekende toegang tot de AP-7 zorgt voor goede verbindingen met de rest van de Costa Blanca, met Dolores op slechts 15 minuten van de steden Elche en Torrevieja, 30 minuten van de stad Alicante en op slechts 25 minuten van de luchthaven van Alicante.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Maisonettes livré avec 3 Chambres et 2 Salles de bains, privé piscine et place de parking sur son propre terrain. </p><p>Nouveau complexe de maisons jumelées innovantes situé à Dolores, un village espagnol typique au sud d'Alicante. Les propriétés disposent d'une cuisine moderne entièrement équipée et d'un spacieux salon/salle à manger décloisonné menant à une piscine privée pour profiter du climat méditerranéen toute l'année.</p><p>L'excellent accès à l'AP-7 signifie qu'il est bien relié au reste de la Costa Blanca, Dolores étant à seulement 15 minutes des villes d'Elche et de Torrevieja, à 30 minutes de la ville d'Alicante et à seulement 25 minutes de l'aéroport d'Alicante.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[complete air conditioning installation]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[electric shutters in bedrooms]]>
      </feature>
      <feature>
        <![CDATA[underfloor heating bathrooms]]>
      </feature>
      <feature>
        <![CDATA[electric gate]]>
      </feature>
      <feature>
        <![CDATA[solar energy]]>
      </feature>
      <feature>
        <![CDATA[a basement]]>
      </feature>
      <feature>
        <![CDATA[Private swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-01-paris-viii-exterior-1.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-7-paris-vii-terraza-pb-4.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-14-paris-viii-kitchen-2.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-18-paris-vii-salon-4.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-21-paris-vii-salon-comedor.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-31-paris-vii-aseo-invitado.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-33-paris-vii-habitacion-1-pb-2.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-34-paris-vii-vestidor-pb-1.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-35-paris-vii-bano-pb-3.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-39-paris-vii-habitacion-pb-1.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-40-paris-vii-vestidor-pp-1.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-42-paris-vii-bano-2-pp.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-36-paris-vii-bano-pb-2.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8839/g_-29-paris-viii-shared-bathroom-of-first-floor-bedroom-2-and-3-view-1.jpg</url>
      </image>
    </images>
    <postcode>03150</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>9052</id>
    <date>2025-11-07</date>
    <ref>MVS10-1304</ref>
    <price>309900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>Santa Rosalía Resort</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.750587</latitude>
      <longitude>-0.898209</longitude>
    </location>
    <surface_area>
      <built>96</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//santa-rosalia-resort/-9052.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//santa-rosalia-resort/-9052.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//santa-rosalia-resort/-9052.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 2 Bedrooms and 2 Bathrooms, heated swimming pool and parking space with underground storage. </p><p>The complex features heated swimming pools, landscaped gardens, playgrounds, and recreation areas, creating a comfortable and family-friendly living environment.</p><p>The resort itself is built around a large artificial lake with white sandy beaches, sports facilities, and a clubhouse with restaurants and recreation, all within a secure gated community with 24/7 security.</p><p>The location is ideal: 4 km from the beaches of Los Alcázares, 25 minutes from Murcia Airport, and close to shopping centers such as Dos Mares and Zenia Boulevard.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 2 Slaapkamers en 2 Badkamers, verwarmd zwembad en parkeerplaats met ondergrondse berging. </p><p>Het complex beschikt over verwarmde zwembaden, aangelegde tuinen, speeltuinen en recreatieruimtes, wat zorgt voor een comfortabele en gezinsvriendelijke leefomgeving.</p><p>Het resort zelf is gebouwd rond een groot kunstmatig meer met witte zandstranden, sportfaciliteiten en een clubhuis met horeca en recreatie, binnen een veilige afgesloten community met 24/7 bewaking.</p><p>De ligging is ideaal: op 4 km van de stranden van Los Alcázares, 25 minuten van de luchthaven van Murcia en dicht bij winkelcentra zoals Dos Mares en Zenia Boulevard.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 2 Chambres et 2 Salles de bains, chauffée piscine et place de parking avec rangement souterrain. </p><p>Le complexe dispose de piscines chauffées, de jardins paysagers, d'aires de jeux et d'espaces de loisirs, créant un cadre de vie confortable et familial.</p><p>Le complexe est construit autour d'un grand lac artificiel avec des plages de sable blanc, des installations sportives et un club-house avec restaurants et espaces de loisirs, le tout au sein d'une résidence sécurisée avec sécurité 24h/24 et 7j/7.</p><p>L'emplacement est idéal : à 4 km des plages de Los Alcázares, à 25 minutes de l'aéroport de Murcie et à proximité de centres commerciaux tels que Dos Mares et Zenia Boulevard.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[electric shutters]]>
      </feature>
      <feature>
        <![CDATA[built-in wardrobes]]>
      </feature>
      <feature>
        <![CDATA[aerothermal heat pump]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_piscina-picada.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_apartamentos.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_salon.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_cocina.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_dormitorio-2.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_bano-dormitorio-principal.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_dormitorio-principal.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_dormitorio-3.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_bano-1.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/9052/g_picada-pb.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>7131</id>
    <date>2025-09-27</date>
    <ref>MVS10-191</ref>
    <price>293900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>Santa Rosalía Resort</town>
    <province>Murcia</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude></latitude>
      <longitude></longitude>
    </location>
    <surface_area>
      <built>88</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//santa-rosalia-resort/-7131.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//santa-rosalia-resort/-7131.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//santa-rosalia-resort/-7131.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and underground parking space with storage room. </p><p>Welcome to this beautiful project at the Santa Rosalia Lake & Life Resort, these exclusive apartments are being built close to the lake, with breathtaking views over the crystal clear lagoon.</p><p>The project is being built in several phases. Phase 1 consists of 6 blocks with 42 apartments and phase 2 of 12 blocks with 77 apartments. Enjoy communal natural gardens and swimming pools at every phase, along with the convenience of lift access in all buildings. With a choice of ground floors with garden, mezzanine floors with terrace or penthouse with roof terrace, there is something for everyone.</p><p>The Santa Rosalía Lake & Life Resort, located on the Costa Cálida in Spain, is an exclusive and award-winning resort that combines luxury and nature. The highlight of the resort is the beautifully landscaped lagoon, an oasis of tranquility where guests can swim, kayak and relax in this idyllic location with white sandy beaches, palm trees and beach bars. In addition to the lake, the resort offers extensive green areas, perfect for walks and bike rides. Guests can enjoy a range of amenities and sports facilities, including a gym, spa, gourmet restaurants, golf courses, barbecue areas and various sports fields.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en ondergrondse parkeerplaats met berging. </p><p>Welkom bij dit prachtige project op het Santa Rosalia Lake & Life Resort, deze exclusieve appartementen worden gebouwd vlakbij het meer, met een adembenemend uitzicht over de kristalheldere lagune.</p><p>Het project wordt gebouwd in verschillende fases. Fase 1 bestaat uit 6 blokken met 42 appartementen en fase 2 uit 12 blokken met 77 appartementen. Geniet van gemeenschappelijke natuurlijke tuinen en zwembaden in elke fase, samen met het gemak van een lift in alle gebouwen. Met keuze uit gelijkvloers met tuin, tussenverdiepingen met terras of penthouse met dakterras, is er voor elk wat wils.</p><p>Het Santa Rosalía Lake & Life Resort, gelegen aan de Costa Cálida in Spanje, is een exclusief en award-winning resort dat luxe en natuur combineert. Het hoogtepunt van het resort is de prachtig aangelegde lagune, een oase van rust waar gasten kunnen zwemmen, kajakken en ontspannen op deze idyllische locatie met witte zandstranden, palmbomen en strandbars. Naast het meer biedt het resort uitgestrekte groene gebieden, perfect voor wandelingen en fietstochten. Gasten kunnen genieten van een scala aan voorzieningen en sportfaciliteiten, waaronder een fitnessruimte, een spa, gastronomische restaurants, golfbanen, barbecue zones en verschillende sportvelden.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking souterrain et débarras. </p><p>Bienvenue dans ce magnifique projet du Santa Rosalia Lake & Life Resort, ces appartements exclusifs sont construits à proximité du lac, avec une vue imprenable sur le lagon cristallin.</p><p>Le projet se construit en plusieurs phases. La phase 1 se compose de 6 blocs de 42 appartements et la phase 2 de 12 blocs de 77 appartements. Profitez de jardins naturels communaux et de piscines à chaque phase, ainsi que de la commodité d'un accès par ascenseur dans tous les bâtiments. Avec un choix de rez-de-chaussée avec jardin, de mezzanines avec terrasse ou de penthouse avec toit-terrasse, il y en a pour tous les goûts.</p><p>Le Santa Rosalía Lake & Life Resort, situé sur la Costa Cálida en Espagne, est un complexe exclusif et primé qui allie luxe et nature. Le point culminant du complexe est le lagon magnifiquement aménagé, une oasis de tranquillité où les clients peuvent nager, faire du kayak et se détendre dans cet endroit idyllique avec des plages de sable blanc, des palmiers et des bars de plage. En plus du lac, la station offre de vastes espaces verts, parfaits pour les promenades à pied et à vélo. Les clients peuvent profiter d'une gamme d'équipements et d'installations sportives, notamment une salle de sport, un spa, des restaurants gastronomiques, des terrains de golf, des espaces barbecue et divers terrains de sport.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[pre-air conditioning]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_santa-rosalia-lagoon-2.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_7ye7hxszd0ys57ryisoh.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_ry500davkw7f8hnu86x8.jpeg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_bzjaap825-35593-1300-v0-584a.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_vo70nrsuknoo4pc5fgoc.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_5he3ys8whq6mswmvmf64.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_ku2cg7ahp678ijg2rwpm.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_4ha0xop0cf03xrnd5m7x.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_snr3v8httn2jvoq0ke6j.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_hmd5w2sab4gow8d875it.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_4kv76x478ufy5szbwubg.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_du5e27wje484hz2f2wwj.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_wea6283zt8z5joyo6qwc.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_r6mydi5hst8sejyj8jbb.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_sa60syn3b4n403fxvyj6.jpeg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_efwj33hwxwgv2aie5nuu.jpg</url>
      </image>
      <image id="17">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_4ze66jnva6q6e5zgz3eo.jpg</url>
      </image>
      <image id="18">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_zoh5un7i4d0kp3bjis7x.jpeg</url>
      </image>
      <image id="19">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_akjrh26358pitgauzcht.jpeg</url>
      </image>
      <image id="20">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_w3fkhx86ra7jmu6pwr8r.jpeg</url>
      </image>
      <image id="21">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7131/g_resale-villa-torre-pacheco-santa-rosalia-lake-and-life-resort-328730-xl.jpg</url>
      </image>
    </images>
    <postcode>30710</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>7941</id>
    <date>2025-06-13</date>
    <ref>MVS13-1004</ref>
    <price>268000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>La Finca Golf</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude></latitude>
      <longitude></longitude>
    </location>
    <surface_area>
      <built>67</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//la-finca-golf/-7941.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//la-finca-golf/-7941.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//la-finca-golf/-7941.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and parking spot. </p><p>A new project of 40 apartments by a popular developer on the stunning La Finca golf resort. The homes vary in size and layout, each with two bedrooms and two bathrooms. Most apartments have spacious terraces and views of the golf course or the surrounding countryside. They also feature high-quality finishes and modern amenities.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeerplaats. </p><p> Nieuw project van 40 appartementen door populaire projectontwikkelaar op het prachtig mooie La Finca golf resort. De woningen variëren in grootte en indeling telkens met twee slaapkamers en 2 badkamers. De meeste appartementen hebben ruime terrassen en bieden uitzicht op de golfbaan of de omliggende natuur. Daarnaast beschikken ze over hoogwaardige afwerkingen en moderne voorzieningen.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de stationnement. </p><p>Un nouveau projet de 40 appartements, signé par un promoteur de renom, est situé au cœur du magnifique golf de La Finca. Les logements, de tailles et d'agencements variés, comprennent chacun deux chambres et deux salles de bains. La plupart bénéficient de vastes terrasses offrant une vue imprenable sur le golf ou la campagne environnante. Ils se distinguent également par des finitions haut de gamme et des équipements modernes.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[complete air conditioning installation]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[all furniture]]>
      </feature>
      <feature>
        <![CDATA[Close to golf]]>
      </feature>
      <feature>
        <![CDATA[Special offer]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-15.jpg</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-3.jpg</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-10.jpg</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-12.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-6.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-4.jpg</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-5.jpg</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-9.jpg</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-1.jpg</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-7.jpg</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-8.jpg</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-11.jpg</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-2.jpg</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-16.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-18.jpg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca.jpg</url>
      </image>
      <image id="17">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-17.jpg</url>
      </image>
      <image id="18">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-13.jpg</url>
      </image>
      <image id="19">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7941/g_render-oasis-golf-la-finca-14.jpg</url>
      </image>
    </images>
    <postcode>03169</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>8178</id>
    <date>2025-06-05</date>
    <ref>MVS10-689</ref>
    <price>266000</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with terrace</type>
    <town>San Miguel de Salinas</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>2</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude>37.978439</latitude>
      <longitude>-0.788924</longitude>
    </location>
    <surface_area>
      <built>73</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//san-miguel-de-salinas/-8178.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//san-miguel-de-salinas/-8178.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//san-miguel-de-salinas/-8178.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with terrace provided with 2 Bedrooms and 2 Bathrooms, communal swimming pool and underground parking space with storage room. </p><p>New development of 222 apartments, designed for comfort and luxury.</p><p>Situated in a quiet, green area, it offers beautiful views of the salt lakes. Just a 10-minute drive away are the beaches of Orihuela Costa and prestigious golf courses such as Las Colinas and Villamartín. With all amenities within easy reach, including shops, restaurants and the popular La Zenia Boulevard, you will enjoy the perfect combination of nature, relaxation and convenience.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met terras voorzien van 2 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en ondergrondse parkeerplaats met berging. </p><p>Nieuwbouwproject van 222 appartementen, ontworpen voor comfort en luxe.</p><p>Gelegen in een rustige, groene omgeving biedt het een prachtig uitzicht op de zoutmeren. Op slechts 10 minuten rijden bevinden zich de stranden van Orihuela Costa en prestigieuze golfbanen zoals Las Colinas en Villamartín. Met alle voorzieningen binnen handbereik, waaronder winkels, restaurants en het populaire La Zenia Boulevard, geniet u hier van de perfecte combinatie van natuur, ontspanning en gemak.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - terrasse livré avec 2 Chambres et 2 Salles de bains, commun piscine et place de parking souterrain et débarras. </p><p>Nouveau projet de construction de 222 appartements, conçus pour le confort et le luxe.</p><p>Située dans un quartier calme et verdoyant, elle offre de belles vues sur les lacs salés. À seulement 10 minutes en voiture se trouvent les plages d'Orihuela Costa et les prestigieux terrains de golf tels que Las Colinas et Villamartín. Avec toutes les commodités à proximité, y compris les magasins, les restaurants et le célèbre boulevard La Zenia, vous pourrez profiter de la combinaison parfaite entre nature, détente et commodité.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[complete air conditioning installation]]>
      </feature>
      <feature>
        <![CDATA[all kitchen appliances]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[Special offer]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8178/g_sol-de-salinas-1.png</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8178/g_sol-de-salinas-4.png</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8178/g_sol-de-salinas-6.png</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8178/g_sol-de-salinas-3.png</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8178/g_sol-de-salinas-5.png</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/8178/g_sol-de-salinas-2.png</url>
      </image>
    </images>
    <postcode>03193</postcode>
    <country>Spain</country>
  </property>
  <property>
    <id>7949</id>
    <date>2025-03-25</date>
    <ref>MVS10-963</ref>
    <price>259900</price>
    <price_freq>sale</price_freq>
    <currency>EUR</currency>
    <part_ownership>0</part_ownership>
    <leasehold>0</leasehold>
    <new_build>1</new_build>
    <type>Apartment with garden</type>
    <town>Dolores</town>
    <province>Alicante</province>
    <notes>0</notes>
    <beds>3</beds>
    <baths>2</baths>
    <pool>1</pool>
    <location>
      <latitude></latitude>
      <longitude></longitude>
    </location>
    <surface_area>
      <built>76</built>
      <plot>0</plot>
    </surface_area>
    <energy_rating>
      <consumption>X</consumption>
      <emissions>X</emissions>
    </energy_rating>
    <url>
      <en>https://www.medvillaspain.co.uk/en/spanish-properties//dolores/-7949.html</en>
      <nl>https://www.medvillaspain.co.uk/en/spanish-properties//dolores/-7949.html</nl>
      <fr>https://www.medvillaspain.co.uk/en/spanish-properties//dolores/-7949.html</fr>
    </url>
    <desc>
      <en>
        <![CDATA[<p>Apartment with garden provided with 3 Bedrooms and 2 Bathrooms, communal swimming pool and parking space on own plot. </p><p>Ibiza style apartments spread over 2 blocks. The communal areas are eco-friendly and low maintenance, with a Mediterranean swimming pool for relaxing. Located in Dolores, it offers a peaceful, traditional atmosphere and a welcoming community. Just 15 minutes from the beaches of Guardamar and 30-35 minutes from Alicante-Elche Airport, the project combines rural tranquility with excellent access to the coast and urban amenities.</p>
]]>
      </en>
      <nl>
        <![CDATA[<p>Appartement met tuin voorzien van 3 Slaapkamers en 2 Badkamers, gemeenschappelijk zwembad en parkeergelegenheid op eigen perceel. </p><p>Ibiza stijl appartementen verdeeld over 2 blokken. De gemeenschappelijke ruimtes zijn milieuvriendelijk en onderhoudsarm, met een mediterraan zwembad om te ontspannen. Gelegen in Dolores, biedt het een rustige, traditionele sfeer en een gastvrije gemeenschap. Op slechts 15 minuten van de stranden van Guardamar en 30-35 minuten van Alicante-Elche Airport, combineert het project landelijke rust met uitstekende toegang tot de kust en stedelijke voorzieningen.</p>
]]>
      </nl>
      <fr>
        <![CDATA[<p>Appartement - jardin livré avec 3 Chambres et 2 Salles de bains, commun piscine et place de parking sur son propre terrain. </p><p>Appartements de style Ibiza répartis sur 2 blocs. Les espaces communs sont respectueux de l'environnement et nécessitent peu d'entretien, avec une piscine méditerranéenne pour se détendre. Situé à Dolores, il offre une atmosphère paisible et traditionnelle et une communauté accueillante. À seulement 15 minutes des plages de Guardamar et à 30-35 minutes de l'aéroport d'Alicante-Elche, le projet allie tranquillité rurale avec un excellent accès à la côte et aux commodités urbaines.</p>
]]>
      </fr>
    </desc>
    <features>
      <feature>
        <![CDATA[pre-air conditioning]]>
      </feature>
      <feature>
        <![CDATA[finished bathroom(s)]]>
      </feature>
      <feature>
        <![CDATA[electric shutters in bedrooms]]>
      </feature>
      <feature>
        <![CDATA[Communal swimming pool]]>
      </feature>
    </features>
    <images>
      <image id="1">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-1.png</url>
      </image>
      <image id="2">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-5.png</url>
      </image>
      <image id="3">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-2.png</url>
      </image>
      <image id="4">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-9.jpg</url>
      </image>
      <image id="5">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-6.jpg</url>
      </image>
      <image id="6">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-7.png</url>
      </image>
      <image id="7">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-12.png</url>
      </image>
      <image id="8">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-3.png</url>
      </image>
      <image id="9">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-9.png</url>
      </image>
      <image id="10">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-8.png</url>
      </image>
      <image id="11">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-6.png</url>
      </image>
      <image id="12">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-4.png</url>
      </image>
      <image id="13">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-10.png</url>
      </image>
      <image id="14">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-7.jpg</url>
      </image>
      <image id="15">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-5.jpg</url>
      </image>
      <image id="16">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-8.jpg</url>
      </image>
      <image id="17">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-3.jpg</url>
      </image>
      <image id="18">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-1.jpg</url>
      </image>
      <image id="19">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-4.jpg</url>
      </image>
      <image id="20">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-2.jpg</url>
      </image>
      <image id="21">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_referencia-mykonos-villas-10.jpg</url>
      </image>
      <image id="22">
        <url>https://www.medvillaspanje.com/_site/images/viviendas/7949/g_mykonos-apts-11.png</url>
      </image>
    </images>
    <postcode>03150</postcode>
    <country>Spain</country>
  </property>
</root>`;
      // const extracted = extractKyeroProperties(await blob.text());
      const extracted = extractKyeroProperties(dev);
      return extracted;
    },
  });

  return data ? (
    <FlexContainer className="flex-row flex-wrap justify-center" padding="none">
      {data.map((property) => (
        <Card className="w-full min-w-sm max-w-lg" key={property.id}>
          <CardHeader>
            <TypographyLarge className="inline-flex">
              <HouseIcon /> {property.ref}
            </TypographyLarge>
          </CardHeader>
          <CardContent>
            <TypographyLarge>
              {Number(property.price).toLocaleString()}&nbsp;{property.currency}
            </TypographyLarge>
            <div className="grid grid-cols-3 gap-4">
              {property.images?.slice(0, 6).map((img) => (
                <img
                  alt={`Element ${img.id}`}
                  className="aspect-square w-full min-w-28 max-w-64"
                  key={img.id}
                  src={img.url}
                />
              ))}
            </div>
            <span>{property.province}</span>
          </CardContent>
        </Card>
      ))}
    </FlexContainer>
  ) : (
    <Empty className="mx-auto w-fit">
      <EmptyContent>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileXCorner />
          </EmptyMedia>
          <EmptyTitle>No data in that URL!</EmptyTitle>
        </EmptyHeader>
      </EmptyContent>
    </Empty>
  );
}
