'use client';

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const path = search ? `?search=${search}` : '/';
    router.push(path);
  };

  return (
    <form className="flex w-full max-w-150 px-6 shadow-sm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search for any IP address or domain"
        className="w-full bg-white text-black px-6 py-4 rounded-l-2xl text-sm md:text-xl outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="bg-gray-950 hover:bg-gray-950/80 transition-colors px-6 rounded-r-2xl flex items-center justify-center cursor-pointer"
      >
        <Image
          src={'/images/icon-arrow.svg'}
          alt=""
          width={12}
          height={12}
          className="object-cover"
        />
      </button>
    </form>
  );
}