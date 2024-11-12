"use client"


import { Search, Menu, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

export const TopBar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    return (
        <div>
            {/* Top Bar */}
            <div className="z-50 flex items-center justify-between px-4 py-4 lg:px-6 fixed top-0 left-0 right-0 container mx-auto mt-4">
                {/* Mobile Menu and Logo */}
                <div className="flex items-center space-x-4 pl-10">
                    
                    <div className="text-white text-3xl font-bold">ANISHOP</div>
                </div>

                {/* Desktop Navigation - Hidden on Mobile */}
                <nav className="hidden lg:flex space-x-8 lg:text-xl">
                    <a href="#" className="text-white">On Sale</a>
                    <a href="#" className="text-white">New Arrivals</a>
                </nav>

                {/* Search Bar - Hidden on Mobile */}
                <div className="hidden lg:block flex-1 max-w-3xl mx-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full py-3 pl-10 pr-4 bg-[#2A2A2A] bg-opacity-90 text-gray-200 rounded-full placeholder-[#FFFFFF66] focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    {/* Mobile Search */}
                    <button onClick={toggleSearchBar} className="text-white lg:hidden">
                        <Search size={24} />
                    </button>
                    <div className={`absolute top-full left-0 w-full bg-white p-4 shadow-md ${showSearchBar ? 'block' : 'hidden'}`}>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full py-3 pl-10 pr-4 bg-[#2A2A2A] bg-opacity-90 text-gray-200 rounded-full placeholder-[#FFFFFF66] focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <button className="text-white">
                        <ShoppingCart size={24} />
                    </button>
                    <button className="text-white">
                        <User size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}