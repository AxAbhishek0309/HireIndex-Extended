import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { supabase } from "./supabase";

// API base URL - change this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  formData?: FormData | undefined,
): Promise<Response> {
  const options: RequestInit = {
    method,
    credentials: "include",
  };

  // Attach Supabase auth token if available
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {};
  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  if (formData) {
    options.headers = headers;
    options.body = formData;
  } else if (data) {
    headers['Content-Type'] = 'application/json';
    options.headers = headers;
    options.body = JSON.stringify(data);
  } else {
    options.headers = headers;
  }

  const fullUrl = url.startsWith('/api') ? `${API_BASE_URL}${url}` : url;
  const res = await fetch(fullUrl, options);
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
