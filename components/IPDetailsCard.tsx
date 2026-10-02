'use client';

import { useState } from "react";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import useIpData from "@/hooks/useIpData";
import { formatUtcOffset } from "@/lib/utils";
import { useIpDetails } from "@/stores/IpDetailsStore";

const cardPosition =
  "absolute top-[calc(100%-6rem)] md:top-auto md:-bottom-19 left-1/2 -translate-x-1/2 w-[87%] md:w-[90%] max-w-[1100px]";

const labelClass = "text-black/40 font-extrabold text-xs tracking-widest";
const valueClass = "text-black font-bold text-base md:text-[18px] w-1300:text-[21px]";

export default function IPDetailsCard() {
  const hydrated = useHasHydrated();
  const { isValidating } = useIpData();
  const details = useIpDetails(state => state.details);
  const [open, setOpen] = useState(true);

  if (!hydrated || isValidating) {
    return (
      <div className={`flex ${cardPosition} h-22 md:h-[140px] md:max-h-[200px] w-1300:h-[160px] bg-white rounded-xl shadow-lg p-4 w-1300:p-6`}>
        <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex-1/4 w-full h-full bg-gray-950/30 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${cardPosition} h-auto md:h-[140px] md:max-h-[200px] w-1300:h-[160px] bg-white rounded-xl shadow-lg p-4 w-1300:p-6`}>
      <div className="flex-1 flex flex-col md:flex-row justify-between items-stretch md:items-start pt-2 px-3">
        <div className="relative md:flex-1/4 space-y-1 md:space-y-2 flex flex-col justify-center text-center md:text-start">
          <div className={labelClass}>IP ADDRESS</div>
          <div className={valueClass}>{details?.ip}</div>

          <button
            type="button"
            onClick={() => {console.log('click');setOpen(prev => !prev)}}
            aria-expanded={open}
            aria-controls="ip-details-extra"
            aria-label={open ? "Hide details" : "Show details"}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        <div className="hidden md:block w-[0.5px] h-20 bg-gray-400 mx-10" />

        {/* Collapsible on mobile, always shown on md+ (md:contents keeps the original row layout) */}
        <div
          id="ip-details-extra"
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:contents ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden md:contents">
            <div className="flex flex-col gap-4 pt-4 md:contents">
              <div className="md:flex-1/4 space-y-1 md:space-y-2 flex flex-col justify-center text-center md:text-start">
                <div className={labelClass}>LOCATION</div>
                <div className={valueClass}>
                  <p className={`${valueClass} leading-tight`}>
                    {details?.city}, {details?.region}
                    <br />
                    {details?.postalCode}
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-[0.5px] h-20 bg-gray-400 mx-10" />

              <div className="md:flex-1/4 space-y-1 md:space-y-2 flex flex-col justify-center text-center md:text-start">
                <div className={labelClass}>TIMEZONE</div>
                <div className={valueClass}>
                  {formatUtcOffset(details?.timezone ?? '')}
                </div>
              </div>

              <div className="hidden md:block w-[0.5px] h-20 bg-gray-400 mx-10" />

              <div className="md:flex-1/4 space-y-1 md:space-y-2 flex flex-col justify-center text-center md:text-start leading-8 pb-2">
                <div className={labelClass}>ISP</div>
                <div className={`${valueClass} leading-tight`}>{details?.isp}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
