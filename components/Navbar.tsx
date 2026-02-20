"use client"

import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
    const handleClick = () => {
        window.location.href = "/";
    }
    return (
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            {/* Logo Group - Matches Hero sizing */}
            <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
                onClick={handleClick}>
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <div
                    className="w-4 h-4 bg-black"
                    style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                ></div>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
                <li className="hover:text-black cursor-pointer transition-colors">Features</li>
                <li className="hover:text-black cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-black cursor-pointer transition-colors">About</li>
            </ul>

            <div>
                <Button className="rounded-full px-6 bg-black text-white hover:bg-gray-800">
                    Get Started
                </Button>
            </div>
        </nav>
    )
}
export default Navbar