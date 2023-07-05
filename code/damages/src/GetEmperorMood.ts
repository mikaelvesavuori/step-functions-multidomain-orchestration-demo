import { fetchData } from './utils/fetchData';
import { getEndpoint } from './utils/getEndpoint';
import { getValueFromObject } from './utils/getValueFromObject';

export async function handler() {
  const fallback = 'BAD';

  const url = getEndpoint(process.env.ENDPOINT);
  const response = await fetchData(url);

  return getValueFromObject(response, 'mood', fallback);
}
