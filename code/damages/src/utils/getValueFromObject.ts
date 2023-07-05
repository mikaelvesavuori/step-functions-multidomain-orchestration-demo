export function getValueFromObject(
  object: Record<string, any>,
  matchingName: string,
  fallbackValue?: string | number
) {
  return object[matchingName] || fallbackValue;
}
