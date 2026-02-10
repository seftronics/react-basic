"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function ChildLogger({ count }: { count: number }) {
  useEffect(() => {
    console.log("[Child] mounted");

    return () => {
      console.log("[Child] unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("[Child] count updated:", count);
  }, [count]);

  return (
    <div className="rounded-lg border border-zinc-300 p-4">
      <p className="font-medium">Child aktif</p>
      <p className="text-sm text-zinc-600">Count dari parent: {count}</p>
    </div>
  );
}

export default function LifecycleHooksPage() {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);

  useEffect(() => {
    console.log("[Page] mounted");

    return () => {
      console.log("[Page] unmounted");
    };
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demo Lifecycle Hooks</h1>
        <div className="flex items-center gap-4">
          <Link className="text-sm text-blue-600 underline" href="/learn-lifecycle">
            Back ke Materi
          </Link>
          <Link className="text-sm text-blue-600 underline" href="/">
            Home
          </Link>
        </div>
      </div>

      <section className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-2 text-lg font-semibold">1. Update</h2>
        <p className="mb-3 text-sm text-zinc-600">Klik tombol untuk memicu update state.</p>
        <div className="flex items-center gap-3">
          <button
            className="rounded bg-zinc-900 px-3 py-2 text-white"
            onClick={() => setCount((prev) => prev + 1)}
          >
            Tambah Count
          </button>
          <span className="font-medium">Count: {count}</span>
        </div>
      </section>

      <section className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-2 text-lg font-semibold">2. Mount dan Unmount</h2>
        <p className="mb-3 text-sm text-zinc-600">
          Toggle child component lalu cek console browser untuk log mount/unmount.
        </p>
        <button
          className="mb-4 rounded bg-blue-600 px-3 py-2 text-white"
          onClick={() => setShowChild((prev) => !prev)}
        >
          {showChild ? "Sembunyikan Child" : "Tampilkan Child"}
        </button>

        {showChild ? <ChildLogger count={count} /> : <p className="text-sm">Child sedang disembunyikan.</p>}
      </section>

      <section className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-2 text-lg font-semibold">Catatan</h2>
        <p className="text-sm text-zinc-600">
          Buka DevTools Console untuk melihat urutan lifecycle pada parent dan child.
        </p>
      </section>
    </main>
  );
}
