"use client";
import { LogOut, Search } from "lucide-react";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "./button";
import { Switch } from "./switch";
import { Label } from "./label";
import { DemoContext } from "@/lib/contexts/demo";

type SearchBarProps = {
  placeholder?: string;
};

type NavbarProps = {
  pageName?: string;
  showSearchbar?: boolean;
  userName?: string;
  userAvatar?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search..." }) => {
  return (
    <div className="relative flex-1 hidden md:block">
      <div className="search-icon absolute inset-y-0 end-2.5 flex items-center ps-3 pointer-events-none">
        <Search className="w-5 h-6 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({
  pageName = "Dashboard",
  showSearchbar = false,
  userName = "John Doe",
  userAvatar = "/images/avatars/avatar-1.jpg",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { demo, toggleDemo } = useContext(DemoContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border border-slate-200 sticky top-0 z-20 h-20 flex items-center justify-between gap-20 w-full px-4 py-2.5 lg:px-8 lg:py-3 max-w-full">
      <div className="h-full flex items-center gap-4 pl-8">
        <h1 className="hidden md:inline-block text-2xl font-semibold">
          {pageName}
        </h1>
      </div>

      {showSearchbar && <SearchBar />}

      <div className="flex justify-end items-center">
        <button className="mr-4">
          <Image
            src="/assets/svgs/notifications.svg"
            alt=""
            width={20}
            height={20}
            className="w-7 h-7"
          />
        </button>
        <button className="mr-4">
          <Image
            src="/assets/svgs/shopping-cart.svg"
            alt=""
            width={20}
            height={20}
            className="w-7 h-7"
          />
        </button>

        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2">
            <span>{userName}</span>
            <Image
              width={100}
              height={100}
              src={userAvatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 z-10 bg-white rounded-lg shadow-lg w-80 p-6 space-y-4">
              <a
                href="#"
                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/svgs/user.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <span>My Profile</span>
                    <span className="text-sm text-gray-500">
                      Personal Information
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/svgs/business.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div className="flex flex-col">
                    <span>Business Profile</span>
                    <span className="text-sm text-gray-500">
                      Business Information
                    </span>
                  </div>
                </div>
              </a>

              <div className="flex flex-col gap-4 border-t pt-2">
                <div className="flex items-center gap-x-2">
                  <LogOut size={20} />
                  <Button variant="link">Logout</Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="demo-mode"
                    checked={demo}
                    onCheckedChange={toggleDemo}
                  />
                  <Label htmlFor="demo-mode">Demo</Label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
