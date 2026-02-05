# Class Component - React Lifecycle

## Struktur Dasar Class Component

```tsx
import { Component } from "react";

interface Props {
  title: string;
}

interface State {
  count: number;Props
}

class MyComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);        // WAJIB dipanggil pertama
    this.state = {       // Initialize state
      count: 0
    };
  }

  render() {             // WAJIB ada, return JSX
    return <div>{this.props.title}</div>;
  }
}
```

---

## Mounting Lifecycle (Urutan Eksekusi)

| No | Method | Kapan Dipanggil |
|----|--------|-----------------|
| 1 | `constructor()` | Pertama kali, sebelum render |
| 2 | `getDerivedStateFromProps()` | Sebelum setiap render |
| 3 | `render()` | Saat React perlu render UI |
| 4 | `componentDidMount()` | Sekali, setelah component muncul di DOM |

---

## BOLEH & TIDAK BOLEH

### `constructor(props)`

| ✅ BOLEH | ❌ TIDAK BOLEH |
|----------|----------------|
| Initialize state | Fetch data / API call |
| Bind event handlers | Subscribe ke events |
| Set default values | Akses DOM |
| | Side effects apapun |
| | `setState()` |

```tsx
// ✅ BENAR
constructor(props) {
  super(props);
  this.state = { count: 0 };
  this.handleClick = this.handleClick.bind(this);
}

// ❌ SALAH
constructor(props) {
  super(props);
  fetch('/api/data');  // JANGAN!
  this.setState({});   // JANGAN!
}
```

---

### `getDerivedStateFromProps(props, state)`

| ✅ BOLEH | ❌ TIDAK BOLEH |
|----------|----------------|
| Return object untuk update state | Side effects |
| Return null jika tidak ada perubahan | Fetch data |
| Sync state dengan props | Akses `this` (karena static) |

```tsx
// ✅ BENAR
static getDerivedStateFromProps(props, state) {
  if (props.value !== state.prevValue) {
    return { value: props.value, prevValue: props.value };
  }
  return null;
}

// ❌ SALAH - tidak bisa akses this
static getDerivedStateFromProps(props, state) {
  this.fetchData();  // ERROR! ini static method
}
```

> ⚠️ **Jarang dipakai**. Biasanya ada cara lebih baik.

---

### `render()`

| ✅ BOLEH | ❌ TIDAK BOLEH |
|----------|----------------|
| Return JSX | `setState()` |
| Conditional rendering | Fetch data |
| Map array ke elements | Subscribe |
| | Modify DOM langsung |
| | Side effects apapun |

```tsx
// ✅ BENAR - render harus PURE
render() {
  return (
    <div>
      {this.state.loading ? "Loading..." : this.state.data}
    </div>
  );
}

// ❌ SALAH
render() {
  this.setState({ rendered: true });  // INFINITE LOOP!
  fetch('/api');  // JANGAN!
}
```

---

### `componentDidMount()`

| ✅ BOLEH | ❌ TIDAK BOLEH |
|----------|----------------|
| Fetch data dari API | `setState()` tanpa condition (bisa loop) |
| Subscribe ke WebSocket | Blocking synchronous operations |
| Setup event listeners | |
| Start timers/intervals | |
| Akses/manipulasi DOM | |
| Integrasi library third-party | |

```tsx
// ✅ BENAR
componentDidMount() {
  // Fetch data
  fetch('/api/users')
    .then(res => res.json())
    .then(data => this.setState({ users: data }));

  // Subscribe
  this.subscription = eventBus.subscribe(this.handleEvent);

  // Timer
  this.timer = setInterval(() => {
    this.setState(prev => ({ seconds: prev.seconds + 1 }));
  }, 1000);
}

// ❌ SALAH
componentDidMount() {
  while(true) { }  // Blocking!
  this.setState({ mounted: true }); // OK tapi tidak perlu
}
```

---

## Ringkasan Cepat

```
┌─────────────────────────────────────────────────────────────┐
│                    MOUNTING PHASE                           │
├─────────────────────────────────────────────────────────────┤
│  constructor()          →  Init state, bind methods         │
│         ↓                                                   │
│  getDerivedStateFromProps()  →  Sync props ke state        │
│         ↓                                                   │
│  render()               →  Return JSX (PURE!)               │
│         ↓                                                   │
│  componentDidMount()    →  Side effects, fetch, subscribe   │
└─────────────────────────────────────────────────────────────┘
```

## Tips Penting

1. **`super(props)` wajib di constructor** - Agar `this.props` bisa diakses
2. **State hanya di-assign langsung di constructor** - Setelahnya pakai `setState()`
3. **render() harus pure** - Tidak boleh ada side effects
4. **componentDidMount untuk side effects** - Tempat terbaik fetch data
5. **Selalu cleanup di componentWillUnmount** - Unsubscribe, clear timer
