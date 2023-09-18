import React, { createContext, useContext, useState, useEffect } from "react";
import { Provider, Session, User } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "../../lib/supabase";
import { AuthData } from "../types";

type TokenLogin = {
  access_token: string;
  refresh_token: string;
};

type ContextProps = {
  user: User | null | undefined;
  isLoggedIn: boolean | null | undefined;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  signIn: (authData: AuthData) => Promise<string | undefined>;
  signup: (authData: AuthData) => Promise<string | undefined>;
  signInOAuth: (provider: string) => void;
  signOut: () => Promise<void>;
  loginWithToken: (credentials: TokenLogin) => Promise<void>;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>();

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
        setIsLoggedIn(true);
        setIsLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [user]);

  const signIn = async (formData: AuthData) => {
    setIsLoading(true);
    const { email, password } = formData;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return error.message;
      }
      setUser(data.user ?? undefined);
      setIsLoggedIn(true);
      setSession(data.session);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData: AuthData) => {
    setIsLoading(true);
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
        return error.message;
      }
      setUser(data.user ?? undefined);
      setSession(data.session);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUser(undefined);
    setIsLoggedIn(false);
    setSession(null);
  };

  const signInOAuth = async (provider: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      const url = data.url;
      if (!url) {
        throw Error;
      }
      const response = await WebBrowser.openAuthSessionAsync(
        url,
        "treko-places://google-signin",
        { showInRecents: true }
      );

      if (response.type === "success") {
        const url = response.url;
        const params = url.split("#")[1];
        const accessToken = params.split("&")[0].split("=")[1];
        const refreshToken = params.split("&")[2].split("=")[1];

        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        const {
          data: { user: supabaseUser },
        } = await supabase.auth.refreshSession();
        setIsLoggedIn(true);
        setUser(supabaseUser);
        if (error) {
          throw Error;
        }
      }
    } catch (error) {
      return error;
    } finally {
      WebBrowser.maybeCompleteAuthSession();
    }
  };

  const loginWithToken = async ({
    access_token,
    refresh_token,
  }: TokenLogin) => {
    const signIn = async () => {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      return await supabase.auth.refreshSession();
    };

    const {
      data: { user: supabaseUser },
    } = await signIn();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        setUser,
        signIn,
        signup,
        signOut,
        signInOAuth,
        isLoading,
        loginWithToken,
        isLoggedIn,
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
