import { useNavigation } from "@sehatq/utils";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Grid,
  GridItem,
  Link,
  CloseIcon,
  Text,
} from "../../user-interfaces";
import { useImage } from "../../user-interfaces/utils/image";

export type ArticleOtherCategoriesMobileProps = {
  isOpen: boolean;
  onCloseOtherCategories: () => void;
  categories: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string[];
  }[];
};
export function ArticleOtherCategoriesMobile(
  props: ArticleOtherCategoriesMobileProps
) {
  const { isOpen, onCloseOtherCategories, categories } = props;
  const Image = useImage();
  const { Navigate } = useNavigation();
  return (
    <Modal isOpen={isOpen} onClose={onCloseOtherCategories} size="full">
      <ModalOverlay />
      <ModalContent borderRadius="none">
        <ModalHeader fontSize="sm">
          <CloseIcon
            onClick={onCloseOtherCategories}
            color="main.500"
            cursor="pointer"
            marginRight="5"
            boxSize="4"
          />
          Kategori Artikel
        </ModalHeader>
        <ModalBody p="4" as="form">
          <Grid templateColumns="repeat(2, 1fr)" gap={1}>
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
                  <Text marginLeft="2" pb="2" fontSize="xs">
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
                        <Text marginLeft="2" pb="2" fontSize="xs">
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
