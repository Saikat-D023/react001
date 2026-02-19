import { NextResponse } from 'next/server';

// Important: Use the specific Node.js entry point for Puter
const { init } = require('@heyputer/puter.js/src/init.cjs');

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
        }

        // Initialize Puter. 
        // NOTE: If this is running on your local machine, it may fail 
        // if it can't find a session. Puter works best when deployed TO Puter.
        const puter = init();

        const response = await puter.ai.chat(prompt);

        return NextResponse.json({
            success: true,
            result: response.toString()
        });

    } catch (error: any) {
        // Check your terminal where 'npm run dev' is running to see this!
        console.error("Puter API Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}