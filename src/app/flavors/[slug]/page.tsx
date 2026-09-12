import { notFound } from "next/navigation";
import { AppFrame } from "@/components/AppFrame";
import { MiniMapView } from "@/components/MiniMapView";
import { getFlavor, getFlavorSlugs } from "@/data/loadFlavors";
import { Layout, LayoutContent, VStack, HStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { MetadataList, MetadataListItem } from "@astryxdesign/core/MetadataList";
import { Breadcrumbs, BreadcrumbItem } from "@astryxdesign/core/Breadcrumbs";
import { Link } from "@astryxdesign/core/Link";
import { formatCoordinates, formatDateTime } from "@/lib/format";

export function generateStaticParams() {
  return getFlavorSlugs().map((slug) => ({ slug }));
}

export default async function FlavorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const flavor = getFlavor(slug);

  if (!flavor) notFound();

  return (
    <AppFrame>
      <div className="page-gutter">
      <Layout height="auto" contentWidth={1040} padding={0}>
        <LayoutContent padding={0}>
          <VStack gap={8}>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Flavors</BreadcrumbItem>
              <BreadcrumbItem>{flavor.name}</BreadcrumbItem>
            </Breadcrumbs>
            <Grid gap={8} columns={{ minWidth: 320 }}>
              <Card padding={0} elevation="low">
                <AspectRatio ratio={3 / 4} fit="cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flavor.photo}
                    alt={flavor.name}
                    className="detail-photo"
                  />
                </AspectRatio>
              </Card>
              <VStack gap={4}>
                <Heading level={1}>{flavor.name}</Heading>
                <Text>{flavor.description}</Text>
                {flavor.notes ? (
                  <Text color="secondary">{flavor.notes}</Text>
                ) : null}
                <MetadataList columns="single" title="Find">
                  <MetadataListItem label="Date and time">
                    {formatDateTime(flavor.capturedAt)}
                  </MetadataListItem>
                  <MetadataListItem label="Place">
                    {flavor.foundAt.place}
                  </MetadataListItem>
                  <MetadataListItem label="GPS">
                    <Link
                      href={`https://maps.google.com/?q=${flavor.foundAt.lat},${flavor.foundAt.lng}`}
                      isExternalLink
                    >
                      {formatCoordinates(
                        flavor.foundAt.lat,
                        flavor.foundAt.lng,
                      )}
                    </Link>
                  </MetadataListItem>
                </MetadataList>
                <HStack>
                  <Button
                    label="View on world map"
                    variant="primary"
                    href={`/map?focus=${flavor.slug}`}
                  />
                </HStack>
              </VStack>
            </Grid>
            <VStack gap={3}>
              <Heading level={2}>Found here</Heading>
              <MiniMapView flavor={flavor} />
            </VStack>
          </VStack>
        </LayoutContent>
      </Layout>
      </div>
    </AppFrame>
  );
}
