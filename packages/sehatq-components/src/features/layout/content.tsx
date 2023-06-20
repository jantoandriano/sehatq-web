import React, { useMemo, useRef } from "react";
import HtmlReactParser, {
  domToReact,
  Text as TextNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { toSlug } from "@sehatq/utils";
import {
  Text,
  Link,
  Box,
  VStack,
  ChevronDownIcon,
  ChevronUpIcon,
  Collapse,
  Flex,
  List,
  ListItem,
  useDisclosure,
  useImage,
  Img,
} from "../../user-interfaces";
import { AdSlot } from "../google-publisher-tag";

function isRealText(data: string) {
  return data.length > 4;
}

export function getFirstTextNode(node: any): TextNode {
  if (!node || (node.type === "text" && isRealText(node.data))) return node;
  return node?.children
    ?.map((child: any) => getFirstTextNode(child))
    .find(Boolean);
}

export function hasOneTagName(node: any, names: string[]): boolean {
  if (!node || names.includes(node.name)) return true;
  const filteredChildren =
    node.children?.filter((child: any) => getFirstTextNode(child)?.data) ?? [];
  return filteredChildren.length > 1
    ? false
    : hasOneTagName(filteredChildren[0], names);
}

export function getTextNode(node: any): string {
  if (!node || (node.type === "text" && isRealText(node.data)))
    return node.data.trim();
  return node?.children?.map((child: any) => getTextNode(child)).join(" ");
}

function renderTextTag(
  domNode: any,
  isMobile: boolean,
  options: HTMLReactParserOptions
) {
  let id;
  const { name, children } = domNode;
  if (name === "h2") {
    const text = getTextNode(domNode);
    id = text ? toSlug(text) : undefined;
  }
  return (
    <Text
      id={id}
      as={name}
      wordBreak="break-word"
      lineHeight={isMobile ? "26px" : "30px"}
      marginTop={name !== "p" ? 6 : 4}
      fontSize={
        name === "h2" ? (isMobile ? "xl" : "2xl") : name === "h3" ? "lg" : "md"
      }
      fontWeight={name === "h2" || name === "h3" ? "semibold" : undefined}
      fontFamily={name === "h2" || name === "h3" ? "poppins" : undefined}
      sx={
        name !== "p"
          ? {
              "& + p": {
                marginTop: 1.5,
              },
            }
          : {}
      }
    >
      {domToReact(children, options)}
    </Text>
  );
}

function renderText(domNode: any, isMobile: boolean) {
  const { data } = domNode;
  return (
    <Text
      wordBreak="break-word"
      lineHeight={isMobile ? "24px" : "30px"}
      marginTop={4}
    >
      {data}
    </Text>
  );
}

function renderLink(
  domNode: any,
  isMobile: boolean,
  options: HTMLReactParserOptions
) {
  const { attribs, children } = domNode;
  return (
    <Link
      href={attribs.href}
      isExternal
      display="inline"
      color="sea.500"
      wordBreak="break-word"
      lineHeight={isMobile ? "24px" : "30px"}
    >
      {domToReact(children, options)}
    </Link>
  );
}

function renderListItem(
  domNode: any,
  isMobile: boolean,
  options: HTMLReactParserOptions
) {
  const { children } = domNode;
  return (
    <Text
      as="li"
      display="list-item"
      wordBreak="break-word"
      lineHeight={isMobile ? "24px" : "30px"}
      marginTop={2}
    >
      {domToReact(children, options)}
    </Text>
  );
}

function renderList(domNode: any, options: HTMLReactParserOptions) {
  const { children, name } = domNode;
  return (
    <Box
      as={name}
      wordBreak="break-word"
      paddingInlineStart="20px"
      marginTop={4}
      sx={
        hasOneTagName(domNode, ["h2", "h3", "h4", "h5", "h6"])
          ? {
              "& + p": {
                marginTop: 1.5,
              },
            }
          : {}
      }
    >
      {domToReact(children, options)}
    </Box>
  );
}

function renderFigure(
  domNode: any,
  isMobile: boolean,
  options: HTMLReactParserOptions
) {
  const { children, name } = domNode;
  return <VStack as={name}>{domToReact(children, options)}</VStack>;
}

function renderFigCaption(domNode: any, options: HTMLReactParserOptions) {
  const { children, name } = domNode;
  return (
    <Text as={name} fontSize="sm" fontStyle="italic" textAlign="center">
      {domToReact(children, options)}
    </Text>
  );
}

function renderImage(domNode: any, isMobile = false, Component: typeof Img) {
  const { attribs } = domNode;
  const { width, height } = attribs;
  const layout =
    !width || !height ? "fill" : isMobile ? "responsive" : "intrinsic";
  if (layout === "fill") {
    return (
      <Component
        src={attribs.src}
        alt={attribs.alt || "no caption"}
        layout={layout}
        objectFit="cover"
        wrapperProps={{
          marginTop: 4,
          borderRadius: "xl",
          overflow: "hidden",
          ...(isMobile
            ? {
                width: "100%",
                paddingBottom: "50%",
              }
            : {
                width: "410px",
                height: "205px",
              }),
        }}
      />
    );
  }
  return (
    <Component
      src={attribs.src}
      alt={attribs.alt || "no caption"}
      layout={layout}
      width={width}
      height={height}
      wrapperProps={{
        marginTop: 4,
        borderRadius: "xl",
        overflow: "hidden",
        width: isMobile ? "100%" : "fit-content",
        marginX: "auto",
      }}
    />
  );
}

function renderAdSlot(domNode: any, Component: typeof AdSlot) {
  const { attribs } = domNode;
  return (
    <Box marginY={5}>
      <Component divId={attribs.id} variant={attribs.variant || "normal"} />
    </Box>
  );
}

type RenderCustomElement = (node: Element) => JSX.Element | undefined;

interface Components {
  AdSlot: typeof AdSlot;
  Image: typeof Img;
}

function parseHtml(
  htmlString: string,
  isMobile = false,
  components?: Components,
  renderCustomElement?: RenderCustomElement
) {
  const options = {
    // eslint-disable-next-line sonarjs/cognitive-complexity
    replace: function htmlReactParserReplacer(domNode: any) {
      const { type, name, parent, data, children, attribs } = domNode;
      const customElement = renderCustomElement && renderCustomElement(domNode);
      if (customElement) return customElement;
      if (
        type === "tag" &&
        ["h2", "h3", "h4", "h5", "h6", "p"].some((tagName) => tagName === name)
      ) {
        return renderTextTag(domNode, isMobile, options);
      }
      if (type === "text" && !parent && isRealText(data)) {
        return renderText(domNode, isMobile);
      }
      if (type === "tag" && name === "a") {
        return renderLink(domNode, isMobile, options);
      }
      if (type === "tag" && name === "figure") {
        return renderFigure(domNode, isMobile, options);
      }
      if (type === "tag" && name === "img" && components?.Image) {
        return renderImage(domNode, isMobile, components.Image);
      }
      if (type === "tag" && name === "figcaption") {
        return renderFigCaption(domNode, options);
      }
      if (type === "tag" && name === "li") {
        return renderListItem(domNode, isMobile, options);
      }
      if (type === "tag" && (name === "ul" || name === "ol")) {
        return renderList(domNode, options);
      }
      if (type === "tag" && name === "span") {
        return <>{domToReact(children, options)}</>;
      }
      if (
        type === "tag" &&
        name === "div" &&
        attribs.class === "ad-slot" &&
        components?.AdSlot
      ) {
        return renderAdSlot(domNode, components.AdSlot);
      }
      return null;
    },
  };
  return HtmlReactParser(htmlString, options);
}

function getH2Texts(content: string) {
  const h2Tags = content.match(/<h2>.*<\/h2>/g) || [];
  return h2Tags.map((h2Tag: string) => {
    return h2Tag.replace(/<(.|\n)*?>/g, "");
  });
}

export interface ContentProps {
  children: string;
  isMobile?: boolean;
  hasTableOfContent?: boolean;
  renderCustomElement?: RenderCustomElement;
  noOfLines?: number;
}

export function Content(props: ContentProps) {
  const {
    children,
    isMobile = false,
    hasTableOfContent = false,
    renderCustomElement,
    noOfLines,
  } = props;
  const refRenderCustomElement = useRef(renderCustomElement);
  refRenderCustomElement.current = renderCustomElement;

  const Image = useImage();
  const content = useMemo(
    () => (
      <Box
        sx={{
          "& > *:first-child": {
            marginTop: 0,
          },
        }}
        {...(noOfLines
          ? {
              noOfLines,
            }
          : null)}
      >
        {parseHtml(
          children,
          isMobile,
          { AdSlot, Image },
          refRenderCustomElement.current
        )}
      </Box>
    ),
    [children, isMobile, Image, noOfLines]
  );
  if (hasTableOfContent) {
    const h2Texts = getH2Texts(children);
    return (
      <>
        <TableOfContent isMobile={isMobile} h2Texts={h2Texts} />
        {content}
      </>
    );
  }
  return <>{content}</>;
}

interface TableOfContentProps {
  h2Texts: string[];
  isMobile: boolean;
}

function TableOfContent(props: TableOfContentProps) {
  const { h2Texts, isMobile } = props;
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  return h2Texts.length > 0 ? (
    <Box
      py={1}
      backgroundColor="iceBlue.500"
      boxShadow={isMobile ? "none" : "base"}
      borderRadius="xl"
      marginBottom={isMobile ? 5 : 7}
    >
      <Flex
        justify="space-between"
        align="center"
        onClick={onToggle}
        cursor="pointer"
        py={2}
        px={5}
      >
        <Text fontFamily="poppins" fontWeight="semibold">
          Table of Content
        </Text>
        {isOpen ? (
          <ChevronDownIcon fontWeight="semibold" w={6} h={6} color="sea.500" />
        ) : (
          <ChevronUpIcon fontWeight="semibold" w={6} h={6} color="sea.500" />
        )}
      </Flex>
      <Collapse in={isOpen}>
        <List pb={2} pl={6} pr={5}>
          {h2Texts.map((h2Text, index) => (
            <ListItem
              key={h2Text}
              borderLeft="1px solid"
              borderColor="veryLightPink"
              pt={index === 0 ? 0 : 2}
              paddingLeft={5}
            >
              <Link
                href={`#${toSlug(h2Text)}`}
                variant="unstyled"
                height="max-content"
                size="sm"
              >
                {h2Text}
              </Link>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  ) : null;
}
