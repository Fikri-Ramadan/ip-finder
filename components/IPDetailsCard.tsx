'use client';

import { useHasHydrated } from "@/hooks/useHasHydrated";
import useIpData from "@/hooks/useIpData";
import { formatUtcOffset } from "@/lib/utils";
import { useIpDetails } from "@/stores/IpDetailsStore";

export default function IPDetailsCard() {
  const hydrated = useHasHydrated();
  const { isValidating } = useIpData();
  const details = useIpDetails(state => state.details);

  if (!hydrated || isValidating) {
    return (
      <div className="flex absolute -bottom-19 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] h-[140px] w-1300:h-[160px] bg-white rounded-xl shadow-lg p-4 w-1300:p-6">
        <div className="flex-1 flex justify-between items-start">
          <div className="flex-1/4 w-100 h-full bg-gray-950/30 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex absolute -bottom-19 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] h-[140px] max-h-[200px] w-1300:h-[160px] bg-white rounded-xl shadow-lg p-6">
      <div className="flex-1 flex flex-col md:flex-row justify-between items-start pt-2 px-3">
        <div className="flex-1/4 space-y-2">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">IP ADDRESS</div>
          <div className="text-black font-bold text-[18px] w-1300:text-[21px]">{details?.ip}</div>
        </div>
        <div className="w-[0.5px] h-20 bg-gray-400 mx-10" />
        <div className="flex-1/4 space-y-2">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">LOCATION</div>
          <div className="text-black font-bold text-[18px] w-1300:text-[21px]">
            <p className="text-black font-bold text-[18px] w-1300:text-[21px] leading-tight">
              {details?.city}, {details?.region}
              <br />
              {details?.postalCode}
            </p>
          </div>
        </div>
        <div className="w-[0.5px] h-20 bg-gray-400 mx-10" />
        <div className="flex-1/4 space-y-2">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">TIMEZONE</div>
          <div className="text-black font-bold text-[18px] w-1300:text-[21px]">
            {formatUtcOffset(details?.timezone ?? '')}
          </div>
        </div>
        <div className="w-[0.5px] h-20 bg-gray-400 mx-10" />
        <div className="flex-1/4 space-y-2 leading-8">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">ISP</div>
          <div className="text-black font-bold text-[18px] w-1300:text-[21px] leading-tight">{details?.isp}</div>
        </div>
      </div>
    </div>
  );
}