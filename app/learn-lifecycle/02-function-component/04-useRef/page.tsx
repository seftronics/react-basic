"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function UseRefPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const renderCountRef = useRef(0);
  const prevCountRef = useRef<number | null>(null);

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [renderCountSnapshot, setRenderCountSnapshot] = useState(0);
  const [prevCountSnapshot, setPrevCountSnapshot] = useState<number | null>(null);

  useEffect(() => {
    renderCountRef.current += 1;
  });

  useEffect(() => {
    setPrevCountSnapshot(prevCountRef.current);
    prevCountRef.current = count;
  }, [count]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = "";
    setText("");
    inputRef.current.focus();
  };

  const showRenderCount = () => {
    setRenderCountSnapshot(renderCountRef.current);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Latihan useRef</h1>
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
        <h2 className="mb-2 text-lg font-semibold">1. Akses DOM</h2>
        <p className="mb-3 text-sm text-zinc-600">
          `useRef` bisa menyimpan referensi elemen DOM tanpa query selector.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            ref={inputRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Tulis sesuatu..."
            className="rounded border border-zinc-300 px-3 py-2"
          />
          <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={focusInput}>
            Focus Input
          </button>
          <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={clearInput}>
            Clear
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-2 text-lg font-semibold">2. Simpan Nilai Tanpa Re-render</h2>
        <p className="mb-3 text-sm text-zinc-600">
          `renderCountRef.current` berubah tanpa memicu render baru.
        </p>
        <div className="flex items-center gap-3">
          <button
            className="rounded bg-zinc-900 px-3 py-2 text-white"
            onClick={() => setCount((prev) => prev + 1)}
          >
            Tambah Count
          </button>
          <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={showRenderCount}>
            Lihat Jumlah Render
          </button>
          <span className="font-medium">Count: {count}</span>
        </div>
        <p className="mt-2 text-sm text-zinc-600">Jumlah render: {renderCountSnapshot}</p>
      </section>

      <section className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-2 text-lg font-semibold">3. Simpan Previous Value</h2>
        <p className="text-sm text-zinc-600">Previous count: {prevCountSnapshot ?? "-"}</p>
      </section>
    </main>
  );
}
