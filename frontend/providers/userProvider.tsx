"use client";

import { LesUser } from "@/types/user";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

interface UserState {
  user: LesUser | null;
  setUser: (user: LesUser) => void;
}

const createUserStore = (initProps?: Partial<UserState>) => {
  return createStore<UserState>()((set) => ({
    user: initProps?.user || null,
    setUser: (user) => set({ user }),
  }));
};

export const UserContext = createContext<ReturnType<typeof createUserStore> | null>(null);

export function UserProvider({ children, initialUser }: { children: React.ReactNode, initialUser: LesUser }) {
  const storeRef = useRef<ReturnType<typeof createUserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore({ user: initialUser });
  }
  return <UserContext.Provider value={storeRef.current}>{children}</UserContext.Provider>;
}

export function useUser() {
  const store = useContext(UserContext);
  if (!store) throw new Error('useUser debe usarse dentro de UserProvider');
  return useStore(store, (state) => state.user);
}