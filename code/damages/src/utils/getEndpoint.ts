export function getEndpoint(processVariable: string | undefined) {
  const url = processVariable || '';
  if (!url) throw new Error('Missing endpoint!');
  return url;
}
