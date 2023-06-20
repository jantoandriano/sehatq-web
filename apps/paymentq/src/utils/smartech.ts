import { ENV, CLIENT_TYPES } from "src/constants";
import { getParseToken } from "./parseJWT";

const netCore = () => {
  const global = window;

  global.cmd = global.cmd || [];

  return {
    smartech: global.smartech,
    cmd: global.cmd,
  };
};

export const registerNetCore = () => {
  const { clientId } = getParseToken();
  const smartech = netCore().smartech;

  smartech("create", ENV.SMARTECH_CREATE);
  smartech("register", ENV.SMARTECH_REGISTER);

  if (clientId !== CLIENT_TYPES.IOS && clientId !== CLIENT_TYPES.ANDROID) {
    smartech("dispatch", "page browse", { page_url: window.location.href });
  }

  /** Run the deferred smartech function
   * (identfy or dispatch)
   */
  if (netCore().cmd.length) {
    netCore().cmd.forEach((cmd: any) => {
      smartech.apply(smartech, cmd);
    });
  }
};

export const sendNetCore = (props: {
  type: string;
  value?: string;
  eventName?: string;
  attribute?: object;
}) => {
  const { type } = props;
  let cmd;

  if (type === "dispatch") {
    const { type, eventName, attribute } = props;
    cmd = [type, eventName, attribute];
  } else {
    const { type, value } = props;
    cmd = [type, value];
  }

  if (typeof netCore().smartech === "function") {
    const smartech = netCore().smartech;
    smartech.apply(smartech, cmd);
  } else {
    netCore().cmd.push(cmd);
  }
};
