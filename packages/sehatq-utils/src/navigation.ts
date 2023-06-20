import React, { ReactElement, Fragment } from "react";
import { Query } from "@sehatq/types";
import { URLS } from "@sehatq/constants";

type URLKeys = keyof typeof URLS;

interface Options {
  scroll?: boolean;
  shallow?: boolean;
  replace?: boolean;
  prefetch?: boolean;
  alias?: {
    name: URLKeys;
    query?: Query | QueryFunction;
  };
}

type QueryFunction = (oldQuery?: Query) => Query;

type NavigateName = URLKeys | Omit<string, URLKeys>;

export interface NavigationValue {
  name: NavigateName;
  query?: Query | QueryFunction;
  options?: Options;
}

export interface NavigateProps extends NavigationValue {
  children: ReactElement;
}

interface NavigationContextInterface {
  goBack: () => void;
  navigate: (
    name: NavigationValue["name"],
    query?: NavigationValue["query"],
    options?: NavigationValue["options"]
  ) => void;
  Navigate: React.FC<NavigateProps>;
}

const NavigationContext = React.createContext<NavigationContextInterface>({
  goBack: console.log,
  navigate: console.log,
  Navigate: Fragment,
});

export const NavigationProvider = NavigationContext.Provider;

export function useNavigation() {
  return React.useContext(NavigationContext);
}
