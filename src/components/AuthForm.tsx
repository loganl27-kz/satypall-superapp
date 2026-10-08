import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthForm() {
  const [signup,setSignup] = useState(false);
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState('');
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();setBusy(true);setMessage('');
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email')).trim(); const password = String(form.get('password'));
    try {
      const {error} = signup ? await supabase.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+'/profile'}}) : await supabase.auth.signInWithPassword({email,password});
      if(error) setMessage(error.message);
      else if(signup) setMessage('Электрондық поштаңызға келген сілтемені басып, тіркелуді растаңыз.');
    } catch {setMessage('Қосылу мүмкін болмады. Қайта көріңіз.');} finally {setBusy(false);}
  }
  return <section className="mx-auto max-w-md py-8">
    <h2 className="mb-5 text-2xl font-bold">{signup?'Тіркелу':'Жеке кабинетке кіру'}</h2>
    <Button variant="outline" className="mb-5 w-full" disabled={busy} onClick={async()=>{setBusy(true);try {const result=await lovable.auth.signInWithOAuth('google',{redirect_uri:window.location.origin+'/profile'});if(result.error)setMessage(result.error.message);}catch{setMessage('Google арқылы кіру мүмкін болмады.');}finally{setBusy(false);}}}>Google арқылы кіру</Button>
    <form onSubmit={submit} className="space-y-4">
      <div><Label htmlFor="email">Электрондық пошта</Label><Input id="email" name="email" type="email" autoComplete="email" required maxLength={255}/></div>
      <div><Label htmlFor="password">Құпиясөз</Label><Input id="password" name="password" type="password" autoComplete={signup?'new-password':'current-password'} minLength={8} maxLength={128} required/></div>
      {message && <p role="status" className="text-sm text-destructive">{message}</p>}
      <Button type="submit" className="w-full" disabled={busy}>{busy?'Күтіңіз…':signup?'Тіркелу':'Кіру'}</Button>
    </form>
    <Button variant="link" onClick={()=>{setSignup(!signup);setMessage('');}}>{signup?'Аккаунтым бар — кіру':'Аккаунт жоқ — тіркелу'}</Button>
    {!signup && <Button variant="link" disabled={busy} onClick={async()=>{const el=document.getElementById('email') as HTMLInputElement|null; if(!el?.value||!el.checkValidity()){setMessage('Алдымен электрондық поштаңызды енгізіңіз.');return;} setBusy(true);try{const {error}=await supabase.auth.resetPasswordForEmail(el.value,{redirectTo:window.location.origin+'/profile?reset=1'});setMessage(error?.message||'Құпиясөзді қалпына келтіру сілтемесі жіберілді.');}finally{setBusy(false);}}}>Құпиясөзді ұмыттыңыз ба?</Button>}
  </section>;
}