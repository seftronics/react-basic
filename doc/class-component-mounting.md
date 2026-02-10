# Mounting Lifecycle (Class Component)

Fase mounting terjadi saat class component pertama kali dibuat dan dipasang ke DOM.

## Urutan Mounting

1. `constructor(props)`
2. `getDerivedStateFromProps(props, state)`
3. `render()`
4. `componentDidMount()`

## Diagram Mounting

```mermaid
flowchart TD
    S([Start]) --> A[1. constructor]
    A --> B[2. getDerivedStateFromProps]
    B --> C[3. render]
    C --> D[4. Commit DOM]
    D --> E[5. componentDidMount]
    E --> F[6. Side effects: fetch, subscribe, timer]
    F --> Z([Finish])
    classDef default fill:#eff6ff,stroke:#2563eb,stroke-width:1.5px,color:#1e3a8a;
    classDef start fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#166534;
    classDef finish fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#991b1b;
    class S start;
    class Z finish;
```

## Boleh dan Tidak Boleh

- `constructor`: inisialisasi state, bind method.
- `render`: hanya return JSX.
- `componentDidMount`: tempat side effects setelah DOM siap.

## Contoh Singkat

```tsx
class UserPage extends Component<{}, { loading: boolean }> {
  state = { loading: true };

  componentDidMount() {
    // aman untuk fetch
    this.setState({ loading: false });
  }

  render() {
    return <div>{this.state.loading ? "Loading..." : "Ready"}</div>;
  }
}
```
