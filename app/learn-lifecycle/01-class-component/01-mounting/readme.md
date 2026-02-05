# Mounting Lifecycle - Penjelasan Proses

## Alur Proses Mounting

```
┌─────────────────────────────────────────────────────────────────┐
│                    INITIAL MOUNTING                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔵 1. CONSTRUCTOR                                              │
│     ├── Menerima: props                                         │
│     ├── Membuat: this.state = { user: null, loading: true }     │
│     └── Output: Component instance siap                         │
│                         ↓                                       │
│  🟡 2. getDerivedStateFromProps(props, state)                   │
│     ├── Menerima: props = { userId: 1 }                         │
│     ├── Menerima: state = { user: null, loading: true }         │
│     └── Output: null (tidak ada perubahan state)                │
│                         ↓                                       │
│  🟢 3. RENDER                                                   │
│     ├── Membaca: this.state.loading = true                      │
│     ├── Membaca: this.state.user = null                         │
│     └── Output: JSX dengan "⏳ Loading..."                       │
│                         ↓                                       │
│  🔴 4. COMPONENTDIDMOUNT                                        │
│     ├── Component sudah ada di DOM                              │
│     ├── Memanggil: this.setState({ user: {...}, loading: false })│
│     └── Output: Trigger re-render                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                    UPDATE (karena setState)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🟡 getDerivedStateFromProps(props, state)                      │
│     ├── Menerima: props = { userId: 1 }                         │
│     ├── Menerima: state = { user: {...}, loading: false }       │
│     └── Output: null                                            │
│                         ↓                                       │
│  🟢 RENDER                                                      │
│     ├── Membaca: this.state.loading = false                     │
│     ├── Membaca: this.state.user = { id, name, email }          │
│     └── Output: JSX dengan data user                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Console Output

```
🔵 1. CONSTRUCTOR
🟡 2. getDerivedStateFromProps { props: { userId: 1 }, state: { user: null, loading: true } }
🟢 3. RENDER
🔴 4. COMPONENTDIDMOUNT
🟡 2. getDerivedStateFromProps { props: { userId: 1 }, state: { user: {...}, loading: false } }
🟢 3. RENDER
```

---

## Penjelasan setState

### Apa yang terjadi saat `this.setState()` dipanggil?

```tsx
componentDidMount() {
    this.setState({
        user: { id: 1, name: "John Doe", email: "john@example.com" },
        loading: false,
    });
}
```

### Proses Internal:

| Step | Proses | Penjelasan |
|------|--------|------------|
| 1 | `setState()` dipanggil | React menerima object baru |
| 2 | State di-merge | `{ user: null, loading: true }` + `{ user: {...}, loading: false }` |
| 3 | State baru | `{ user: { id: 1, ... }, loading: false }` |
| 4 | getDerivedStateFromProps | Dipanggil dengan state baru |
| 5 | render() | Dipanggil ulang dengan state baru |
| 6 | DOM di-update | React update DOM yang berubah saja |

### Penting tentang setState:

```tsx
// ❌ SALAH - setState adalah ASYNCHRONOUS
this.setState({ count: 1 });
console.log(this.state.count); // Masih nilai lama!

// ✅ BENAR - Gunakan callback
this.setState({ count: 1 }, () => {
    console.log(this.state.count); // Nilai baru
});

// ✅ BENAR - Gunakan functional update untuk depend on previous state
this.setState((prevState) => ({
    count: prevState.count + 1
}));
```

---

## Data Flow Diagram

```
    PROPS (dari parent)              STATE (internal)
          │                                │
          ▼                                ▼
    ┌─────────────────────────────────────────────┐
    │              constructor(props)              │
    │  • super(props)                              │
    │  • this.state = { user: null, loading: true }│
    └─────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │    getDerivedStateFromProps(props, state)    │
    │  • props: { userId: 1 }                      │
    │  • state: { user: null, loading: true }      │
    │  • return: null (no change)                  │
    └─────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │                  render()                    │
    │  • this.props.userId → 1                     │
    │  • this.state.loading → true                 │
    │  • this.state.user → null                    │
    │  • OUTPUT: "⏳ Loading..."                    │
    └─────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │            componentDidMount()               │
    │  • Component sudah di DOM                    │
    │  • this.setState({                           │
    │      user: { id: 1, name: "John", ... },     │
    │      loading: false                          │
    │    })                                        │
    └─────────────────────────────────────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │   RE-RENDER  │
                   └──────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │    getDerivedStateFromProps(props, state)    │
    │  • state: { user: {...}, loading: false }    │
    └─────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────────┐
    │                  render()                    │
    │  • this.state.loading → false                │
    │  • this.state.user → { id, name, email }     │
    │  • OUTPUT: User Profile data                 │
    └─────────────────────────────────────────────┘
```

---

## Ringkasan

| Method | Menerima | Menghasilkan |
|--------|----------|--------------|
| `constructor` | props | this.state (initial) |
| `getDerivedStateFromProps` | props, state | state baru atau null |
| `render` | - | JSX (Virtual DOM) |
| `componentDidMount` | - | Side effects (fetch, subscribe) |
| `setState` | object/function | Trigger re-render |
