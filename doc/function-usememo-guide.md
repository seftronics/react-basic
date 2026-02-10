# useMemo untuk Optimasi

`useMemo` menyimpan hasil komputasi agar tidak dihitung ulang di setiap render.

## Kapan Perlu

- Kalkulasi berat.
- Filter/sort data besar.
- Menjaga nilai turunan tetap stabil.

## Diagram useMemo

```mermaid
flowchart TD
    S([Start]) --> A[1. Render]
    A --> B{2. Dependency berubah?}
    B -- Ya --> C[3. Hitung ulang callback]
    C --> D[4. Simpan hasil ke cache]
    B -- Tidak --> E[3. Ambil dari cache]
    D --> F[5. Return value]
    E --> F
    F --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Lifecycle `useMemo`: Mounting, Updating, Unmounting

### 1. Mounting

Saat komponen pertama kali render, callback `useMemo` dieksekusi untuk membuat nilai awal.

```mermaid
flowchart TD
    S([Start]) --> A[1. Component mount]
    A --> B[2. Render pertama]
    B --> C[3. useMemo callback dijalankan]
    C --> D[4. Hasil disimpan di cache]
    D --> E[5. UI tampil]
    E --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

### 2. Updating

Saat re-render, React membandingkan dependency:
- Jika berubah: callback dijalankan ulang.
- Jika sama: nilai diambil dari cache.

```mermaid
flowchart TD
    S([Start]) --> A[1. State / Props berubah]
    A --> B[2. Re-render]
    B --> C{3. Dependency useMemo berubah?}
    C -- Ya --> D[4. Recompute callback]
    D --> E[5. Update cache]
    C -- Tidak --> F[4. Pakai nilai cache]
    E --> G[6. Render UI]
    F --> G
    G --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

### 3. Unmounting

Saat komponen unmount, cache `useMemo` ikut dibuang bersama instance komponen.

```mermaid
flowchart TD
    S([Start]) --> A[1. Component unmount]
    A --> B[2. Instance dihapus]
    B --> C[3. Cache useMemo dibuang]
    C --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Penjelasan Praktis

- `useMemo` bukan pengganti state, tapi cache perhitungan.
- `useMemo` hanya membantu performa jika komputasinya memang cukup mahal.
- Dependency harus benar agar hasil tidak stale.
- Ketika komponen di-mount ulang, cache dihitung dari awal lagi.

## Contoh

```tsx
const filteredUsers = useMemo(() => {
  return users.filter((u) => u.name.includes(keyword));
}, [users, keyword]);
```

## Catatan

- Jangan pakai `useMemo` untuk semua hal.
- Nilai sederhana biasanya tidak butuh memo.
- Dependency harus benar, kalau tidak hasil bisa stale.
