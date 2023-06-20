import React from "react";
import {
  Flex,
  Text,
  Link,
  ChevronRightIcon,
  VStack,
  HStack,
  useImage,
} from "../../user-interfaces";

type HealthToolsBubbleProps = {
  id: number;
  iconSrc: string;
  iconUrl: string;
  title: string;
};

export type RecommendedHealthToolsBubbleMobileProps = {
  recommendHealthTools: HealthToolsBubbleProps[];
};

export function RecommendedHealthToolsBubbleMobile(
  props: RecommendedHealthToolsBubbleMobileProps
) {
  const { recommendHealthTools } = props;

  return (
    <>
      <Text fontSize="sm" fontFamily="poppins" fontWeight="semibold">
        Tes Kesehatan
      </Text>
      <VStack spacing={2} mt={2} align="flex-start">
        {recommendHealthTools.map((item) => (
          <HealthToolsBubble key={item.id} {...item} />
        ))}
      </VStack>
    </>
  );
}

function HealthToolsBubble(props: HealthToolsBubbleProps) {
  const Image = useImage();
  const { iconSrc, iconUrl, title } = props;
  return (
    <Link href={iconUrl} variant="fit" minW="260px" width="full" p={0}>
      <Flex
        justify="space-between"
        align="center"
        width="full"
        boxShadow="base"
        borderRadius="lg"
        p={3}
      >
        <HStack spacing={2.5}>
          <Image
            src={iconSrc}
            alt={title}
            layout="fill"
            objectFit="contain"
            wrapperProps={{
              width: "24px",
              height: "24px",
              borderRadius: "full",
              overflow: "hidden",
            }}
          />
          <Text color="charcoalGrey" fontWeight="semibold" fontSize="sm">
            {title}
          </Text>
        </HStack>
        <ChevronRightIcon color="charcoalGrey" boxSize={5} ml={2} />
      </Flex>
    </Link>
  );
}
