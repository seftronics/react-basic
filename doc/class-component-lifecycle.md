# Class Component Lifecycle

Panduan ringkas lifecycle pada class component React.

## Urutan Dasar

1. Mounting
2. Updating
3. Unmounting
4. Error Handling (Error Boundary)

## Diagram Alur

```mermaid
flowchart TD
    S([Start]) --> A[1. constructor]
    A --> B[2. getDerivedStateFromProps]
    B --> C[3. render]
    C --> D[4. componentDidMount]
    D --> E{5. Ada update?}
    E -- Ya --> F[6. getDerivedStateFromProps]
    F --> G[7. shouldComponentUpdate]
    G --> H[8. render]
    H --> I[9. getSnapshotBeforeUpdate]
    I --> J[10. componentDidUpdate]
    J --> E
    E -- Unmount --> K[11. componentWillUnmount]
    K --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Mapping Cepat ke Hooks

| Class Lifecycle | Function Hooks |
| --- | --- |
| `componentDidMount` | `useEffect(..., [])` |
| `componentDidUpdate` | `useEffect(..., [deps])` |
| `componentWillUnmount` | cleanup pada `useEffect` |
| `shouldComponentUpdate` | `React.memo` / `useMemo` / `useCallback` |

## Catatan Praktis

- `render()` harus pure, tanpa side effect.
- Cleanup wajib di `componentWillUnmount()`.
- Gunakan class lifecycle jika memang butuh class component legacy.
