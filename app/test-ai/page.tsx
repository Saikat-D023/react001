"use client";
import { useState } from 'react';

export default function TestAI() {
    const [input, setInput] = useState("Hello Puter!");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        try {
            // We import it dynamically to avoid SSR errors
            const { puter } = await import('@heyputer/puter.js');

            const response = await puter.ai.chat(input);
            setOutput(response.toString());
        } catch (err: any) {
            setOutput("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
            <h1>Puter AI Test</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: '10px', width: '300px', color: 'black' }}
            />
            <button
                onClick={runTest}
                disabled={loading}
                style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}
            >
                {loading ? "Thinking..." : "Send to AI"}
            </button>

            <div style={{ marginTop: '20px', padding: '20px', background: '#f0f0f0', borderRadius: '8px', color: '#333' }}>
                <strong>Response:</strong>
                <p>{output}</p>
            </div>
        </div>
    );
}