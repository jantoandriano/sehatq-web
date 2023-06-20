import React from "react";
import { MENU_COLLECTIONS } from "@sehatq/constants";
import { useNavigation } from "@sehatq/utils";
import {
  Box,
  Link,
  List,
  ListItem,
  Flex,
  Text,
  ChevronUpIcon,
  ChevronDownIcon,
  Collapse,
} from "../../user-interfaces";

export type ContentFooterMobileProps = {
  data: { id: number; slug: string; label: string }[];
  onCollapse: () => void;
  isOpen: boolean;
};
export function ContentFooterMobile(props: ContentFooterMobileProps) {
  const { data, onCollapse, isOpen } = props;
  const { Navigate } = useNavigation();
  return (
    <Box bg="white" w="100%">
      <Flex align="center">
        <Text
          onClick={onCollapse}
          fontWeight="semibold"
          fontSize="sm"
          fontFamily="poppins"
          cursor="pointer"
          color="charcoalGrey"
          paddingY={2}
          flex="1"
          as="h3"
        >
          Kumpulan Artikel dan Forum
        </Text>
        {isOpen ? (
          <ChevronUpIcon marginLeft={2} w={5} h={5} />
        ) : (
          <ChevronDownIcon marginLeft={2} w={5} h={5} />
        )}
      </Flex>

      <Collapse in={isOpen}>
        {MENU_COLLECTIONS.map((menu) => (
          <List spacing={0.5} key={menu.id} mb={4}>
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
      </Collapse>
    </Box>
  );
}
