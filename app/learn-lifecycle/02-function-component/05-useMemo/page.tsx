"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const USERS = [
    "Alya",
    "Bima",
    "Citra",
    "Dimas",
    "Elena",
    "Fajar",
    "Gita",
    "Hana",
    "Irfan",
    "Jasmine",
];

function expensiveSum(limit: number) {
    console.time("expensiveSum");
    let total = 0;
    for (let i = 0; i <= limit; i += 1) {
        total += i;
    }
    return total;
}

function filterUsers(users: string[], keyword: string) {
    console.time("filterUsers");
    const lower = keyword.toLowerCase();
    const result = users.filter((name) => name.toLowerCase().includes(lower));
    console.timeEnd("filterUsers");
    return result;
}

export default function Page() {
    const [limit, setLimit] = useState(500000);
    const [keyword, setKeyword] = useState("");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(25000);
    const [discount, setDiscount] = useState(0);

    const total = useMemo(() => expensiveSum(limit), [limit]);
    const filteredUsers = useMemo(() => filterUsers(USERS, keyword), [keyword]);
    const memoPrice = useMemo(() => {
        const subtotal = qty * price;
        const discountValue = (subtotal * discount) / 100;
        return subtotal - discountValue;
    }, [qty, price, discount]);

    return (
        <main
            style={{
                padding: 24,
                fontFamily: "system-ui, sans-serif",
                background: theme === "light" ? "#f9fafb" : "#111827",
                color: theme === "light" ? "#0f172a" : "#f9fafb",
                minHeight: "100vh",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>Latihan useMemo</h1>
                <div style={{ display: "flex", gap: 16 }}>
                    <Link href="/learn-lifecycle">Back ke Materi</Link>
                    <Link href="/">Home</Link>
                </div>
            </div>

            <section style={{ marginTop: 16 }}>
                <h2>1. Memoize Perhitungan Berat</h2>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Limit: {limit.toLocaleString()}
                </label>
                <input
                    type="range"
                    min={100000}
                    max={2000000}
                    step={100000}
                    value={limit}
                    onChange={(event) => setLimit(Number(event.target.value))}
                    style={{ width: 320 }}
                />
                <p style={{ marginTop: 8 }}>Total: {total.toLocaleString()}</p>
                <p style={{ marginTop: 4 }}>
                    Buka console untuk melihat <code>expensiveSum</code> hanya berjalan saat
                    <strong> limit berubah</strong>.
                </p>
            </section>

            <section style={{ marginTop: 24 }}>
                <h2>2. Contoh Hitungan Memo (Subtotal)</h2>
                <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
                    <label>
                        Qty: {qty}
                        <input
                            type="range"
                            min={1}
                            max={20}
                            value={qty}
                            onChange={(event) => setQty(Number(event.target.value))}
                            style={{ width: "100%" }}
                        />
                    </label>
                    <label>
                        Harga Satuan: {price.toLocaleString("id-ID")}
                        <input
                            type="range"
                            min={5000}
                            max={100000}
                            step={5000}
                            value={price}
                            onChange={(event) => setPrice(Number(event.target.value))}
                            style={{ width: "100%" }}
                        />
                    </label>
                    <label>
                        Diskon: {discount}%
                        <input
                            type="range"
                            min={0}
                            max={50}
                            step={5}
                            value={discount}
                            onChange={(event) => setDiscount(Number(event.target.value))}
                            style={{ width: "100%" }}
                        />
                    </label>
                </div>
                <p style={{ marginTop: 8 }}>
                    Total memoized: <strong>Rp {memoPrice.toLocaleString("id-ID")}</strong>
                </p>
                <p style={{ marginTop: 4 }}>
                    Nilai hanya dihitung ulang saat <strong>qty</strong>, <strong>price</strong>,
                    atau <strong>discount</strong> berubah.
                </p>
            </section>

            <section style={{ marginTop: 24 }}>
                <h2>3. Memoize Filter</h2>
                <input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="Cari nama..."
                    style={{ padding: 8, minWidth: 240 }}
                />
                <p style={{ marginTop: 8 }}>Hasil: {filteredUsers.join(", ") || "(kosong)"}</p>
                <p style={{ marginTop: 4 }}>
                    Filter hanya jalan saat <strong>keyword</strong> berubah.
                </p>
            </section>

            <section style={{ marginTop: 24 }}>
                <h2>4. Perubahan UI Tanpa Hitung Ulang</h2>
                <p>
                    Toggle tema untuk membuktikan bahwa memoized value tidak dihitung ulang saat
                    state tidak relevan berubah.
                </p>
                <button
                    onClick={() =>
                        setTheme((prev) => (prev === "light" ? "dark" : "light"))
                    }
                    style={{ marginTop: 8 }}
                >
                    Toggle Theme ({theme})
                </button>
            </section>
        </main>
    );
}
