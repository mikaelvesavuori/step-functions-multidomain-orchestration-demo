import { createNewBountyRepository } from './utils/BountyRepository';

export async function handler(event: Record<string, any>) {
  console.log(JSON.stringify(event));
  if (event?.requestContext?.http?.method === 'OPTIONS') return end(); // Handle CORS

  const bounties = await createNewBountyRepository().get();

  return end(bounties);
}

const end = (data?: any) => ({
  statusCode: data ? 200 : 204,
  body: data ? JSON.stringify(data) : null,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }
});
