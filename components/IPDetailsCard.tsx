import { formatUtcOffset } from "@/lib/utils";

export default function IPDetailsCard() {
  return (
    <div className="flex absolute -bottom-19 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] h-[160px] bg-white rounded-xl shadow-lg p-6">
      <div className="flex-1 flex justify-between items-start pt-2 px-3">
        <div className="flex-1/4 space-y-2">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">IP ADDRESS</div>
          <div className="text-black font-bold text-[26px]">192.212.174.101</div>
        </div>
        <div className="w-[0.5px] h-20 bg-gray-400 mx-10" />
        <div className="flex-1/4 space-y-2">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">LOCATION</div>
          <div className="text-black font-bold text-[26px]">
            <p className="text-black font-bold text-[26px] leading-tight">
              {'Brooklyn'}, {'NY'}
              <br />
              {10001}
            </p>
          </div>
        </div>
        <div className="w-[0.5px] h-20 bg-gray-400 mx-10" />
        <div className="flex-1/4 space-y-2">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">TIMEZONE</div>
          <div className="text-black font-bold text-[26px]">
            {formatUtcOffset(-7)}
          </div>
        </div>
        <div className="w-[0.5px] h-20 bg-gray-400 mx-10" />
        <div className="flex-1/4 space-y-2 leading-8">
          <div className="text-black/40 font-extrabold text-xs tracking-widest">ISP</div>
          <div className="text-black font-bold text-[26px] leading-tight">SpaceX Starlink</div>
        </div>
      </div>
    </div>
  );
}