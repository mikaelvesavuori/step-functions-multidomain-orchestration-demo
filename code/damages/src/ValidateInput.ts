export async function handler(event: Record<string, any>) {
  if (!event?.name) throw new Error('Missing name!');
  if (!event?.value) throw new Error('Missing value!');

  return {
    name: event.name,
    value: event.value
  };
}
