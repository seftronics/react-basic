"use client";

import { Component } from "react";
import { Props, State } from "@/app/types/user.types";

// ===========================================
// MOUNTING LIFECYCLE (4 Methods)
// Urutan: constructor → getDerivedStateFromProps → render → componentDidMount
// ===========================================


class UserProfile extends Component<Props, State> {
    // ===========================================
    // 1. CONSTRUCTOR
    // - Dipanggil pertama kali
    // - Initialize state & bind methods
    // ===========================================
    constructor(props: Props) {
        super(props); // WAJIB dipanggil pertama
        console.log("🔵 1. CONSTRUCTOR");

        this.state = {
            user: null,
            loading: true,
        };
    }

    // ===========================================
    // 2. getDerivedStateFromProps (static)
    // - Dipanggil sebelum render
    // - Sync state dengan props
    // - Return object untuk update state, atau null
    // ===========================================
    static getDerivedStateFromProps(props: Props, state: State) {
        console.log("🟡 2. getDerivedStateFromProps", { props, state });
        return null;
    }

    // ===========================================
    // 3. RENDER
    // - Return JSX
    // - Harus PURE (tanpa side effects)
    // ===========================================
    render() {
        console.log("🟢 3. RENDER");
        const { user, loading } = this.state;

        return (
            <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}>
                <h1>MOUNTING Lifecycle</h1>
                <p style={{ color: "#666" }}>Buka Console (F12) untuk melihat urutan</p>

                <div
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "20px",
                        marginTop: "20px",
                        backgroundColor: "#f9f9f9",
                    }}
                >
                    <h2>User Profile:</h2>
                    {loading && <p>⏳ Loading...</p>}
                    {user && (
                        <div>
                            <p>ID: {user.id}</p>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#e3f2fd", borderRadius: "8px" }}>
                    <h3>4 Mounting Methods:</h3>
                    <ol>
                        <li>🔵 <code>constructor(props)</code> - Init state</li>
                        <li>🟡 <code>getDerivedStateFromProps(props, state)</code> - Sync props</li>
                        <li>🟢 <code>render()</code> - Return JSX</li>
                        <li>🔴 <code>componentDidMount()</code> - Side effects</li>
                    </ol>
                </div>
            </div>
        );
    }

    // ===========================================
    // 4. COMPONENTDIDMOUNT
    // - Dipanggil SEKALI setelah component mount ke DOM
    // - Tempat untuk: fetch data, subscribe, DOM manipulation
    // ===========================================
    componentDidMount() {
        console.log("🔴 4. COMPONENTDIDMOUNT");

        this.setState({
            user: { id: 1, name: "John Doe", email: "john@example.com" },
            loading: false,
        });
    }
}

export default function MountingPage() {
    return <UserProfile userId={1} />;
}
