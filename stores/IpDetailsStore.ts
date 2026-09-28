import { IpState } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const IpDetailsStore = create<IpState>()(
  persist(
    (set, get) => ({
      details: null,
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