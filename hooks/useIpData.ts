import { IpDetails } from '@/lib/types';
import { useIpDetails } from '@/stores/IpDetailsStore';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useIpData() {
  const searchParams = useSearchParams();
  const ip = searchParams.get('ip') || '';
  
  const apiURL = `/api/tracker?ip=${ip}`;
  const setDetails = useIpDetails(state => state.setDetails);
  const { data, isValidating, isLoading, error } = useSWR(null, fetcher, {
    onSuccess: (data) => {
      if (data) {
        const ipDetails: IpDetails = {
          ip: data?.ip_address,
          city: data?.location?.city,
          region: data?.location?.region,
          postalCode: data?.location?.postal_code,
          timezone: data?.timezone?.utc_offset,
          isp: data?.company?.name,
          latitude: data?.location?.latitude,
          longitude: data?.location?.longitude
        };

        setDetails(ipDetails);
      }
    },
    onError: (err) => {
      console.error('Failed to fetch:', err);
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