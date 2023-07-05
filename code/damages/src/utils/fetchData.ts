/**
 * @description Wrapper for fetching data.
 */
export async function fetchData(
  url: string,
  method?: 'POST' | 'PATCH' | 'GET',
  headers?: Record<string, any>,
  body?: any
): Promise<any> {
  return await fetch(url, {
    headers,
    body: body ? JSON.stringify(body) : undefined,
    method: method || 'GET'
  }).then(async (res) => await res.json());
}
