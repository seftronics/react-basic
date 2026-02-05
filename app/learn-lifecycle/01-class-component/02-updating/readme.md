# Updating Lifecycle - Penjelasan Proses

## Kapan Updating Terjadi?

Updating terjadi ketika:
1. **Props berubah** - Parent component mengirim props baru
2. **State berubah** - `this.setState()` dipanggil
3. **forceUpdate()** - Memaksa re-render

---

## Alur Proses Updating (5 Methods)

```
┌─────────────────────────────────────────────────────────────────┐
│                     UPDATING LIFECYCLE                          │
│            (Props atau State berubah)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🟡 1. getDerivedStateFromProps(props, state)                   │
│     ├── Menerima: props (baru), state (sekarang)                │
│     └── Return: object untuk update state, atau null            │
│                         ↓                                       │
│  🟠 2. shouldComponentUpdate(nextProps, nextState)              │
│     ├── Menerima: nextProps, nextState                          │
│     ├── Akses: this.props (current), this.state (current)       │
│     └── Return: true (lanjut render) / false (skip)             │
│                         ↓                                       │
│           [Jika return false, STOP di sini]                     │
│                         ↓                                       │
│  🟢 3. render()                                                 │
│     └── Return: JSX (Virtual DOM baru)                          │
│                         ↓                                       │
│  🔵 4. getSnapshotBeforeUpdate(prevProps, prevState)            │
│     ├── Menerima: prevProps, prevState                          │
│     ├── Akses: this.props (new), this.state (new)               │
│     ├── DOM masih yang LAMA                                     │
│     └── Return: snapshot (dikirim ke componentDidUpdate)        │
│                         ↓                                       │
│              [DOM di-update oleh React]                         │
│                         ↓                                       │
│  🔴 5. componentDidUpdate(prevProps, prevState, snapshot)       │
│     ├── Menerima: prevProps, prevState, snapshot                │
│     ├── Akses: this.props (new), this.state (new)               │
│     └── DOM sudah yang BARU                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detail Setiap Method

### 1. getDerivedStateFromProps(props, state)

```tsx
static getDerivedStateFromProps(props: Props, state: State) {
    // Menerima:
    // - props: props BARU dari parent
    // - state: state SEKARANG (sebelum update)

    // Return:
    // - object: untuk merge ke state
    // - null: tidak ada perubahan

    return null;
}
```

| Yang Dibawa | Nilai |
|-------------|-------|
| `props` | Props baru dari parent |
| `state` | State sekarang (sebelum update) |
| `this` | ❌ Tidak bisa (static method) |

---

### 2. shouldComponentUpdate(nextProps, nextState)

```tsx
shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    // Menerima:
    // - nextProps: props yang AKAN dipakai
    // - nextState: state yang AKAN dipakai

    // Bisa akses:
    // - this.props: props SEKARANG
    // - this.state: state SEKARANG

    // Contoh: Skip render jika count tidak berubah
    if (this.state.count === nextState.count) {
        return false; // Skip render
    }

    return true; // Lanjut render
}
```

| Yang Dibawa | Nilai |
|-------------|-------|
| `nextProps` | Props yang akan dipakai |
| `nextState` | State yang akan dipakai |
| `this.props` | Props sekarang (sebelum update) |
| `this.state` | State sekarang (sebelum update) |

**Use Case:** Optimasi performa dengan skip unnecessary renders.

---

### 3. render()

```tsx
render() {
    // Akses:
    // - this.props: props BARU
    // - this.state: state BARU

    return <div>{this.state.count}</div>;
}
```

| Yang Dibawa | Nilai |
|-------------|-------|
| `this.props` | Props baru |
| `this.state` | State baru |

---

### 4. getSnapshotBeforeUpdate(prevProps, prevState)

```tsx
getSnapshotBeforeUpdate(prevProps: Props, prevState: State): any {
    // Menerima:
    // - prevProps: props SEBELUMNYA
    // - prevState: state SEBELUMNYA

    // Akses:
    // - this.props: props BARU
    // - this.state: state BARU
    // - DOM: masih yang LAMA!

    // Return: nilai apapun (dikirim ke componentDidUpdate)

    // Contoh: Capture scroll position
    return this.listRef.scrollHeight;
}
```

| Yang Dibawa | Nilai |
|-------------|-------|
| `prevProps` | Props sebelumnya |
| `prevState` | State sebelumnya |
| `this.props` | Props baru |
| `this.state` | State baru |
| `DOM` | Masih LAMA (belum update) |
| `return` | Snapshot → componentDidUpdate |

**Use Case:** Capture scroll position, element dimensions sebelum DOM berubah.

---

### 5. componentDidUpdate(prevProps, prevState, snapshot)

```tsx
componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    // Menerima:
    // - prevProps: props SEBELUMNYA
    // - prevState: state SEBELUMNYA
    // - snapshot: nilai dari getSnapshotBeforeUpdate

    // Akses:
    // - this.props: props BARU
    // - this.state: state BARU
    // - DOM: sudah BARU!

    // Contoh: Fetch data jika userId berubah
    if (prevProps.userId !== this.props.userId) {
        this.fetchUser(this.props.userId);
    }

    // Contoh: Gunakan snapshot untuk scroll
    if (snapshot !== null) {
        this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
    }
}
```

| Yang Dibawa | Nilai |
|-------------|-------|
| `prevProps` | Props sebelumnya |
| `prevState` | State sebelumnya |
| `snapshot` | Nilai dari getSnapshotBeforeUpdate |
| `this.props` | Props baru |
| `this.state` | State baru |
| `DOM` | Sudah BARU |

**Use Case:** Fetch data berdasarkan perubahan, DOM manipulation setelah update.

---

## Diagram Visual

### Flowchart shouldComponentUpdate

```
                    ┌──────────────────┐
                    │  Props / State   │
                    │    Berubah       │
                    └────────┬─────────┘
                             ↓
              ┌──────────────────────────────┐
              │  getDerivedStateFromProps()  │
              └──────────────┬───────────────┘
                             ↓
              ┌──────────────────────────────┐
              │   shouldComponentUpdate()    │
              │   nextProps vs this.props    │
              │   nextState vs this.state    │
              └──────────────┬───────────────┘
                             │
            ┌────────────────┴────────────────┐
            │                                 │
            ↓                                 ↓
     ┌─────────────┐                  ┌─────────────┐
     │ return TRUE │                  │return FALSE │
     └──────┬──────┘                  └──────┬──────┘
            │                                 │
            ↓                                 ↓
     ┌─────────────┐                  ┌─────────────┐
     │   render()  │                  │    STOP     │
     │      ↓      │                  │  (skip all) │
     │ getSnapshot │                  └─────────────┘
     │      ↓      │
     │ [DOM Update]│
     │      ↓      │
     │ didUpdate() │
     └─────────────┘
