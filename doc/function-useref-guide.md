# useRef: Referensi DOM dan Nilai Mutable

`useRef` dipakai untuk menyimpan nilai yang tetap bertahan antar render tanpa memicu re-render saat nilainya berubah.

## Kegunaan Utama

1. Akses elemen DOM langsung (focus, scroll, select).
2. Simpan nilai mutable (counter internal, timer id, cache ringan).
3. Simpan nilai sebelumnya (previous value).

## Diagram Alur useRef

```mermaid
flowchart TD
    S([Start]) --> A[1. Component render]
    A --> B[2. useRef inisialisasi]
    B --> C[3. ref.current tersedia]
    C --> D{4. ref.current diubah?}
    D -- Ya --> E[5. Tidak trigger re-render]
    E --> Z([Finish])
    D -- Tidak --> F[5. Render normal]
    F --> G[6. State/props berubah]
    G --> A
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Pola Dasar

### 1. Ref ke DOM

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

const focusInput = () => {
  inputRef.current?.focus();
};
```

### 2. Menyimpan previous value

```tsx
const prevCountRef = useRef<number | null>(null);

useEffect(() => {
  prevCountRef.current = count;
}, [count]);
```

### 3. Menyimpan nilai mutable

```tsx
const renderCountRef = useRef(0);

useEffect(() => {
  renderCountRef.current += 1;
});
```

## Perbedaan `useState` vs `useRef`

| Hook | Saat berubah memicu re-render? | Cocok untuk |
| --- | --- | --- |
| `useState` | Ya | Data yang memengaruhi UI |
| `useRef` | Tidak | Referensi DOM / nilai internal |

## Checklist

- Gunakan `useRef` jika butuh data persisten tapi tidak perlu render ulang.
- Gunakan `useState` jika perubahan nilai harus tampil ke UI.
- Hindari menyimpan seluruh state UI di `useRef`.
