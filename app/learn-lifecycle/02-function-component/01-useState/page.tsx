"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function UseStateDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const isFirstRender = useRef(true);

    console.log("[useState] render", { count, name });

    useEffect(() => {
        console.log("[useState] mounted (componentDidMount)");

        const intervalId = setInterval(() => {
            console.log("[useState] interval tick");
        }, 1000);

        return () => {
            clearInterval(intervalId);
            console.log("[useState] unmounted (componentWillUnmount)");
        };
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            console.log("isFirstRender")
            isFirstRender.current = false;
            return;
        }
        console.log("[useState] updated (componentDidUpdate)", { count, name });
    }, [count, name]);

    const increment = () => {
        console.log("[useState] click +");
        setCount((prev) => prev + 1);
    };

    const decrement = () => {
        console.log("[useState] click -");
        setCount((prev) => Math.max(0, prev - 1));
    };

    const reset = () => {
        console.log("[useState] click reset");
        setCount(0);
    };

    return (
        <>
            <section style={{ marginTop: 16 }}>
                <h2>Counter</h2>
                <p>Nilai saat ini: {count}</p>
                <p>Nilai x2 (derived): {count * 2}</p>

                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={decrement}>-</button>
                    <button onClick={increment}>+</button>
                    <button onClick={reset}>Reset</button>
                </div>
            </section>

            <section style={{ marginTop: 24 }}>
                <h2>Form</h2>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Nama:
                </label>
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ketik nama..."
                    style={{ padding: 8, minWidth: 240 }}
                />
                <p style={{ marginTop: 12 }}>
                    Halo, <strong>{name || "Tamu"}</strong>
                </p>
            </section>
        </>
    );
}

export default function Page() {
    const [showDemo, setShowDemo] = useState(true);
    
    const toggleDemo = () => {
        console.log("[useState] toggle demo");
        setShowDemo((prev) => !prev);
    };

    return (
        <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>useState: Counter & Form</h1>
                <div style={{ display: "flex", gap: 16 }}>
                    <Link href="/learn-lifecycle">Back ke Materi</Link>
                    <Link href="/">Home</Link>
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <button onClick={toggleDemo}>
                    {showDemo ? "Unmount Demo" : "Mount Demo"}
                </button>
            </div>

            {showDemo ? <UseStateDemo /> : <p>Demo tidak ter-mount.</p>}
        </main>
    );
}
