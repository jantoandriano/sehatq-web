export interface SearchAutoCompleteResponse {
  data: {
    contextName?: string;
    contextType?: string;
    query: string;
    totalHits: number;
  }[];
}

function modelAutoComplete(data: SearchAutoCompleteResponse["data"][number]) {
  return {
    query: data.query,
    contextLabel: data.contextName ? `di ${data.contextName}` : "",
    filter: data.contextType,
  };
}

export function modelSearchAutoComplete(
  data: SearchAutoCompleteResponse["data"]
) {
  return data.map(modelAutoComplete);
}
