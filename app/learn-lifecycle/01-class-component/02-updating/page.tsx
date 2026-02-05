"use client";

import { Component, createRef } from "react";

// ===========================================
// UPDATING LIFECYCLE (5 Methods)
// Dipanggil saat props/state berubah
// Urutan: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
// ===========================================

interface Props {
    theme: "light" | "dark";
}

interface State {
    count: number;
    messages: string[];
}

class Counter extends Component<Props, State> {
    private listRef = createRef<HTMLUListElement>();

    constructor(props: Props) {
        super(props);
        console.log("🔵 CONSTRUCTOR (hanya saat mounting)");

        this.state = {
            count: 0,
            messages: ["Pesan awal"],
        };
    }

    // ===========================================
    // 1. getDerivedStateFromProps (static)
    // - Dipanggil SETIAP render (mounting & updating)
    // - Menerima: props (baru), state (sekarang)
    // - Return: object untuk update state, atau null
    // ===========================================
    static getDerivedStateFromProps(props: Props, state: State) {
        console.log("🟡 1. getDerivedStateFromProps", {
            props,
            stateCount: state.count,
        });
        return null;
    }

    // ===========================================
    // 2. shouldComponentUpdate
    // - Dipanggil SEBELUM render (hanya saat updating)
    // - Menerima: nextProps, nextState
    // - Return: true (render) atau false (skip render)
    // - Untuk optimasi performa
    // ===========================================
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        console.log("🟠 2. shouldComponentUpdate", {
            currentCount: this.state.count,
            nextCount: nextState.count,
            currentTheme: this.props.theme,
            nextTheme: nextProps.theme,
        });

        // Contoh: Skip render jika count kelipatan 3
        if (nextState.count % 3 === 0 && nextState.count !== 0) {
            console.log("⏭️ SKIP RENDER (count kelipatan 3)");
            return false;
        }

        return true;
    }

    // ===========================================
    // 3. RENDER
    // - Return JSX
    // ===========================================
    render() {
        console.log("🟢 3. RENDER");
        const { count, messages } = this.state;
        const { theme } = this.props;

        const bgColor = theme === "dark" ? "#333" : "#fff";
        const textColor = theme === "dark" ? "#fff" : "#333";

        return (
            <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "700px", backgroundColor: bgColor, color: textColor }}>
                <h1>UPDATING Lifecycle</h1>
                <p style={{ opacity: 0.7 }}>Buka Console (F12) untuk melihat urutan</p>

                {/* Counter Section */}
                <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginTop: "20px" }}>
                    <h2>Counter: {count}</h2>
                    <p style={{ opacity: 0.7 }}>Count kelipatan 3 akan skip render (shouldComponentUpdate)</p>
                    <button onClick={() => this.setState({ count: count + 1 })} style={{ padding: "10px 20px", marginRight: "10px", cursor: "pointer" }}>
                        + Increment
                    </button>
                    <button onClick={() => this.setState({ count: 0 })} style={{ padding: "10px 20px", cursor: "pointer" }}>
                        Reset
                    </button>
                </div>

                {/* Messages Section - untuk demo getSnapshotBeforeUpdate */}
                <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginTop: "20px" }}>
                    <h2>Messages (getSnapshotBeforeUpdate demo)</h2>
                    <button onClick={() => this.addMessage()} style={{ padding: "10px 20px", marginBottom: "10px", cursor: "pointer" }}>
                        + Add Message
                    </button>
                    <ul
                        ref={this.listRef}
                        style={{ maxHeight: "150px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", listStyle: "none" }}
                    >
                        {messages.map((msg, i) => (
                            <li key={i} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                                {msg}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lifecycle Info */}
                <div style={{ marginTop: "20px", padding: "15px", backgroundColor: theme === "dark" ? "#444" : "#e3f2fd", borderRadius: "8px" }}>
                    <h3>5 Updating Methods:</h3>
                    <ol>
                        <li>🟡 <code>getDerivedStateFromProps(props, state)</code></li>
                        <li>🟠 <code>shouldComponentUpdate(nextProps, nextState)</code></li>
                        <li>🟢 <code>render()</code></li>
                        <li>🔵 <code>getSnapshotBeforeUpdate(prevProps, prevState)</code></li>
                        <li>🔴 <code>componentDidUpdate(prevProps, prevState, snapshot)</code></li>
                    </ol>
                </div>
            </div>
        );
    }

    // ===========================================
    // 4. getSnapshotBeforeUpdate
    // - Dipanggil SETELAH render, SEBELUM DOM update
    // - Menerima: prevProps, prevState
    // - Return: snapshot value (dikirim ke componentDidUpdate)
    // - Untuk capture info dari DOM sebelum berubah (scroll position, dll)
    // ===========================================
    getSnapshotBeforeUpdate(prevProps: Props, prevState: State): number | null {
        console.log("🔵 4. getSnapshotBeforeUpdate", {
            prevCount: prevState.count,
            currentCount: this.state.count,
        });

        // Capture scroll position sebelum DOM update
        if (prevState.messages.length < this.state.messages.length && this.listRef.current) {
            const scrollHeight = this.listRef.current.scrollHeight;
            console.log("📸 Snapshot: scrollHeight =", scrollHeight);
            return scrollHeight;
        }
        return null;
    }

    // ===========================================
    // 5. componentDidUpdate
    // - Dipanggil SETELAH DOM update
    // - Menerima: prevProps, prevState, snapshot (dari getSnapshotBeforeUpdate)
    // - Untuk: fetch data berdasarkan perubahan, DOM manipulation
    // ===========================================
    componentDidUpdate(prevProps: Props, prevState: State, snapshot: number | null) {
        console.log("🔴 5. componentDidUpdate", {
            prevCount: prevState.count,
            currentCount: this.state.count,
            snapshot,
        });

        // Gunakan snapshot untuk scroll ke bawah saat ada pesan baru
        if (snapshot !== null && this.listRef.current) {
            this.listRef.current.scrollTop = this.listRef.current.scrollHeight - snapshot;
            console.log("📜 Auto-scroll ke pesan baru");
        }

        // Contoh: React to prop changes
        if (prevProps.theme !== this.props.theme) {
            console.log(`🎨 Theme changed: ${prevProps.theme} → ${this.props.theme}`);
        }
    }

    // Helper method
    addMessage() {
        this.setState((prev) => ({
            messages: [...prev.messages, `Pesan #${prev.messages.length + 1} - ${new Date().toLocaleTimeString()}`],
        }));
    }
}

// ===========================================
// Parent Component - untuk demo props change
// ===========================================
interface ParentState {
    theme: "light" | "dark";
}

class ParentComponent extends Component<object, ParentState> {
    constructor(props: object) {
        super(props);
        this.state = { theme: "light" };
    }

    render() {
        return (
            <div>
                <div style={{ padding: "10px", backgroundColor: "#f0f0f0", marginBottom: "10px" }}>
                    <button
                        onClick={() => this.setState({ theme: this.state.theme === "light" ? "dark" : "light" })}
                        style={{ padding: "10px 20px", cursor: "pointer" }}
                    >
                        Toggle Theme: {this.state.theme}
                    </button>
                </div>
                <Counter theme={this.state.theme} />
            </div>
        );
    }
}

export default function UpdatingPage() {
    return <ParentComponent />;
}
