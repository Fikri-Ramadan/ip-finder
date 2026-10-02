'use client';

import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => <div className="flex-1 z-0 w-full h-[500px] bg-gray-950/30 animate-pulse" />,
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex flex-col h-dvh overflow-hidden dark:bg-white">
      <Suspense fallback={<div className="w-full h-60 w-1300:h-70 bg-gray-950/30 animate-pulse" />}>
        <Header />
      </Suspense>
      <div className="flex-1 z-0 w-full overflow-hidden shadow-lg">
        <Map />
      </div>
    </main>
  );
}
