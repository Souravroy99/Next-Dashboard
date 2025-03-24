"use client";

import Image from "next/image";
import Link from "next/link";
import home from "../img/home.png";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"; // Import logout icon

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggler from "@/components/ThemeToggler";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth");
  };

  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <Link href="/">
        <Image src={home} alt="Home" width={40} />
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggler />

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white font-semibold px-2 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
