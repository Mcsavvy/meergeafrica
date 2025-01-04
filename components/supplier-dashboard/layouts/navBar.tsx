import Link from "next/link";
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

interface Product {
  name: string;

  // ... other product properties as needed
}

interface DashboardNavbarProps {
  data?: Product[];
  currentPage?: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  data,
  currentPage,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (data) {
      const filteredData = data.filter((item) => {
        if (
          typeof item === "object" &&
          item !== null &&
          "name" in item &&
          typeof item.name === "string"
        ) {
          return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
      console.log(filteredData);
      // Example using router.push to navigate to a search results page
      // router.push(`/search?q=${searchQuery}`);
    } else {
      console.log("No data available to search");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" }); // Replace with your logout endpoint
      if (response.ok) {
        localStorage.removeItem("token"); // Or clear cookies, etc.
        router.push("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white p-4 shadow-md flex items-center">
      <h1 className="text-xl font-semibold">
        {currentPage || "Dashboard"}{" "}
        {/* Display default if currentPage is undefined */}
      </h1>
      <button className="mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <form onSubmit={handleSearchSubmit} className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </form>

      <div className="relative ml-auto" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 rounded-full bg-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.625z"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <Link
              href="/profile/personal"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.625z"
                  />
                </svg>
                <div>
                  <p className="font-medium">My Profile</p>
                  <p className="text-xs text-gray-500">Personal Information</p>
                </div>
              </div>
            </Link>
            <Link
              href="/profile/business"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 21v-2.25a3.375 3.375 0 00-3.375-3.375h-8.25a3.375 3.375 0 00-3.375 3.375V21m16.5-16.5L12 1.5m0 0L2.25 6m19.5 0h-2.25a3.375 3.375 0 00-3.375 3.375v10.5a3.375 3.
                  75a3.375 0 003.375 3.375h2.25a3.375 3.375 0 003.375-3.375V9.75z"
                  />
                </svg>
                <div>
                  <p className="font-medium">Business Profile</p>
                  <p className="text-xs text-gray-500">Company Information</p>
                </div>
              </div>
            </Link>
            <button
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-red-500 hover:text-red-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.625 6.375a2.25 2.25 0 00-2.25 2.25h-6.5a2.25 2.25 0 00-2.25-2.25V2.25m19.75 8.25c1.265 4.126-3.075 8.25-7.75 8.25-4.675 0-9-4.126-11.25-8.25-1.265-4.126 3.075-8.25 7.75-8.25 4.675 0 9 4.126 11.25 8.25z"
                />
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
