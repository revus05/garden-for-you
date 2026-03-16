"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { User } from "entities/user";
import { UserProvider } from "entities/user";
import type { ReactNode } from "react";
import { useState } from "react";

export function ClientProviders({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider initialUser={initialUser}>{children}</UserProvider>
    </QueryClientProvider>
  );
}
