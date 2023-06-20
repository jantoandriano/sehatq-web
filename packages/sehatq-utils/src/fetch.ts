import axios, { AxiosRequestConfig, AxiosError } from "axios";
import CoookieBrowser from "js-cookie";
import CoookieNode from "cookie";
import { CLIENT_TYPES } from "@sehatq/constants";
import { isMobileDevice } from "./is-mobile-device";

const timeout = 30000;

export function createBrowserFetch(omitToken = false) {
  const cookies = CoookieBrowser.get();
  const isMobile = isMobileDevice(window?.navigator?.userAgent);
  const {
    token,
    clientId = isMobile ? CLIENT_TYPES.MWEB : CLIENT_TYPES.WEB,
    clientVersion,
  } = cookies;
  const instance = axios.create({
    timeout,
    headers: {
      ...DEFAULT_HEADERS,
      ...(token && !omitToken ? { Authorization: token } : null),
      "Client-Id": clientId,
      "Client-Version": clientVersion || "1.0.0",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
    },
    (error) => Promise.reject(getErrorMessage(error, clientId))
  );
  // Fix https://github.com/axios/axios/issues/86 issue
  async function get<T = any>(url: string, config?: AxiosRequestConfig) {
    return await instance.get<T, T>(url, { data: null, ...config });
  }
  async function put<T = any>(
    url: string,
    data: any = null,
    config?: AxiosRequestConfig
  ) {
    return await instance.put<T, T>(url, data, config);
  }
  async function post<T = any>(
    url: string,
    data: any = null,
    config?: AxiosRequestConfig
  ) {
    return await instance.post<T, T>(url, data, config);
  }
  async function _delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return await instance.delete<T, T>(url, { data: null, ...config });
  }

  async function patch<T = any>(
    url: string,
    data: any = null,
    config?: AxiosRequestConfig
  ) {
    return await instance.patch<T, T>(url, data, config);
  }

  return {
    get,
    put,
    post,
    patch,
    delete: _delete,
  };
}

export function createNodeFetch(arg?: { cookie?: string; isMobile?: boolean }) {
  const { cookie = "", isMobile = false } = arg ?? {};
  const cookies = CoookieNode.parse(cookie);
  const {
    token,
    clientId = isMobile ? CLIENT_TYPES.MWEB : CLIENT_TYPES.WEB,
    clientVersion,
  } = cookies;
  const instance = axios.create({
    timeout,
    headers: {
      ...DEFAULT_HEADERS,
      ...(token ? { Authorization: token } : null),
      "Client-Id": clientId,
      "Client-Version": clientVersion || "1.0.0",
    },
  });
  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
    },
    (error) => Promise.reject(getErrorMessage(error, clientId))
  );
  // Fix https://github.com/axios/axios/issues/86 issue
  async function get<T = any>(url: string, config?: AxiosRequestConfig) {
    return await instance.get<T, T>(url, { data: null, ...config });
  }
  async function put<T = any>(
    url: string,
    data: any = null,
    config?: AxiosRequestConfig
  ) {
    return await instance.put<T, T>(url, data, config);
  }
  async function post<T = any>(
    url: string,
    data: any = null,
    config?: AxiosRequestConfig
  ) {
    return await instance.post<T, T>(url, data, config);
  }
  async function _delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return await instance.delete<T, T>(url, { data: null, ...config });
  }

  async function patch<T = any>(
    url: string,
    data: any = null,
    config?: AxiosRequestConfig
  ) {
    return await instance.patch<T, T>(url, data, config);
  }
  return {
    get,
    put,
    post,
    patch,
    delete: _delete,
  };
}

export type Fetch = ReturnType<typeof createNodeFetch>;

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function getErrorMessage(error: AxiosError, clientId: string) {
  let errorMessage = "";
  let errorStatus = null;
  if (error.response) {
    errorStatus = error.response.status;
    const errorResponse = error.response;

    if (errorResponse.data?.errors?.length > 0) {
      errorMessage = errorResponse.data.errors
        .map((elm: { detail: string }) => elm.detail)
        .join(". ");
    } else if (errorResponse.statusText) {
      errorMessage = errorResponse.statusText;
    } else {
      errorMessage = "Error";
    }
  } else if (error.request) {
    errorMessage = error.request.toString();
  } else {
    errorMessage = "Error";
  }

  return {
    url: error?.config?.url,
    message: errorMessage,
    status: errorStatus,
    clientId,
  };
}

export type FetchError = ReturnType<typeof getErrorMessage>;
