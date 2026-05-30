"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  FolderOpen,
  Zap,
  Map,
  Search,
  Bell,
  Settings,
  LogOut,
  Mountain,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Locations", icon: MapPin, href: "/dashboard/locations" },
  { label: "Categories", icon: FolderOpen, href: "/dashboard/categories" },
  { label: "MCP Events", icon: Zap, href: "/dashboard/mcp-events" },
  { label: "Map View", icon: Map, href: "/" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-60 bg-[#0a0a0a] border-r border-[#1a1a2e]
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-[#1a1a2e]">
          <Mountain className="w-6 h-6 text-[#4169E1] flex-shrink-0" />
          <span className="text-lg font-bold tracking-wide">TentCity</span>
          <span className="text-xs text-[#888888] font-medium ml-0.5">Admin</span>
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden p-1 rounded hover:bg-[#1a1a2e] transition-colors"
          >
            <X className="w-4 h-4 text-[#888888]" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href) && item.href !== "/dashboard";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-[#4169E1]/15 text-[#4169E1]"
                      : "text-[#888888] hover:bg-[#1a1a2e] hover:text-white"
                  }
                `}
              >
                <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-[#4169E1]" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user section */}
        <div className="border-t border-[#1a1a2e] p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#4169E1]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#4169E1]">AU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-[#888888] truncate">admin@tentcity.app</p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-[#1a1a2e] transition-colors flex-shrink-0">
              <LogOut className="w-4 h-4 text-[#888888]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-[#0a0a0a] border-b border-[#1a1a2e] flex items-center gap-4 px-4 lg:px-6 flex-shrink-0">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#1a1a2e] transition-colors"
          >
            <Menu className="w-5 h-5 text-[#888888]" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              placeholder="Search locations, categories..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-[#000000] border border-[#1a1a2e] text-sm text-white placeholder-[#888888] focus:outline-none focus:border-[#4169E1] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button className="relative p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors">
              <Bell className="w-5 h-5 text-[#888888]" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                3
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors">
              <Settings className="w-5 h-5 text-[#888888]" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
