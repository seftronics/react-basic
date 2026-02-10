import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-5 px-6 py-10">
      <h1 className="text-3xl font-bold">React Basic Playground</h1>
      <p className="text-zinc-600">
        Kumpulan contoh dasar React di project ini. Pilih halaman yang ingin dipelajari.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/learn-lifecycle"
          className="rounded-lg border border-zinc-300 p-4 transition hover:bg-zinc-50"
        >
          <p className="font-semibold">Daftar Isi Materi Lifecycle</p>
          <p className="text-sm text-zinc-600">
            Halaman list materi untuk navigasi presentasi / share knowledge.
          </p>
        </Link>

        <Link
          href="/learn-lifecycle/lifecycle-hooks"
          className="rounded-lg border border-zinc-300 p-4 transition hover:bg-zinc-50"
        >
          <p className="font-semibold">Demo Lifecycle Hooks (Mount/Update/Unmount)</p>
          <p className="text-sm text-zinc-600">
            Contoh interaktif useEffect dan cleanup dengan log di console.
          </p>
        </Link>

        <Link
          href="/learn-lifecycle/02-function-component/02-useEffect"
          className="rounded-lg border border-zinc-300 p-4 transition hover:bg-zinc-50"
        >
          <p className="font-semibold">Latihan useEffect (existing)</p>
          <p className="text-sm text-zinc-600">Contoh tambahan: debounce, interval, dan dependency.</p>
        </Link>

        <Link
          href="/learn-lifecycle/02-function-component/04-useRef"
          className="rounded-lg border border-zinc-300 p-4 transition hover:bg-zinc-50"
        >
          <p className="font-semibold">Latihan useRef</p>
          <p className="text-sm text-zinc-600">
            Contoh akses DOM, simpan previous value, dan nilai mutable tanpa re-render.
          </p>
        </Link>

        <Link
          href="/learn-lifecycle/02-function-component/05-useMemo"
          className="rounded-lg border border-zinc-300 p-4 transition hover:bg-zinc-50"
        >
          <p className="font-semibold">Latihan useMemo</p>
          <p className="text-sm text-zinc-600">
            Contoh hitungan memo (komputasi berat) dan filter data yang dimemoisasi.
          </p>
        </Link>
      </div>
    </main>
  );
}
