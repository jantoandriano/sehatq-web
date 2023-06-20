import { useEffect } from "react";
import SendbirdChat from "@sendbird/chat";
import {
  GroupChannelModule,
  GroupChannel,
  GroupChannelHandler,
} from "@sendbird/chat/groupChannel";
import {
  UserMessageUpdateParams,
  UserMessageCreateParams,
  FileMessageCreateParams,
  FileMessageUpdateParams,
  BaseMessage,
  UserMessage,
  FileMessage,
} from "@sendbird/chat/message";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
  QueryClient,
} from "react-query";
import { cleanQuery, FetchError, AwaitedReturn } from "@sehatq/utils";
export { GroupChannel } from "@sendbird/chat/groupChannel";
import { useToast } from "../../user-interfaces";

export type SendbirdQuery = {
  appId: string;
};

export type SendbirdMessage = (UserMessage | FileMessage) & {
  message?: string;
};

export const sendbirdKeys = {
  all: ["SENDBIRD"],
  details: () => [...sendbirdKeys.all, "DETAIL"],
  detail: (query: SendbirdQuery) => [
    ...sendbirdKeys.details(),
    cleanQuery(query),
  ],
};

async function initSendbird(appId: string) {
  return await SendbirdChat.init({
    appId,
    modules: [new GroupChannelModule()],
  });
}

export type Sendbird = AwaitedReturn<typeof initSendbird>;

export function useGetSendbird(appId: SendbirdQuery["appId"]) {
  return useQuery(
    sendbirdKeys.detail({ appId }),
    async () => await initSendbird(appId)
  );
}

export type SendbirdUserQuery = {
  appId: string;
  userId: string;
  accessToken: string;
};

export const sendbirdUserKeys = {
  all: ["SENDBIRD_USER"],
  details: () => [...sendbirdUserKeys.all, "DETAIL"],
  detail: (query: SendbirdUserQuery) => [
    ...sendbirdUserKeys.details(),
    cleanQuery(query),
  ],
};

export function useGetSendbirdUser(
  sb: Sendbird | undefined,
  { userId, accessToken }: Pick<SendbirdUserQuery, "userId" | "accessToken">
) {
  return useQuery(
    sendbirdUserKeys.detail({ appId: sb?.appId || "", userId, accessToken }),
    async () => {
      if (sb?.currentUser?.userId === userId) {
        return sb.currentUser;
      } else if (sb?.currentUser) {
        await sb?.disconnect();
      }
      return await sb?.connect(userId, accessToken);
    },
    { enabled: Boolean(sb), useErrorBoundary: true }
  );
}

export type SendbirdChannelQuery = {
  appId: string;
  userId: string;
  channelUrl: string;
};

export const sendbirdChannelKeys = {
  all: ["SENDBIRD_CHANNEL"],
  details: () => [...sendbirdChannelKeys.all, "DETAIL"],
  detail: (query: SendbirdChannelQuery) => [
    ...sendbirdChannelKeys.details(),
    cleanQuery(query),
  ],
};

function updateNewMessage(
  queryClient: QueryClient,
  channelUrl: string,
  message: BaseMessage
) {
  queryClient.setQueryData<InfiniteData<BaseMessage[]>>(
    sendbirdMessagesKeys.inifiteList({ channelUrl }),
    (data = { pages: [], pageParams: [] }) => ({
      pages: [[...data.pages[0], message], ...data.pages.slice(1)],
      pageParams: data.pageParams,
    })
  );
}

function updateNewChannel(
  queryClient: QueryClient,
  sb: Sendbird | undefined,
  newChannel: GroupChannel
) {
  queryClient.setQueryData<GroupChannel>(
    sendbirdChannelKeys.detail({
      appId: sb?.appId || "",
      userId: sb?.currentUser?.userId ?? "",
      channelUrl: newChannel.url,
    }),
    newChannel
  );
}

