import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        /* Changed max-w-9xl to max-w-7xl for alignment */
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center">
            <div className="mb-8 flex items-center justify-center">
                <div className="flex gap-1.5 items-center">
                    <div className="w-4 h-4 bg-black dark:bg-white"></div>
                    <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                    <div
                        className="w-4 h-4 bg-black dark:bg-white"
                        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    ></div>
                </div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-6">
                AI Chat. Simplified.
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Chat with data, instantly. Experience the power of AI with a clean, distraction-free interface.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    href="/chat"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black text-white px-10 py-4 text-sm font-medium shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                    Start Free
                </Link>
                <Link
                    href="/demo"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gray-100 text-black px-10 py-4 text-sm font-medium transition-all hover:bg-gray-200"
                >
                    See Demo
                </Link>
            </div>
        </div>
    );
}