export function isExpired(serverTime: string, transactionTimeout: string) {
  const server = new Date(serverTime ?? "").getTime();
  const timeOut = new Date(transactionTimeout ?? "").getTime();
  const expired = timeOut - server;

  return expired <= 0;
}
