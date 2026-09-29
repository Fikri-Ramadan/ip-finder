import { IpDetails } from '@/lib/types';
import { useIpDetails } from '@/stores/IpDetailsStore';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`error with status ${res.status}`);
    }
    return res.json();
  });

export default function useIpData() {
  const setDetails = useIpDetails(state => state.setDetails);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const apiURL = `/api/tracker?search=${search}`;

  const { data, isValidating, isLoading, error } = useSWR(apiURL, fetcher, {
    onSuccess: (data) => {
      if (data?.success) {
        const ipDetails: IpDetails = {
          ip: data?.ip,
          city: data?.city,
          region: data?.region,
          postalCode: data?.postal,
          timezone: data?.timezone?.utc,
          isp: data?.connection?.isp,
          latitude: data?.latitude,
          longitude: data?.longitude
        };
        setDetails(ipDetails);
      } else {
        const ipDetails: IpDetails = {
          ip: 'Undetected',
          city: 'Jakarta',
          region: 'West Java',
          postalCode: '(Default)',
          isp: 'Unknown Provider',
          timezone: '+07:00',
          latitude: -6.1754049,
          longitude: 106.827168
        };
        setDetails(ipDetails);
      }
    },
    onError: (err) => {
      console.error('Failed to fetch:', err?.message);
      const ipDetails: IpDetails = {
        ip: 'Undetected',
        city: 'Jakarta',
        region: 'West Java',
        postalCode: '(Default)',
        isp: 'Unknown Provider',
        timezone: '+07:00',
        latitude: -6.1754049,
        longitude: 106.827168
      };
      setDetails(ipDetails);
    },
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });

  return {
    data,
    isValidating,
    isLoading,
    error
  };
}