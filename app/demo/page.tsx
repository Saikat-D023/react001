"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { Send, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherCard } from '@/components/WeatherCard';

const Page = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<any>(null); // Changed to null/any for object storage
    const [loading, setLoading] = useState(false);
    const [lastProcessedInput, setLastProcessedInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Helper to extract JSON from AI string (strips markdown if AI adds it)
    const parseAIResponse = (text: string) => {
        try {
            const cleanJson = text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleanJson);
        } catch (e) {
            console.error("Parsing error", e);
            return null;
        }
    };

    const runTest = async () => {
        if (!input.trim()) return;

        const currentInput = input;
        setLastProcessedInput(currentInput);
        setInput("");
        setLoading(true);
        setOutput(null);

        const structuredPrompt = `
            Return ONLY valid JSON. No markdown. No explanations.
            Format:
            {
                "location": "City Name",
                "temp": 25,
                "condition": "sunny",
                "time": "12:00 PM",
                "date": "Friday, Feb 20"
            }
            User input: ${currentInput}
        `;

        try {
            const { puter } = await import('@heyputer/puter.js');
            const response = await puter.ai.chat(structuredPrompt, { model: "perplexity/sonar" });

            const rawContent = response?.message?.content || response?.toString();
            const data = parseAIResponse(rawContent);

            if (data) {
                setOutput(data);
            } else {
                setOutput("I couldn't format the weather data. Please try again.");
            }
        } catch (err: any) {
            setOutput("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (loading) {
            timer = setTimeout(() => setIsGenerating(true), 5000);
        } else {
            setIsGenerating(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col">
            <Card className="w-full border-none shadow-xl bg-card overflow-hidden">
                <CardHeader className="border-b bg-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-zinc-800">
                        <BrainCircuit className="w-5 h-5 text-primary text-purple-400" />
                        <h1 className='text-purple-600'>Pro Chat</h1>
                        <Button className='bg-purple-700 hover:bg-purple-600 text-white animate-pulse cursor-pointer'>Upgrade</Button>
                    </CardTitle>
                </CardHeader>

                <CardContent className={`transition-all duration-500 ease-in-out overflow-y-auto p-8 bg-slate-50/50 ${output || loading ? "min-h-[500px]" : "min-h-[150px]"}`}>
                    {output || loading ? (
                        <div className="flex flex-col gap-8 max-w-4xl mx-auto">

                            {/* User Message */}
                            <div className="bg-white border self-end p-4 rounded-2xl rounded-tr-none max-w-[70%] shadow-sm">
                                <p className="font-bold text-[10px] text-zinc-400 mb-1 uppercase tracking-widest">You</p>
                                <div className="text-zinc-700 font-medium">{lastProcessedInput}</div>
                            </div>

                            {/* AI Message Container */}
                            <div className="self-start flex flex-col gap-2 max-w-[90%]">
                                <p className="font-bold text-[10px] text-primary mb-1 uppercase tracking-widest ml-4">AI Assistant</p>

                                {loading && !output ? (
                                    <div className="bg-white border p-6 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                                        </div>
                                        <span className="text-zinc-500 text-sm italic">
                                            {isGenerating ? "Finalizing report..." : "Searching local weather..."}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {typeof output === 'object' ? (
                                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                                <WeatherCard data={output} />
                                            </div>
                                        ) : (
                                            <div className="bg-white border p-4 rounded-2xl rounded-tl-none shadow-sm">
                                                {output}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-400 py-20 animate-pulse">
                            <BrainCircuit className="w-12 h-12 mb-4 opacity-20" />
                            <p className="italic font-medium">Glimpse of pro model(limited to weather searches)...</p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="p-6 border-t bg-white gap-3">
                    <Input
                        className="rounded-full bg-slate-50 border-zinc-200 h-12 px-6 focus-visible:ring-purple-400"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. What is the weather in Delhi?"
                        onKeyDown={(e) => e.key === 'Enter' && runTest()}
                    />
                    <Button
                        onClick={runTest}
                        disabled={loading}
                        className="rounded-full w-12 h-12 p-0 bg-purple-800 hover:bg-purple-700 shadow-lg shrink-0"
                    >
                        {loading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Send className="w-5 h-5 text-purple-200" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Page;