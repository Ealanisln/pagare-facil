"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from "next-auth/react";

interface User {
  id: string;
  email: string | null | undefined;
  name: string | null | undefined;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = React.useState<string | null>(null);

  // Format the user from the session
  const user = session?.user ? {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    isAdmin: session.user.isAdmin,
  } : null;

  // Función para iniciar sesión
  const signIn = async (email: string, password: string) => {
    setError(null);
    
    try {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      if (user?.isAdmin) {
        router.push('/administrador');
      } else {
        router.push('/panel');
      }
      router.refresh();
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign in');
    }
  };

  // Función para registrarse
  const signUp = async (email: string, password: string, name: string) => {
    setError(null);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }
      
      // Inicia sesión automáticamente después de registrarse
      await signIn(email, password);
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign up');
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      await nextAuthSignOut({ callbackUrl: '/autenticacion/iniciar-sesion' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: status === "loading",
        error,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 