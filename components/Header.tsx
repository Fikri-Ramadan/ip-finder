import Image from "next/image";

export default function Header() {
  return (
    <div className="relative z-1">
      <Image
        src={'/images/pattern-bg-desktop.png'}
        alt="bg image"
        width={1000}
        height={1000}
        className="w-full h-70"
      />
      <div className="absolute -bottom-19 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] h-[160px] bg-white rounded-xl shadow-lg p-6">
      </div>
    </div>
  );
}