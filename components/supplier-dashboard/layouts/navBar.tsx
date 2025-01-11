"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Search, Bell, User2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavBarProps {
  onMenuClick: () => void;
  currentSection: string;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuClick, currentSection }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between h-16 px-6 bg-white">
      {/* Left section */}
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {currentSection === "Dashboard" ? "" : currentSection}
          </h1>
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search here"
                className="w-[500px] h-11 pl-4 pr-12 bg-gray-50 rounded-lg text-sm focus:outline-none border border-gray-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-lg">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
          </div>
          <div className="relative" ref={profileRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">KaddAgro</div>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User2 className="h-6 w-6 text-gray-600" />
              </div>
            </div>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                <Link href="/profile" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">My Profile</div>
                      <div className="text-xs text-gray-500">Personal Information</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                
                <Link href="/business" className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Business Profile</div>
                      <div className="text-xs text-gray-500">Business Information</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button 
                    className="w-full text-left px-4 py-2 text-red-500 text-sm hover:bg-gray-50"
                    onClick={() => {
                      // Add sign out logic here
                      console.log('Sign out clicked');
                    }}
                  >
                    SIGN OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
