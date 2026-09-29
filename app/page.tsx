'use client';

import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <div className="flex-1 z-0 w-full h-[500px] bg-gray-950/30 animate-pulse" />,
        ssr: false,
      }),
    []
  );

  return (
    <main className="flex flex-col h-screen dark:bg-white">
      <Header />
      <div className="flex-1 z-0 w-full overflow-hidden shadow-lg">
        <Map />
      </div>
    </main>
  );
}
