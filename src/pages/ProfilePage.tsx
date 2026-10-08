import { useState } from 'react';
import { Link,useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage(){const {user,loading}=useAuth();const {clearCart}=useCart();const [params,setParams]=useSearchParams();const [message,setMessage]=useState('');return <div className="min-h-screen bg-background"><Header/><main className="container max-w-xl py-8">{loading?<p>Күтіңіз…</p>:!user?<AuthForm/>:<><h1 className="mb-4 text-3xl font-bold">Жеке кабинет</h1><p className="mb-6 text-muted-foreground">{user.email}</p>{params.get('reset')==='1'&&<form className="mb-6 space-y-3" onSubmit={async e=>{e.preventDefault();const form=new FormData(e.currentTarget);const {error}=await supabase.auth.updateUser({password:String(form.get('password'))});setMessage(error?.message||'Құпиясөз жаңартылды.');if(!error)setParams({});}}><Input name="password" type="password" placeholder="Жаңа құпиясөз" aria-label="Жаңа құпиясөз" minLength={8} required/><Button type="submit">Құпиясөзді сақтау</Button></form>}{message&&<p role="status">{message}</p>}<div className="flex flex-wrap gap-3"><Button asChild><Link to="/orders">Тапсырыстар тарихы</Link></Button><Button asChild variant="outline"><Link to="/checkout">Тапсырыс беру</Link></Button><Button variant="ghost" onClick={async()=>{const {error}=await supabase.auth.signOut();if(error)setMessage('Шығу мүмкін болмады.');else clearCart();}}>Шығу</Button></div></>}</main></div>;}