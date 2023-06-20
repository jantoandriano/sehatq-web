/* eslint-disable react-hooks/rules-of-hooks */
import React, { FunctionComponent, MouseEvent } from "react";
import { useGlobals } from "@storybook/api";
import { useGlobals as useAddonGlobals } from "@storybook/addons";
import {
  AddonPanel,
  ObjectControl,
  OptionsControl,
  Spaced,
  Form,
  SyntaxHighlighter,
  H4,
} from "@storybook/components";
import { styled } from "@storybook/theming";
import {
  NavigationProvider,
  NavigateProps,
  NavigationValue,
  createRealURL,
} from "@sehatq/utils";
import { URLS } from "@sehatq/constants";

const Fullwidth = styled.div`
  width: 100%;
`;

function generateNavigationValueUtils(
  currNavigationValue: any,
  setNavigationValue: (newNavigationValue: NavigationValue) => void
) {
  function navigate(
    name: NavigateProps["name"],
    query?: NavigateProps["query"],
    options?: NavigateProps["options"]
  ) {
    setNavigationValue({
      name,
      options,
      query:
        typeof query === "function"
          ? name === currNavigationValue.name
            ? query(currNavigationValue.query)
            : query()
          : query,
    });
  }

  function goBack() {
    setNavigationValue({ name: "HOME" });
  }
  return { navigate, goBack };
}

export const NAVIGATION_ADDON_ID = "sehatq/navigation";
export const NAVIGATION_PANEL_ID = `${NAVIGATION_ADDON_ID}/panel`;

export function StorybookNavigationPanel(props: { active?: boolean }) {
  const [{ navigationValue = { name: "HOME" } }, updateGlobals] = useGlobals();
  const { name, query } = navigationValue;
  function setNavigationValue(newNavigationValue: NavigationValue) {
    updateGlobals({ navigationValue: newNavigationValue });
  }
  const pathname = (
    Object.keys(URLS).includes(name as string)
      ? URLS[name as keyof typeof URLS]
      : name
  ) as string;
  return (
    <AddonPanel active={props.active ?? false} {...props}>
      <Spaced>
        <Form.Field label="Url">
          <Fullwidth>
            <H4>
              <strong>{createRealURL(pathname, query)}</strong>
            </H4>
          </Fullwidth>
        </Form.Field>
        <Form.Field label="Name">
          <Fullwidth>
            <OptionsControl
              labels={{}}
              name="name"
              type="select"
              options={
                Object.keys(URLS).includes(navigationValue.name)
                  ? Object.keys(URLS)
                  : [navigationValue.name, ...Object.keys(URLS)]
              }
              value={navigationValue.name}
              onChange={(newName) =>
                setNavigationValue({ ...navigationValue, name: newName })
              }
            />
          </Fullwidth>
        </Form.Field>
        <Form.Field label="Query">
          <Fullwidth>
            <ObjectControl
              theme={undefined}
              name="query"
              value={navigationValue.query ?? {}}
              onChange={(newQuery) =>
                setNavigationValue({ ...navigationValue, query: newQuery })
              }
            />
          </Fullwidth>
        </Form.Field>
        {navigationValue.options ? (
          <Form.Field label="Options">
            <Fullwidth>
              <SyntaxHighlighter language="json">
                {JSON.stringify(navigationValue.options)}
              </SyntaxHighlighter>
            </Fullwidth>
          </Form.Field>
        ) : null}
      </Spaced>
    </AddonPanel>
  );
}

export const withNavigation = (StoryFn: FunctionComponent) => {
  const [{ currNavigationValue = { name: "HOME" } }, updateGlobals] =
    useAddonGlobals();
  function setNavigationValue(newNavigationValue: NavigationValue) {
    updateGlobals({ navigationValue: newNavigationValue });
  }
  const { navigate, goBack } = generateNavigationValueUtils(
    currNavigationValue,
    setNavigationValue
  );

  function Navigate(props: NavigateProps) {
    const { children, ...newNavigationValue } = props;
    const newPathname = (
      Object.keys(URLS).includes(newNavigationValue.name as string)
        ? URLS[newNavigationValue.name as keyof typeof URLS]
        : newNavigationValue.name
    ) as string;
    const newQuery =
      typeof newNavigationValue.query === "function"
        ? newNavigationValue.name === currNavigationValue.name
          ? newNavigationValue.query(currNavigationValue.query)
          : newNavigationValue.query()
        : newNavigationValue.query;
    return React.cloneElement(children, {
      onClick: (event: MouseEvent) => {
        event.preventDefault();
        navigate(
          newNavigationValue.name,
          newNavigationValue.query,
          newNavigationValue.options
        );
      },
      href: createRealURL(newPathname, newQuery),
    });
  }
  return (
    <NavigationProvider
      value={{
        goBack,
        navigate,
        Navigate,
      }}
    >
      <StoryFn />
    </NavigationProvider>
  );
};
