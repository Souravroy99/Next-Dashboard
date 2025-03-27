"use client";

import Image from "next/image";
import Link from "next/link";
import home from "../img/home.png";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, User } from "lucide-react"; // Icons
import { useEffect, useState } from "react";

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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    setName(name ?? "Guest"); 
    setEmail(email ?? "guest@example.com"); 
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("name"); 
    localStorage.removeItem("email"); 
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

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>

                <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                  <User className="w-5 h-5" />
                </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800">
            <DropdownMenuLabel className="text-lg font-semibold">{name || "Guest"}</DropdownMenuLabel>
            <p className="px-3 text-sm text-gray-500">{email || "No email"}</p>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-2 text-red-600">
              <LogOut className="w-5 h-5" /> Logout
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleDeleteAccount} className="cursor-pointer flex items-center gap-2 text-red-700">
              <Trash2 className="w-5 h-5" /> Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
