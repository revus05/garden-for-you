"use client";

import type { User } from "entities/user/model/types";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

type UserContextType = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) {
  const [user, setUser] = useState<User | undefined>(initialUser ?? undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
