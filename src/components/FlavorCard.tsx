import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import type { Flavor } from "@/data/types";
import { formatDateTime } from "@/lib/format";

export function FlavorCard({ flavor }: { flavor: Flavor }) {
  return (
    <ClickableCard
      label={flavor.name}
      href={`/flavors/${flavor.slug}`}
      padding={0}
      elevation="low"
    >
      <VStack gap={0}>
        <AspectRatio ratio={3 / 4} fit="cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flavor.photo} alt={flavor.name} className="flavor-photo" />
        </AspectRatio>
        <VStack gap={2} padding={4}>
          <Heading level={3} maxLines={2}>
            {flavor.name}
          </Heading>
          <Text type="supporting" color="secondary" maxLines={2}>
            {flavor.foundAt.place}
          </Text>
          <Text type="supporting" color="secondary">
            {formatDateTime(flavor.capturedAt)}
          </Text>
        </VStack>
      </VStack>
    </ClickableCard>
  );
}
