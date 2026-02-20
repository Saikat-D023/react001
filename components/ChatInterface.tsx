"use client";
import { useState } from 'react';
import { Send, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function ChatInterface() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const { puter } = await import('@heyputer/puter.js');
            const response = await puter.ai.chat(input, { model: "perplexity/sonar" });
            setOutput(response.toString());
        } catch (err: any) {
            setOutput("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Removed items-center and text-center to allow the chat UI to breathe */
        <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">
            <Card className="w-full border-none shadow-lg bg-card">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        AI Chat
                    </CardTitle>
                </CardHeader>

                {/* Increased max-height for a better wide-screen experience */}
                <CardContent className="min-h-[400px] max-h-[600px] overflow-y-auto p-6 text-left">
                    {output ? (
                        <div className="flex flex-col gap-4">
                            <div className="bg-muted/50 self-start p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                                <p className="font-semibold mb-1 text-primary">AI</p>
                                {output}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground py-20">
                            {loading ? "Loading..." : "Ask me anything..."}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="p-4 border-t gap-3">
                    <Input
                        className="rounded-full bg-muted border-none px-6 focus-visible:ring-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => e.key === 'Enter' && runTest()}
                    />
                    <Button
                        onClick={runTest}
                        disabled={loading}
                        className="rounded-full w-12 h-12 p-0"
                    >
                        {loading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}