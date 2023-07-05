import { fetchData } from './utils/fetchData';
import { getEndpoint } from './utils/getEndpoint';
import { getValueFromObject } from './utils/getValueFromObject';

export async function handler(event: Record<string, any>) {
  const name = event.name;
  const fallback = 1;

  const url = getEndpoint(process.env.ENDPOINT);
  const response = await fetchData(url);

  return getValueFromObject(response, name, fallback);
}
