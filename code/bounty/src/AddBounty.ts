import { createNewBountyRepository } from './utils/BountyRepository';

export async function handler(event: Record<string, any>) {
  console.log(JSON.stringify(event));

  const input = createBountyDTO(event);
  await createNewBountyRepository().add(input);
}

function createBountyDTO(event: Record<string, any>) {
  const name = event?.name;
  const damages = event?.damages;
  if (!name || !damages) throw new Error('Missing required input!');

  const bounty = calculateBounty(damages).toString();

  return {
    name,
    bounty
  };
}

function calculateBounty(damages: string) {
  return Math.floor(parseFloat(damages) * 0.2);
}