```

### Timeline Diagram

```
TIME ──────────────────────────────────────────────────────────────────►

     setState() dipanggil
           │
           ▼
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│getDerived│ should   │  render  │ getSnap  │   DOM    │component │
│StateFrom │Component │    ()    │ shotBe-  │  UPDATE  │DidUpdate │
│Props     │ Update   │          │foreUpdate│          │    ()    │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ props:   │this.props│this.props│prevProps │          │prevProps │
│  NEW     │  OLD     │  NEW     │  OLD     │          │  OLD     │
│ state:   │this.state│this.state│prevState │          │prevState │
│  OLD     │  OLD     │  NEW     │  OLD     │          │  OLD     │
│          │nextProps │          │this.props│          │this.props│
│          │  NEW     │          │  NEW     │          │  NEW     │
│          │nextState │          │this.state│          │this.state│
│          │  NEW     │          │  NEW     │          │  NEW     │
│          │          │          │ DOM:OLD  │          │ DOM:NEW  │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
                                      │           │
                                      └─────┬─────┘
                                            │
                                      snapshot value
                                      dikirim ke sini
```

### Diagram Perubahan State

```
SEBELUM setState()              SESUDAH setState()
┌─────────────────────┐         ┌─────────────────────┐
│ this.state = {      │         │ this.state = {      │
│   count: 0,    ─────┼────────►│   count: 1,         │
│   name: "John"      │         │   name: "John"      │
│ }                   │         │ }                   │
└─────────────────────┘         └─────────────────────┘
         │                               │
         │    shouldComponentUpdate      │
         │    ┌─────────────────────┐    │
         └───►│ this.state.count: 0 │    │
              │ nextState.count: 1  │◄───┘
              │ Berbeda? YES        │
              │ return TRUE ────────┼───► Lanjut render
              └─────────────────────┘
