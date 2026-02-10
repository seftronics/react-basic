# useMemo untuk Optimasi

`useMemo` menyimpan hasil komputasi agar tidak dihitung ulang di setiap render.

## Kapan Perlu

- Kalkulasi berat.
- Filter/sort data besar.
- Menjaga nilai turunan tetap stabil.

## Diagram useMemo

```mermaid
flowchart TD
    A[Render] --> B{Dependency berubah?}
    B -- Ya --> C[Hitung ulang callback]
    C --> D[Simpan hasil ke cache]
    B -- Tidak --> E[Ambil dari cache]
    D --> F[Return value]
    E --> F
```

## Lifecycle `useMemo`: Mounting, Updating, Unmounting

### 1. Mounting

Saat komponen pertama kali render, callback `useMemo` dieksekusi untuk membuat nilai awal.

```mermaid
flowchart TD
    A[Component mount] --> B[Render pertama]
    B --> C[useMemo callback dijalankan]
    C --> D[Hasil disimpan di cache]
    D --> E[UI tampil]
```

### 2. Updating

Saat re-render, React membandingkan dependency:
- Jika berubah: callback dijalankan ulang.
- Jika sama: nilai diambil dari cache.

```mermaid
flowchart TD
    A[State / Props berubah] --> B[Re-render]
    B --> C{Dependency useMemo berubah?}
    C -- Ya --> D[Recompute callback]
    D --> E[Update cache]
    C -- Tidak --> F[Pakai nilai cache]
    E --> G[Render UI]
    F --> G
```

### 3. Unmounting

Saat komponen unmount, cache `useMemo` ikut dibuang bersama instance komponen.

```mermaid
flowchart TD
    A[Component unmount] --> B[Instance dihapus]
    B --> C[Cache useMemo dibuang]
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
