import Link from "next/link";

const MATERI = [
  {
    href: "/learn-lifecycle/lifecycle-hooks",
    title: "Demo Lifecycle Hooks",
    desc: "Mount, update, dan unmount pada parent-child component.",
  },
  {
    href: "/learn-lifecycle/02-function-component/01-useState",
    title: "Latihan useState",
    desc: "State dasar, render ulang, dan unmount demo.",
  },
  {
    href: "/learn-lifecycle/02-function-component/02-useEffect",
    title: "Latihan useEffect",
    desc: "Dependency, debounce, interval, dan cleanup.",
  },
  {
    href: "/learn-lifecycle/02-function-component/04-useRef",
    title: "Latihan useRef",
    desc: "Akses DOM, mutable value, dan previous value.",
  },
  {
    href: "/learn-lifecycle/02-function-component/05-useMemo",
    title: "Latihan useMemo",
    desc: "Optimasi hitungan berat dan memoized filter.",
  },
];

export default function LearnLifecycleIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Isi Materi Lifecycle</h1>
        <Link className="text-sm text-blue-600 underline" href="/">
          Kembali ke Home
        </Link>
      </div>

      <p className="text-sm text-zinc-600">
        Pilih materi yang ingin dipresentasikan atau dipelajari.
      </p>

      <div className="flex flex-col gap-3">
        {MATERI.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-zinc-300 p-4 transition hover:bg-zinc-50"
          >
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-zinc-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
