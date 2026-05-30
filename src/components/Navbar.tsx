"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Map, Info, Users, PlusCircle, Shield, LogOut } from "lucide-react";

const navItems = [
  { label: "Map", icon: Map, href: "/" },
  { label: "About", icon: Info, href: "/about" },
  { label: "Founders", icon: Users, href: "/founders" },
  { label: "Add Location", icon: PlusCircle, href: "/add-location" },
  { label: "Admin", icon: Shield, href: "/admin" },
  { label: "Logout", icon: LogOut, href: "/logout" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#000000] border-b border-[#1a1a2e] flex items-center justify-center px-4">
      {/* Logo — centered */}
      <a href="/" className="flex items-center gap-2 select-none">
        <Image src="/tentcity-logo.png" alt="TentCity logo" width={32} height={32} />
        <span className="text-lg font-bold tracking-wide text-white">
          TentCity
        </span>
      </a>

      {/* Hamburger — right */}
      <div className="absolute right-4" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-[#111111] transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-12 w-52 bg-[#111111] border border-[#1a1a2e] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#cccccc] hover:bg-[#1a1a2e] hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4 text-[#4169E1]" />
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
