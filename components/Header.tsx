import Image from "next/image";
import SearchBar from "./SearchBar";
import IPDetailsCard from "./IPDetailsCard";

export default function Header() {
  return (
    <div className="relative z-1 h-70">
      <div className="absolute top-0 left-0 w-full h-70 -z-10">
        <Image
          src={'/images/pattern-bg-desktop.png'}
          alt="bg image"
          fill
          className="object-cover"
        />
        <IPDetailsCard />
      </div>
      <div className="w-full h-full flex flex-col items-center pt-8 gap-8">
        <div className="text-3xl font-semibold tracking-wide">IP Address Tracker</div>
        <SearchBar />
      </div>
    </div>
  );
}