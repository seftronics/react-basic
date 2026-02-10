"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    console.log("[useEffect] render", { count, query, seconds });

    useEffect(() => {
        console.log("[useEffect] mounted (empty deps)");
        return () => {
            console.log("[useEffect] cleanup on unmount (empty deps)");
        };
    }, []);

    useEffect(() => {
        console.log("[useEffect] update (count changed)", { count });
    }, [count]);

    useEffect(() => {
        if (!query) {
            return;
        }
        const id = setTimeout(() => {
            console.log("[useEffect] debounced search", { query });
        }, 500);

        return () => {
            clearTimeout(id);
            console.log("[useEffect] cleanup debounce", { query });
        };
    }, [query]);

    useEffect(() => {
        if (!isTimerRunning) {
            console.log("[useEffect] timer stopped, skipping interval");
            return;
        }

        console.log("[useEffect] timer started, creating interval");
        const id = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(id);
            console.log("[useEffect] cleanup: interval cleared");
        };
    }, [isTimerRunning]);

    return (
        <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>Latihan useEffect</h1>
                <div style={{ display: "flex", gap: 16 }}>
                    <Link href="/learn-lifecycle">Back ke Materi</Link>
                    <Link href="/">Home</Link>
                </div>
            </div>

            <section style={{ marginTop: 16 }}>
                <h2>1. Mount & Unmount</h2>
                <p>Buka console untuk melihat log mount dan cleanup.</p>
            </section>

            <section style={{ marginTop: 16 }}>
                <h2>2. Update (Dependencies)</h2>
                <p>Count: {count}</p>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setCount((prev) => prev + 1)}>+</button>
                    <button onClick={() => setCount((prev) => Math.max(0, prev - 1))}>-</button>
                    <button onClick={() => setCount(0)}>Reset</button>
                </div>
            </section>

            <section style={{ marginTop: 16 }}>
                <h2>3. Debounce Effect</h2>
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ketik untuk search..."
                    style={{ padding: 8, minWidth: 240 }}
                />
                <p style={{ marginTop: 8 }}>Query: {query || "(kosong)"}</p>
            </section>

            <section style={{ marginTop: 16 }}>
                <h2>4. Interval + Cleanup</h2>
                <p>Seconds: {seconds}</p>
                <div style={{ display: "flex", gap: 8 }}>
                    <button
                        onClick={() => setIsTimerRunning(true)}
                        disabled={isTimerRunning}
                    >
                        Start
                    </button>
                    <button
                        onClick={() => setIsTimerRunning(false)}
                        disabled={!isTimerRunning}
                    >
                        Stop
                    </button>
                    <button onClick={() => setSeconds(0)}>Reset</button>
                </div>
                <p style={{ marginTop: 8, color: isTimerRunning ? "green" : "red" }}>
                    Status: {isTimerRunning ? "Running" : "Stopped"}
                </p>
            </section>
        </main>
    );
}
