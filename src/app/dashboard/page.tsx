"use client";

import {
  MapPin,
  Activity,
  FolderOpen,
  FileText,
  TrendingUp,
  TrendingDown,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserPlus,
} from "lucide-react";

const stats = [
  {
    label: "Total Locations",
    value: "284",
    change: "+12%",
    up: true,
    icon: MapPin,
    iconColor: "#5ba3a8",
  },
  {
    label: "Active Services",
    value: "156",
    change: "+8%",
    up: true,
    icon: Activity,
    iconColor: "#22c55e",
  },
  {
    label: "Categories",
    value: "24",
    change: "+2",
    up: true,
    icon: FolderOpen,
    iconColor: "#a78bfa",
  },
  {
    label: "Reports Filed",
    value: "42",
    change: "-3%",
    up: false,
    icon: FileText,
    iconColor: "#f59e0b",
  },
];

const recentLocations = [
  {
    name: "Hope House Shelter",
    category: "Shelter",
    categoryColor: "#ef4444",
    status: "Active",
    added: "2 hours ago",
  },
  {
    name: "Downtown Food Pantry",
    category: "Food",
    categoryColor: "#22c55e",
    status: "Active",
    added: "5 hours ago",
  },
  {
    name: "Northside Medical Clinic",
    category: "Medical",
    categoryColor: "#3b82f6",
    status: "Pending",
    added: "1 day ago",
  },
];

const recentActivity = [
  {
    icon: CheckCircle,
    color: "#22c55e",
    text: "Hope House Shelter was verified and marked active",
    time: "2 hours ago",
  },
  {
    icon: Plus,
    color: "#5ba3a8",
    text: "New location added: Downtown Food Pantry",
    time: "5 hours ago",
  },
  {
    icon: AlertTriangle,
    color: "#f59e0b",
    text: "Report filed for Northside Medical Clinic — hours outdated",
    time: "1 day ago",
  },
  {
    icon: UserPlus,
    color: "#a78bfa",
    text: "New volunteer registered: Maria S.",
    time: "2 days ago",
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-[#8899a6] mt-1">
            Welcome back! Here&apos;s an overview of your resources.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#5ba3a8] hover:bg-[#4a9298] text-sm font-medium text-white transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1e2a3a] rounded-xl border border-[#2f3e50] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.iconColor}15` }}
              >
                <stat.icon
                  className="w-5 h-5"
                  style={{ color: stat.iconColor }}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.up ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-[#8899a6] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bottom grid: table + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Locations table */}
        <div className="lg:col-span-3 bg-[#1e2a3a] rounded-xl border border-[#2f3e50] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#2f3e50]">
            <h2 className="text-base font-semibold text-white">
              Recent Locations
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#8899a6] text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3 font-medium">Name</th>
                  <th className="text-left px-5 py-3 font-medium">Category</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody>
                {recentLocations.map((loc) => (
                  <tr
                    key={loc.name}
                    className="border-t border-[#2f3e50] hover:bg-[#243040] transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-white">
                      {loc.name}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${loc.categoryColor}20`,
                          color: loc.categoryColor,
                        }}
                      >
                        {loc.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          loc.status === "Active"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-yellow-500/15 text-yellow-400"
                        }`}
                      >
                        {loc.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#8899a6]">{loc.added}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity feed */}
        <div className="lg:col-span-2 bg-[#1e2a3a] rounded-xl border border-[#2f3e50] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#2f3e50]">
            <h2 className="text-base font-semibold text-white">
              Recent Activity
            </h2>
          </div>
          <div className="p-4 space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon
                    className="w-4 h-4"
                    style={{ color: item.color }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#c8d6e0] leading-snug">
                    {item.text}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="w-3 h-3 text-[#8899a6]" />
                    <span className="text-xs text-[#8899a6]">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
