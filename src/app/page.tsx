import { AppFrame } from "@/components/AppFrame";
import { FlavorCard } from "@/components/FlavorCard";
import { getFlavors } from "@/data/loadFlavors";
import { Layout, LayoutContent, VStack } from "@astryxdesign/core/Layout";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading, Text } from "@astryxdesign/core/Text";
import { VisuallyHidden } from "@astryxdesign/core/VisuallyHidden";
import { EmptyState } from "@astryxdesign/core/EmptyState";

export default function HomePage() {
  const flavors = getFlavors();

  return (
    <AppFrame>
      <div className="page-gutter">
      <Layout height="auto" contentWidth={1120} padding={0}>
        <LayoutContent padding={0}>
          <VStack gap={8}>
            <VStack gap={3}>
              <VisuallyHidden>
                <Heading level={1}>Monster Tracker</Heading>
              </VisuallyHidden>
              <Text color="secondary">
                Each can is a pin on the map. A card keeps the place, the time,
                and a photo.
              </Text>
              <Text type="supporting" color="secondary">
                {flavors.length} flavors
              </Text>
            </VStack>
            {flavors.length === 0 ? (
              <EmptyState
                title="No flavors yet"
                description="Add a markdown file to content/flavors to create a card."
              />
            ) : (
              <Grid gap={5} columns={{ minWidth: 260 }}>
                {flavors.map((flavor) => (
                  <FlavorCard key={flavor.slug} flavor={flavor} />
                ))}
              </Grid>
            )}
          </VStack>
        </LayoutContent>
      </Layout>
      </div>
    </AppFrame>
  );
}
