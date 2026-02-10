import Link from "next/link";

const docs = [
  { path: "doc/react-lifecycle-overview.md", title: "Gambaran besar lifecycle React" },
  { path: "doc/lifecycle-hooks-cheat-sheet.md", title: "Ringkasan hooks lifecycle" },
  { path: "doc/class-component-lifecycle.md", title: "Lifecycle class component" },
  { path: "doc/class-component-mounting.md", title: "Fase mounting class component" },
  { path: "doc/class-component-updating.md", title: "Fase updating class component" },
  { path: "doc/function-usestate-lifecycle.md", title: "Lifecycle render dengan useState" },
  { path: "doc/function-useeffect-guide.md", title: "useEffect + cleanup" },
  { path: "doc/function-useref-guide.md", title: "Panduan useRef" },
  { path: "doc/function-usememo-guide.md", title: "Panduan useMemo" },
];

export default function DocsIndexPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dokumentasi Presentasi</h1>
        <div className="flex items-center gap-4">
          <Link className="text-sm text-blue-600 underline" href="/learn-lifecycle">
            Back ke Materi
          </Link>
          <Link className="text-sm text-blue-600 underline" href="/">
            Home
          </Link>
        </div>
      </div>

      <p className="text-sm text-zinc-600">
        Sumber utama: <code>doc/README.md</code>. Daftar ini mengikuti urutan presentasi.
      </p>

      <div className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-3 text-lg font-semibold">Daftar Dokumen</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-700">
          {docs.map((item) => (
            <li key={item.path}>
              <span className="font-medium">{item.title}</span>
              <div>
                <code>{item.path}</code>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-lg border border-zinc-300 p-4">
        <h2 className="mb-3 text-lg font-semibold">Demo App</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>
            <code>/learn-lifecycle</code>
          </li>
          <li>
            <code>/learn-lifecycle/lifecycle-hooks</code>
          </li>
          <li>
            <code>/learn-lifecycle/02-function-component/01-useState</code>
          </li>
          <li>
            <code>/learn-lifecycle/02-function-component/02-useEffect</code>
          </li>
          <li>
            <code>/learn-lifecycle/02-function-component/04-useRef</code>
          </li>
          <li>
            <code>/learn-lifecycle/02-function-component/05-useMemo</code>
          </li>
        </ul>
      </div>
    </main>
  );
}