export function useGetSendbirdChannel(
  sb: Sendbird | undefined,
  channelUrl: SendbirdChannelQuery["channelUrl"]
) {
  const queryClient = useQueryClient();
  const result = useQuery(
    sendbirdChannelKeys.detail({
      appId: sb?.appId || "",
      userId: sb?.currentUser?.userId ?? "",
      channelUrl,
    }),
    async () => await sb?.groupChannel.getChannel(channelUrl),
    { enabled: Boolean(sb?.currentUser?.userId), useErrorBoundary: true }
  );
  useEffect(() => {
    if (result.data && sb) {
      const channel = result.data;
      const channelHandler = new GroupChannelHandler();

      channelHandler.onMessageUpdated = (channel, message) => {
        queryClient.setQueryData<InfiniteData<BaseMessage[]>>(
          sendbirdMessagesKeys.inifiteList({ channelUrl: channel.url }),
          (data = { pages: [], pageParams: [] }) => ({
            pages: data.pages.map((page) =>
              page.map((currMassage) =>
                currMassage.messageId === message.messageId
                  ? message
                  : currMassage
              )
            ),
            pageParams: data.pageParams,
          })
        );
      };

      channelHandler.onMessageReceived = (channel, message) => {
        updateNewMessage(queryClient, channel.url, message);
      };

      channelHandler.onUnreadMemberStatusUpdated = (newChannel) => {
        updateNewChannel(queryClient, sb, newChannel);
      };

      channelHandler.onTypingStatusUpdated = (newChannel) => {
        updateNewChannel(queryClient, sb, newChannel);
      };

      sb.groupChannel.addGroupChannelHandler(channel.url, channelHandler);
      return () => {
        sb.groupChannel.removeGroupChannelHandler(channel.url);
      };
    }
  }, [queryClient, sb, result.data]);
  return result;
}

export type SendbirdMessageQuery = {
  channelUrl: string;
};

export const sendbirdMessagesKeys = {
  all: ["SENDBIRD_MESSAGE"],
  inifiteLists: () => [...sendbirdMessagesKeys.all, "INFINITE_LIST"],
  inifiteList: (query: SendbirdMessageQuery) => [
    ...sendbirdMessagesKeys.inifiteLists(),
    cleanQuery(query),
  ],
};

export function useGetInfiniteSendbirdMesssages(
  channel: GroupChannel | undefined
) {
  return useInfiniteQuery(
    sendbirdMessagesKeys.inifiteList({ channelUrl: channel?.url || "" }),
    async ({ pageParam }) => {
      return (await channel?.getMessagesByTimestamp(
        pageParam || new Date().getTime(),
        { prevResultSize: 20, nextResultSize: 0 }
      )) as SendbirdMessage[];
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length < 20 ? undefined : lastPage[0]?.createdAt ?? 0;
      },
      enabled: Boolean(channel),
    }
  );
}

export type SendMessageVariables =
  | ({
      channel: GroupChannel;
      messageId: number;
    } & UserMessageUpdateParams)
  | (UserMessageCreateParams & {
      channel: GroupChannel;
    });

export function useSendSendbirdMessage() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation<BaseMessage, Error, SendMessageVariables>(
    async (variables) => {
      const { channel } = variables;
      if ("messageId" in variables) {
        return await channel.updateUserMessage(variables.messageId, variables);
      }
      return new Promise((resolve, reject) => {
        channel
          .sendUserMessage(variables)
          .onSucceeded(resolve)
          .onFailed(reject);
      });
    },
    {
      onSuccess: (message, { channel }) => {
        updateNewMessage(queryClient, channel.url, message);
      },
      onError: ({ message }) => {
        toast({
          message,
          status: "error",
        });
      },
    }
  );
}

export type SendFileVariables =
  | ({
      channel: GroupChannel;
      messageId: number;
    } & FileMessageUpdateParams)
  | (FileMessageCreateParams & {
      channel: GroupChannel;
    });

export function useSendSendbirdFile() {
  const queryClient = useQueryClient();
  return useMutation<BaseMessage, FetchError, SendFileVariables>(
    async (variables) => {
      const { channel } = variables;
      if ("messageId" in variables) {
        return await channel.updateFileMessage(variables.messageId, variables);
      }
      return new Promise((resolve, reject) => {
        channel
          .sendFileMessage(variables)
          .onSucceeded(resolve)
          .onFailed(reject);
      });
    },
    {
      onSuccess: (message, { channel }) => {
        updateNewMessage(queryClient, channel.url, message);
      },
    }
  );
}
