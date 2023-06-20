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

export type ArticleOtherCategoriesDesktopProps = {
  isOpen: boolean;
  onCloseOtherCategories: () => void;
  categories: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string[];
  }[];
};
export function ArticleOtherCategoriesDesktop(
  props: ArticleOtherCategoriesDesktopProps
) {
  const { isOpen, onCloseOtherCategories, categories } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Modal isOpen={isOpen} onClose={onCloseOtherCategories} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">Kategori Artikel</ModalHeader>
        <ModalCloseButton border="none" color="main.500" size="md" />
        <ModalBody p="5" as="form">
          <Grid templateColumns="repeat(4, 1fr)" gap={1}>
            <GridItem height="50px">
              <Navigate key="all" name="ARTICLE" options={{ shallow: true }}>
                <Link
                  color="charcoalGrey"
                  alignSelf="center"
                  onClick={onCloseOtherCategories}
                  _hover={{ border: "none" }}
                >
                  <Image
                    width={32}
                    height={32}
                    layout="fixed"
                    src="https://static.sehatq.com/web/assets/img/icon/more-grey.png?v=6"
                    alt="semua-icon"
                  />
                  <Text marginLeft="2" pb="2" fontSize="sm">
                    SEMUA
                  </Text>
                </Link>
              </Navigate>
            </GridItem>
            {categories.length > 0 &&
              categories.map(
                (category: {
                  id: number;
                  name: string;
                  slug: string;
                  imageUrl: string[];
                }) => (
                  <GridItem key={category.id} height="50px">
                    <Navigate
                      name="ARTICLE"
                      query={{
                        slugs: [category.slug],
                      }}
                      options={{ shallow: true }}
                    >
                      <Link
                        color="charcoalGrey"
                        alignSelf="center"
                        onClick={onCloseOtherCategories}
                        _hover={{ border: "none" }}
                      >
                        <Image
                          width={32}
                          height={32}
                          layout="fixed"
                          src={category.imageUrl[0]}
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
