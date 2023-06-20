export function nullify<TData = unknown>(data: TData): TData {
  return JSON.parse(JSON.stringify(data));
}
