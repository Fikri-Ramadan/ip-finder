'use client';

import Header from "@/components/Header";
import { useBear } from "@/stores/bearStore";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// https://ip-intelligence.abstractapi.com/v1 -- default
// https://ip-intelligence.abstractapi.com/v1/?ip_address= -- default
// https://ip-intelligence.abstractapi.com/v1/?ip_address=125.166.0.188 -- custom

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <div className="flex-1 z-0 w-full h-[500px] bg-gray-950/30 animate-pulse" />,
        ssr: false, // KUNCI UTAMA: Mematikan SSR untuk Leaflet
      }),
    []
  );

  function BearCounter() {
    const bears = useBear((state: any) => state.bears);
    return <h1>{bears} bears around here...</h1>;
  }

  function Controls() {
    const increasePopulation = useBear((state: any) => state.increasePopulation);
    return <button onClick={increasePopulation}>one up</button>;
  }

  return (
    <main className="flex flex-col h-screen dark:bg-white">
      <Header />
      <div className="flex-1 z-0 w-full overflow-hidden shadow-lg">
        <Map />
      </div>
    </main>
  );
}
