// src/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const apiURL = import.meta.env.VITE_API_BASE;
// src/auth/auth.types.ts
export type UserRole = string;

export interface AuthSession {
  sessionId: string;
  userId: string;
  role: UserRole;
  expiresAt: string;

  // added fields from new login response
  username?: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  issuedAt?: string;
}

export interface AuthContextType {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_session";
const COOKIE_KEY = "auth_session";
const CACHE_NAME = "auth-cache";
const CACHE_KEY = "/auth-session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage, cookie, and cache on app start
  useEffect(() => {
    const loadSession = async () => {
      let parsed: AuthSession | null = null;

      // Try localStorage first
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        parsed = JSON.parse(stored);
      }

      // If not in localStorage, try cookie
      if (!parsed) {
        const cookie = Cookies.get(COOKIE_KEY);
        if (cookie) {
          parsed = JSON.parse(cookie);
        }
      }

      // If not in localStorage or cookie, try cache
      if (!parsed) {
        try {
          const cache = await caches.open(CACHE_NAME);
          const response = await cache.match(CACHE_KEY);
          if (response) {
            const data = await response.json();
            parsed = data;
          }
        } catch (error) {
          console.error("Error loading from cache:", error);
        }
      }

      if (parsed) {
        // Optional expiry check
        if (new Date(parsed.expiresAt) > new Date()) {
          setSession(parsed);
        } else {
          // Clean up expired session
          localStorage.removeItem(STORAGE_KEY);
          Cookies.remove(COOKIE_KEY);
          try {
            const cache = await caches.open(CACHE_NAME);
            await cache.delete(CACHE_KEY);
          } catch (error) {
            console.error("Error deleting from cache:", error);
          }
        }
      }
      setIsLoading(false);
    };

    loadSession();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await axios.post(`${apiURL}/api/login`, {
        identifier,
        password,
      });

      const data = response.data;

      // map server response into AuthSession and keep all fields
      const authSession: AuthSession = {
        sessionId: data.session_id,
        userId: data.user_id,
        username: data.username,
        name: data.name,
        email: data.email,
        role: data.role,
        isActive: data.is_active,
        issuedAt: data.issued_at,
        expiresAt: data.expires_at,
      };

      setSession(authSession);

      // persist everywhere: localStorage, cookie, cache
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authSession));
      } catch (err) {
        console.error("Error writing session to localStorage:", err);
      }

      try {
        // js-cookie accepts Date for expires
        Cookies.set(COOKIE_KEY, JSON.stringify(authSession), {
          expires: new Date(authSession.expiresAt),
          secure: true,
          sameSite: "Lax",
        });
      } catch (err) {
        console.error("Error setting session cookie:", err);
      }

      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(CACHE_KEY, new Response(JSON.stringify(authSession)));
      } catch (error) {
        console.error("Error storing session in cache:", error);
      }
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };
  const logout = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/api/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${session?.sessionId}`,
          },
        },
      );
      console.log("Logout response:", session.sessionId, response);
      if (response.status === 204) {
        setSession(null);
        localStorage.removeItem(STORAGE_KEY);
        Cookies.remove(COOKIE_KEY);

        // Remove from cache
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.delete(CACHE_KEY))
          .catch((error) => console.error("Error deleting from cache:", error));
      } else {
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.delete(CACHE_KEY))
          .catch((error) => console.error("Error deleting from cache:", error));
        localStorage.removeItem(STORAGE_KEY);
        Cookies.remove(COOKIE_KEY);

        console.error("Unexpected logout response status:", response.status);
      }
    } catch (error) {
      console.error("Logout API failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
