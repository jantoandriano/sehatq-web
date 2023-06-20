import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Grid,
  GridItem,
  Link,
  Text,
} from "../../user-interfaces";
import { useImage } from "../../user-interfaces/utils/image";

export type DiseaseOtherCategoryProps = {
  isOpen: boolean;
  onCloseOther: () => void;
  category: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string[];
  }[];
  currentCategorySlug: string;
};
export function DiseaseOtherCategoryDesktop(props: DiseaseOtherCategoryProps) {
  const { isOpen, onCloseOther, category, currentCategorySlug } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Modal isOpen={isOpen} onClose={onCloseOther} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">Kategori Penyakit</ModalHeader>
        <ModalCloseButton border="none" color="main.500" size="md" />
        <ModalBody p="5" as="form">
          <Grid templateColumns="repeat(4, 1fr)" gap={1}>
            {category.length > 0 &&
              category.map(
                (category: {
                  id: number;
                  name: string;
                  slug: string;
                  imageUrl: string[];
                }) => (
                  <GridItem key={category.id} height="50px">
                    <Navigate
                      name="DISEASE"
                      query={{
                        slugs: [category.slug],
                      }}
                      options={{ shallow: true }}
                    >
                      <Link
                        color="charcoalGrey"
                        alignSelf="center"
                        onClick={onCloseOther}
                        _hover={{ border: "none" }}
                      >
                        <Image
                          width={32}
                          height={32}
                          layout="fixed"
                          src={
                            category.slug === currentCategorySlug
                              ? category.imageUrl[1]
                              : category.imageUrl[0]
                          }
                          alt={`${category.name}-icon`}
                        />
                        <Text marginLeft="2" pb="2" fontSize="sm">
                          {category.name.toUpperCase()}
                        </Text>
                      </Link>
                    </Navigate>
                  </GridItem>
                )
              )}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
