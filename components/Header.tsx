import Image from "next/image";
import SearchBar from "./SearchBar";
import IPDetailsCard from "./IPDetailsCard";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="relative z-1 h-65 md:h-60 w-1300:h-70">
      <div className="absolute top-0 left-0 w-full h-65 md:h-60 w-1300:h-70">
        <Image
          src={'/images/pattern-bg-desktop.png'}
          alt="bg image"
          fill
          className="object-cover -z-10"
        />
        <IPDetailsCard />
      </div>
      <div className="w-full h-full flex flex-col items-center pt-7 gap-6 md:gap-4 w-1300:gap-8">
        <div className="flex items-center gap-2">
          <h1><Logo /></h1>
        </div>
        <SearchBar />
      </div>
    </div >
  );
}
