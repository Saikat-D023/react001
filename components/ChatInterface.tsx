"use client";
import { useEffect, useState } from 'react';
import { Send, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export function ChatInterface() {
    const [input, setInput] = useState("");
    const [lastProcessedInput, setLastProcessedInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (loading) {
            timer = setTimeout(() => {
                setIsGenerating(true);
            }, 5000);
        } else {
            setIsGenerating(false);
        }

        return () => clearTimeout(timer);
    }, [loading]);

    const runTest = async () => {
        if (!input.trim()) return;

        const currentInput = input;
        setLastProcessedInput(currentInput);
        setInput("");
        setLoading(true);
        setOutput("");
        try {
            const { puter } = await import('@heyputer/puter.js');
            const response = await puter.ai.chat(currentInput, { model: "perplexity/sonar" });
            setOutput(response.toString());
        } catch (err: any) {
            setOutput("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">
            <Card className="w-full border-none shadow-lg bg-card overflow-hidden">
                <CardHeader className="border-b bg-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                        <Brain className="w-5 h-5 text-primary" />
                        AI Chat
                    </CardTitle>
                </CardHeader>

                <CardContent className={`transition-all duration-300 ease-in-out overflow-y-auto p-6 bg-slate-50/30 ${output || loading ? "min-h-[400px] max-h-[600px]" : "min-h-[100px]"}`}>
                    {output || loading ? (
                        <div className="flex flex-col gap-6">
                            {/* User Message - Aligned Ri   ght */}
                            <div className="bg-white border self-end p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-sm">
                                <p className="font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wide">You</p>
                                <div className="text-foreground">
                                    {lastProcessedInput}
                                </div>
                            </div>

                            {/* AI Message - Aligned Left */}
                            <div className="bg-white border self-start p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm shadow-sm">
                                <p className="font-semibold mb-1 text-primary uppercase text-xs tracking-wide">AI</p>
                                {loading && !output ? (
                                    <div className="flex items-center gap-2 py-2">
                                        <span className="animate-pulse text-muted-foreground italic">
                                            {isGenerating ? "Generating response..." : "Thinking..."}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                                        <ReactMarkdown>{output}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-muted-foreground py-10 italic">
                            Ask me anything...
                        </div>
                    )}
                </CardContent>
                <CardFooter className="p-4 border-t bg-white gap-3">
                    <Input
                        className="rounded-full bg-slate-100 border-none px-6 focus-visible:ring-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => e.key === 'Enter' && runTest()}
                    />
                    <Button
                        onClick={runTest}
                        disabled={loading}
                        className="rounded-full w-12 h-12 p-0 bg-black hover:bg-zinc-800 transition-colors"
                    >
                        {loading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Send className="w-5 h-5 text-white" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}