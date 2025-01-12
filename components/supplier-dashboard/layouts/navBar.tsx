"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, User2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignOutModal } from "../popupScreen/sign-out-modal";

interface NavBarProps {
  onMenuClick: () => void;
  currentSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuClick, currentSection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-3 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left section */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onMenuClick}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-1"
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <h1 className="text-base md:text-xl font-semibold text-gray-900 truncate max-w-[150px] md:max-w-none">
              {currentSection}
            </h1>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-xl mx-2 md:mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-9 md:pl-10 pr-3 py-1.5 md:py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Mobile search button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none p-1"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Right section */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none relative p-1">
              <Bell className="h-5 w-5 md:h-6 md:w-6" />
              <span className="absolute -top-1 -right-1 h-3.5 w-3.5 md:h-4 md:w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[8px] md:text-[10px] font-medium text-white">2</span>
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 md:gap-2 focus:outline-none p-1"
              >
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User2 className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </div>
                <span className="hidden md:inline-block text-sm text-gray-700">John Doe</span>
                <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 md:w-48 bg-white rounded-lg shadow-lg py-1 z-30">
                  <Link href="/profile" className="block w-full px-3 md:px-4 py-1.5 md:py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/business" className="block w-full px-3 md:px-4 py-1.5 md:py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                    Business Profile
                  </Link>
                  <div className="h-[1px] bg-gray-200 my-1"></div>
                  <button 
                    className="block w-full px-3 md:px-4 py-1.5 md:py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsSearchOpen(false);
                      setShowSignOutModal(true);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Mobile section title */}
        <div className="md:hidden py-2">
          <h1 className="text-lg font-semibold text-gray-900">
            {currentSection}
          </h1>
        </div>
      </div>
      
      <SignOutModal 
        isOpen={showSignOutModal} 
        onClose={() => setShowSignOutModal(false)} 
      />
    </nav>
  );
};

export default NavBar;
