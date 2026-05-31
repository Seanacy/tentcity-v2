"use client";

import { AuthProvider } from "@/lib/auth";
import ServiceWorker from "@/components/ServiceWorker";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServiceWorker />
      {children}
    </AuthProvider>
  );
}
