"use client";

import { AuthProvider } from "@/lib/auth";
import ServiceWorker from "@/components/ServiceWorker";
import PullToRefresh from "@/components/PullToRefresh";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServiceWorker />
      <PullToRefresh />
      {children}
    </AuthProvider>
  );
}
