import React from "react";
import { MENU_COLLECTIONS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Link,
  Flex,
  List,
  ListItem,
  Text,
  ChevronUpIcon,
  ChevronDownIcon,
  Collapse,
} from "../../user-interfaces";

export type ContentFooterDesktopProps = {
  data: { id: number; slug: string; label: string }[];
  onCollapse: () => void;
  isOpen: boolean;
};

export function ContentFooterDesktop(props: ContentFooterDesktopProps) {
  const { data, onCollapse, isOpen } = props;
  const { Navigate } = useNavigation();
  return (
    <Box bg="white" w="100%">
      <Text
        onClick={onCollapse}
        fontWeight="semibold"
        fontSize="md"
        fontFamily="poppins"
        cursor="pointer"
        color="charcoalGrey"
        paddingY={2}
        as="h3"
      >
        Kumpulan Artikel dan Forum
        {isOpen ? (
          <ChevronUpIcon marginLeft={2} w={5} h={5} />
        ) : (
          <ChevronDownIcon marginLeft={2} w={5} h={5} />
        )}
      </Text>

      <Collapse in={isOpen}>
        <Flex flexWrap="wrap">
          {MENU_COLLECTIONS.map((menu) => (
            <List spacing={0.5} key={menu.id} width="33.3%" mb={5}>
              {data.map((date) => (
                <ListItem key={date.id} lineHeight="normal">
                  <Navigate
                    name="COLLECTIONS"
                    query={{
                      slug: `${menu.slug}-${date.slug}`,
                    }}
                  >
                    <Link
                      color="main.500"
                      fontSize="sm"
                      _hover={{
                        textDecoration: "normal",
                        color: "charcoalGrey",
                      }}
                    >
                      {menu.label} {date.label}
                    </Link>
                  </Navigate>
                </ListItem>
              ))}
            </List>
          ))}
        </Flex>
      </Collapse>
    </Box>
  );
}