```

### Diagram getSnapshotBeforeUpdate

```
                    render() selesai
                          │
                          ▼
         ┌────────────────────────────────┐
         │    getSnapshotBeforeUpdate()   │
         │                                │
         │  ┌──────────────────────────┐  │
         │  │ DOM masih LAMA           │  │
         │  │ ┌────────────────────┐   │  │
         │  │ │ <ul>               │   │  │
         │  │ │   <li>Item 1</li>  │   │  │
         │  │ │   <li>Item 2</li>  │   │  │
         │  │ │ </ul>              │   │  │
         │  │ │ scrollHeight: 100  │   │  │
         │  │ └────────────────────┘   │  │
         │  └──────────────────────────┘  │
         │                                │
         │  return scrollHeight; // 100   │
         └───────────────┬────────────────┘
                         │
                         ▼ snapshot = 100
         ┌────────────────────────────────┐
         │         DOM UPDATE             │
         │  ┌──────────────────────────┐  │
         │  │ <ul>                     │  │
         │  │   <li>Item 1</li>        │  │
         │  │   <li>Item 2</li>        │  │
         │  │   <li>Item 3</li> ← NEW  │  │
         │  │ </ul>                    │  │
         │  │ scrollHeight: 150        │  │
         │  └──────────────────────────┘  │
         └───────────────┬────────────────┘
                         │
                         ▼
         ┌────────────────────────────────┐
         │      componentDidUpdate()      │
         │  snapshot = 100                │
         │  scrollHeight = 150            │
         │                                │
         │  // Auto scroll ke item baru   │
         │  scrollTop = 150 - 100 = 50    │
         └────────────────────────────────┘
```

### Perbandingan 3 Cara Trigger Update

```
┌─────────────────────────────────────────────────────────────────┐
│                    3 CARA TRIGGER UPDATE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. setState()                                                  │
│     ┌─────────────────┐      ┌─────────────────┐                │
│     │ this.setState({ │ ───► │ State berubah   │                │
│     │   count: 1      │      │ Trigger update  │                │
│     │ })              │      └─────────────────┘                │
│     └─────────────────┘                                         │
│                                                                 │
│  2. Props dari Parent                                           │
│     ┌─────────────────┐      ┌─────────────────┐                │
│     │ <Child          │ ───► │ Props berubah   │                │
│     │   theme="dark"  │      │ Trigger update  │                │
│     │ />              │      └─────────────────┘                │
│     └─────────────────┘                                         │
│                                                                 │
│  3. forceUpdate()                                               │
│     ┌─────────────────┐      ┌─────────────────┐                │
│     │ this.force      │ ───► │ SKIP shouldCom- │                │
│     │   Update()      │      │ ponentUpdate!   │                │
│     └─────────────────┘      └─────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mounting vs Updating

```
┌───────────────────────────────┬───────────────────────────────┐
│         MOUNTING              │           UPDATING            │
│    (Component dibuat)         │    (Props/State berubah)      │
├───────────────────────────────┼───────────────────────────────┤
│                               │                               │
│  ┌─────────────────────┐      │                               │
│  │    constructor()    │      │                               │
│  └──────────┬──────────┘      │                               │
│             │                 │                               │
│             ▼                 │             ▼                 │
│  ┌─────────────────────┐      │  ┌─────────────────────┐      │
│  │ getDerivedState     │◄─────┼─►│ getDerivedState     │      │
│  │ FromProps()         │      │  │ FromProps()         │      │
│  └──────────┬──────────┘      │  └──────────┬──────────┘      │
│             │                 │             │                 │
│             │                 │             ▼                 │
│             │                 │  ┌─────────────────────┐      │
│             │                 │  │shouldComponentUpdate│      │
│             │                 │  └──────────┬──────────┘      │
│             │                 │             │                 │
│             ▼                 │             ▼                 │
│  ┌─────────────────────┐      │  ┌─────────────────────┐      │
│  │      render()       │◄─────┼─►│      render()       │      │
│  └──────────┬──────────┘      │  └──────────┬──────────┘      │
│             │                 │             │                 │
│             │                 │             ▼                 │
│             │                 │  ┌─────────────────────┐      │
│             │                 │  │getSnapshotBefore    │      │
│             │                 │  │Update()             │      │
│             │                 │  └──────────┬──────────┘      │
│             │                 │             │                 │
│             ▼                 │             ▼                 │
│  ┌─────────────────────┐      │  ┌─────────────────────┐      │
│  │ componentDidMount() │      │  │componentDidUpdate() │      │
│  └─────────────────────┘      │  └─────────────────────┘      │
│                               │                               │
└───────────────────────────────┴───────────────────────────────┘
```

---

## Contoh Console Output

### Saat klik Increment (state berubah):

```
🟡 1. getDerivedStateFromProps { props: {theme: "light"}, stateCount: 1 }
🟠 2. shouldComponentUpdate { currentCount: 0, nextCount: 1 }
🟢 3. RENDER
🔵 4. getSnapshotBeforeUpdate { prevCount: 0, currentCount: 1 }
🔴 5. componentDidUpdate { prevCount: 0, currentCount: 1, snapshot: null }
```

