export const formatUtcOffset = (offset: string): string => {
  const displayUtc = offset?.replace("-", "−");
  return `UTC ${displayUtc}`;
};

export const isIpAddress = (input: string): boolean => {
  const ipv4Regex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(input) || ipv6Regex.test(input);
};

export const isDomain = (input: string): boolean => {
  const DOMAIN_REGEX = /^(?=.{1,253}$)([a-z0-9-]{1,63}\.)+[a-z]{2,}$/i;

  return DOMAIN_REGEX.test(input);
};