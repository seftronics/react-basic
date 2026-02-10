# Updating Lifecycle (Class Component)

Fase updating berjalan saat props atau state berubah.

## Pemicu Update

1. Props baru dari parent.
2. `setState()` dipanggil.
3. `forceUpdate()` dipanggil.

## Urutan Updating

1. `getDerivedStateFromProps`
2. `shouldComponentUpdate`
3. `render`
4. `getSnapshotBeforeUpdate`
5. `componentDidUpdate`

## Diagram Updating

```mermaid
flowchart TD
    S([Start]) --> A[1. Props / State berubah]
    A --> B[2. getDerivedStateFromProps]
    B --> C[3. shouldComponentUpdate]
    C -->|false| D[4a. Skip render]
    D --> Z([Finish])
    C -->|true| E[4b. render]
    E --> F[5. getSnapshotBeforeUpdate]
    F --> G[6. Commit DOM]
    G --> H[7. componentDidUpdate]
    H --> Z
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Kapan Pakai Method Ini

- `shouldComponentUpdate`: optimasi render.
- `getSnapshotBeforeUpdate`: baca data DOM lama sebelum commit.
- `componentDidUpdate`: side effect setelah update (misalnya fetch berdasarkan props baru).

## Contoh Guard di componentDidUpdate

```tsx
componentDidUpdate(prevProps: Props) {
  if (prevProps.userId !== this.props.userId) {
    this.fetchUser(this.props.userId);
  }
}
```
