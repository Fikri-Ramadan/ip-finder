import { IpState } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const IpDetailsStore = create<IpState>()(
  persist(
    (set, get) => ({
      details: {
        ip: 'Undetected',
        city: 'Jakarta',
        region: 'West Java',
        postalCode: '(Default)',
        isp: 'Unknown Provider',
        timezone: '+07:00',
        latitude: -6.1754049,
        longitude: 106.827168
      },
      setDetails: (details) => set({ details }),
      reset: () => set({ details: null })
    }),
    {
      name: 'ip-details-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const useIpDetails = IpDetailsStore;