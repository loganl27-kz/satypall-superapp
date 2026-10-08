import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext<{user: User | null; loading: boolean}>({user:null,loading:true});
export function AuthProvider({children}:{children:ReactNode}) {
  const [user,setUser] = useState<User|null>(null);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const {data:{subscription}} = supabase.auth.onAuthStateChange((_event,session) => { setUser(session?.user ?? null); setLoading(false); });
    supabase.auth.getSession().then(({data}) => {setUser(data.session?.user ?? null);setLoading(false);});
    return () => subscription.unsubscribe();
  },[]);
  return <AuthContext.Provider value={{user,loading}}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);