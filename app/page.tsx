'use client';

import { useBear } from "@/stores/bearStore";

export default function Home() {
  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("@/components/Map"), {
  //       loading: () => <p className="text-center p-4">Sedang memuat peta...</p>,
  //       ssr: false, // KUNCI UTAMA: Mematikan SSR untuk Leaflet
  //     }),
  //   []
  // );

  function BearCounter() {
    const bears = useBear((state: any) => state.bears);
    return <h1>{bears} bears around here...</h1>;
  }

  function Controls() {
    const increasePopulation = useBear((state: any) => state.increasePopulation);
    return <button onClick={increasePopulation}>one up</button>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl text-black font-bold mb-4">Implementasi Leaflet di Next.js</h1>
      {/* <BearCounter />
      <Controls /> */}
      {/* Map Wrapper */}
      <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
      </div>
    </main>
  );
}
