export interface IpState {
  details: IpDetails | null;
  setDetails: (details: IpDetails) => void;
  reset: () => void;
}

export interface IpDetails {
  ip: string;
  city: string;
  region: string;
  postalCode: string;
  timezone: string;
  isp: string;
  latitude: number;
  longitude: number;
}

export interface SearchState {
  query: string;
  setQuery: (query: string) => void;
}