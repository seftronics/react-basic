# useState dan Lifecycle Render

`useState` menyimpan state lokal di function component.

## Alur Singkat

1. Render dipanggil.
2. `useState` memberi nilai state saat ini.
3. UI dirender.
4. Saat `setState` dipanggil, React menjadwalkan re-render.

## Diagram Render + useState

```mermaid
flowchart TD
    S([Start]) --> A[1. Component render]
    A --> B[2. useState baca nilai]
    B --> C[3. Return JSX]
    C --> D[4. Commit DOM]
    D --> E{5. setState dipanggil?}
    E -- Ya --> A
    E -- Tidak --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Contoh

```tsx
const [count, setCount] = useState(0);

<button onClick={() => setCount((c) => c + 1)}>Tambah</button>
```

## Catatan

- Update state bersifat async.
- Gunakan functional update jika nilai baru tergantung nilai lama.
