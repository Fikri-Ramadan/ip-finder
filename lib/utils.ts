const isIPv4 = (input: string): boolean => {
  const parts = input.split('.');

  return (
    parts.length === 4 &&
    parts.every((part) => /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) <= 255)
  );
};

const isIPv6 = (input: string): boolean => {
  if (!input.includes(':') || !/^[0-9a-fA-F:.]+$/.test(input)) return false;

  try {
    new URL(`http://[${input}]`);
    return true;
  } catch {
    return false;
  }
};

export const isIpAddress = (input: string): boolean => {
  const value = input.trim();
  return isIPv4(value) || isIPv6(value);
};

export const isDomain = (input: string): boolean => {
  const DOMAIN_REGEX = /^(?=.{1,253}$)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/i;

  return DOMAIN_REGEX.test(input);
};

export const formatUtcOffset = (offset: string): string => {
  const displayUtc = offset?.replace("-", "−");
  return `UTC ${displayUtc}`;
};