### Saat Toggle Theme (props berubah):

```
🟡 1. getDerivedStateFromProps { props: {theme: "dark"}, stateCount: 1 }
🟠 2. shouldComponentUpdate { currentTheme: "light", nextTheme: "dark" }
🟢 3. RENDER
🔵 4. getSnapshotBeforeUpdate { prevTheme: "light", currentTheme: "dark" }
🔴 5. componentDidUpdate { ... }
🎨 Theme changed: light → dark
```

### Saat shouldComponentUpdate return false:

```
🟡 1. getDerivedStateFromProps { props: {theme: "light"}, stateCount: 3 }
🟠 2. shouldComponentUpdate { currentCount: 2, nextCount: 3 }
⏭️ SKIP RENDER (count kelipatan 3)
[STOP - tidak ada render, getSnapshotBeforeUpdate, componentDidUpdate]
```

---

## Diagram Perbandingan Data

```
                    ┌─────────────────┬─────────────────┐
                    │    SEBELUM      │     SESUDAH     │
┌───────────────────┼─────────────────┼─────────────────┤
│ getDerived...     │ state (param)   │ props (param)   │
├───────────────────┼─────────────────┼─────────────────┤
│ shouldComponent   │ this.props      │ nextProps       │
│                   │ this.state      │ nextState       │
├───────────────────┼─────────────────┼─────────────────┤
│ render            │        -        │ this.props      │
│                   │        -        │ this.state      │
├───────────────────┼─────────────────┼─────────────────┤
│ getSnapshot...    │ prevProps       │ this.props      │
│                   │ prevState       │ this.state      │
│                   │ DOM (lama)      │        -        │
├───────────────────┼─────────────────┼─────────────────┤
│ componentDidUpdate│ prevProps       │ this.props      │
│                   │ prevState       │ this.state      │
│                   │        -        │ DOM (baru)      │
└───────────────────┴─────────────────┴─────────────────┘
```

---

## BOLEH & TIDAK BOLEH

| Method | ✅ BOLEH | ❌ TIDAK BOLEH |
|--------|----------|----------------|
| `getDerivedStateFromProps` | Return state baru | Side effects, akses this |
| `shouldComponentUpdate` | Bandingkan props/state | setState, side effects |
| `render` | Return JSX | setState, side effects |
| `getSnapshotBeforeUpdate` | Baca DOM, return snapshot | setState |
| `componentDidUpdate` | setState (dengan kondisi!), fetch, DOM | setState tanpa kondisi (infinite loop!) |

### ⚠️ Warning: Infinite Loop

```tsx
// ❌ SALAH - Infinite loop!
componentDidUpdate() {
    this.setState({ count: this.state.count + 1 });
}

// ✅ BENAR - Dengan kondisi
componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
        this.setState({ user: null });
        this.fetchUser(this.props.userId);
    }
}
```

---

## Ringkasan

| No | Method | Menerima | Return | DOM |
|----|--------|----------|--------|-----|
| 1 | `getDerivedStateFromProps` | props, state | state/null | - |
| 2 | `shouldComponentUpdate` | nextProps, nextState | boolean | - |
| 3 | `render` | - | JSX | - |
| 4 | `getSnapshotBeforeUpdate` | prevProps, prevState | snapshot | LAMA |
| 5 | `componentDidUpdate` | prevProps, prevState, snapshot | - | BARU |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                    UPDATING CHEAT SHEET                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  getDerivedStateFromProps(props, state)                         │
│  ├── props = BARU    state = LAMA                               │
│  └── return: state object atau null                             │
│                                                                 │
│  shouldComponentUpdate(nextProps, nextState)                    │
│  ├── this.props = LAMA    nextProps = BARU                      │
│  ├── this.state = LAMA    nextState = BARU                      │
│  └── return: true (render) atau false (skip)                    │
│                                                                 │
│  render()                                                       │
│  ├── this.props = BARU                                          │
│  └── this.state = BARU                                          │
│                                                                 │
│  getSnapshotBeforeUpdate(prevProps, prevState)                  │
│  ├── prevProps = LAMA     this.props = BARU                     │
│  ├── prevState = LAMA     this.state = BARU                     │
│  ├── DOM = LAMA (belum update)                                  │
│  └── return: snapshot → componentDidUpdate                      │
│                                                                 │
│  componentDidUpdate(prevProps, prevState, snapshot)             │
│  ├── prevProps = LAMA     this.props = BARU                     │
│  ├── prevState = LAMA     this.state = BARU                     │
│  ├── DOM = BARU (sudah update)                                  │
│  └── snapshot dari getSnapshotBeforeUpdate                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
