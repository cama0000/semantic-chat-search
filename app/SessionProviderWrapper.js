"use client";
import { SessionProvider } from 'next-auth/react';

// this exists so we do not have to make layout.js a client module

export default function SessionProviderWrapper ({ children }) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}