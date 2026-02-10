# useEffect: Side Effect dan Cleanup

`useEffect` dipakai untuk menjalankan side effect setelah render.

## Pola Eksekusi

- `useEffect(..., [])`: saat mount.
- `useEffect(..., [dep])`: saat mount + setiap `dep` berubah.
- `useEffect(...)`: setiap render.

## Diagram useEffect

```mermaid
flowchart TD
    S([Start]) --> A[1. Render]
    A --> B[2. Commit DOM]
    B --> C[3. Effect berjalan]
    C --> D{4. Dependency berubah?}
    D -- Ya --> E[5. Cleanup effect lama]
    E --> A
    D -- Unmount --> F[5. Cleanup terakhir]
    F --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Contoh Cleanup

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

## Checklist

- Selalu cleanup listener/timer/subscription.
- Dependency harus lengkap.
- Hindari race condition untuk request async (pakai `AbortController`).
