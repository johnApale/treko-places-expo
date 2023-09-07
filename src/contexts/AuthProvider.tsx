import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";

import { supabase } from "../../lib/supabase";
import { AuthData } from "../types";

type ContextProps = {
  user: User | null | undefined;
  session: Session | null;
  // isLoading: boolean;
  signIn: (authData: AuthData) => Promise<void>;
  signup: (authData: AuthData) => Promise<void>;
  signOut: () => Promise<void>;
};

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  // user null = loading
  const [user, setUser] = useState<User | null | undefined>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      if (session) {
        setSession(session);
        setUser(session?.user);
        setIsLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setSession(session);
        setUser(session?.user);
        setIsLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [user]);

  const signIn = async (formData: AuthData) => {
    const { email, password } = formData;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      setUser(data.user ?? undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (formData: AuthData) => {
    const { email, password, first_name, last_name } = formData;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            last_name,
          },
        },
      });

      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      setUser(data.user ?? undefined);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    console.log("signout");
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn,
        signup,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext, AuthProvider };
