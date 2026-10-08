import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { checkoutSchema, deliveryLabels } from '@/lib/checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const {user,loading}=useAuth(); const {items,totalPrice,clearCart}=useCart();
  const requestId=useRef(crypto.randomUUID());
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [orderId,setOrderId]=useState('');
  const [payment,setPayment]=useState<'kaspi'|'cash'>('cash');const [delivery,setDelivery]=useState('standard');
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();if(busy||!items.length)return;
    const form=new FormData(e.currentTarget);
    const result=checkoutSchema.safeParse({name:form.get('name'),phone:form.get('phone'),address:form.get('address'),payment,delivery});
    if(!result.success){setError(result.error.issues[0].message);return;}
    setBusy(true);setError('');
    try {
      const v=result.data;
      const {data,error:failure}=await supabase.rpc('place_order',{p_request_id:requestId.current,p_name:v.name,p_phone:v.phone,p_address:v.address,p_payment:v.payment,p_delivery:v.delivery,p_items:items.map(i=>({id:i.product.id,quantity:i.quantity}))});
      if(failure)throw failure;if(!data)throw new Error('Тапсырыс сақталмады');
      setOrderId(data);clearCart();
    } catch {setError('Тапсырыс жіберілмеді. Деректерді тексеріп, қайта көріңіз; себетіңіз сақталды.');} finally {setBusy(false);}
  }
  return <div className="min-h-screen bg-background"><Header/><main className="container py-8">
    {orderId ? <div className="mx-auto max-w-lg py-12 text-center"><CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-primary"/><h1 className="mb-3 text-3xl font-bold">Тапсырыс қабылданды!</h1><p className="mb-2">№ {orderId.slice(0,8).toUpperCase()}</p><p className="mb-6 text-muted-foreground">Төлем жеткізу кезінде: {payment==='kaspi'?'Kaspi':'қолма-қол'}. Төлем әлі жасалған жоқ.</p><Button asChild><Link to="/orders">Тапсырыстар тарихын көру</Link></Button></div> : loading ? <p>Күтіңіз…</p> : !user ? <><p className="text-center text-muted-foreground">Тапсырысыңыз бен тарихыңызды сақтау үшін кіріңіз.</p><AuthForm/></> : !items.length ? <div className="text-center py-12"><h1 className="mb-5 text-2xl font-bold">Себет бос</h1><Button asChild><Link to="/catalog">Тауар таңдау</Link></Button></div> : <>
      <h1 className="mb-8 text-3xl font-bold">Тапсырысты рәсімдеу</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <form onSubmit={submit} className="max-w-xl space-y-5">
        <div><Label htmlFor="customer-name">Аты-жөніңіз</Label><Input id="customer-name" name="name" autoComplete="name" required minLength={2} maxLength={100}/></div>
        <div><Label htmlFor="phone">Телефон нөмірі</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 777 123 45 67" required maxLength={25}/></div>
        <fieldset><legend className="mb-2 font-bold">Жеткізу түрі</legend>{Object.entries(deliveryLabels).map(([id,label])=><label key={id} className="flex items-center gap-3 border-b py-3"><input type="radio" name="delivery" checked={delivery===id} onChange={()=>setDelivery(id)}/>{label}</label>)}</fieldset>
        <div><Label htmlFor="address">{delivery==='pickup'?'Алып кету пунктінің мекенжайы':'Жеткізу мекенжайы'}</Label><Input id="address" name="address" autoComplete="street-address" required minLength={5} maxLength={500} placeholder="Қала, көше, үй, пәтер"/>{delivery==='pickup'&&<p className="mt-2 text-sm text-muted-foreground">Пункт мекенжайын сатушымен келісіңіз.</p>}</div>
        <fieldset><legend className="mb-2 font-bold">Төлем тәсілі</legend><div className="flex flex-wrap gap-5"><label className="flex items-center gap-2"><input type="radio" name="payment" checked={payment==='cash'} onChange={()=>setPayment('cash')}/>Қолма-қол</label><label className="flex items-center gap-2"><input type="radio" name="payment" checked={payment==='kaspi'} onChange={()=>setPayment('kaspi')}/>Kaspi</label></div><p className="mt-3 text-sm text-muted-foreground">Төлем жеткізу кезінде жасалады. Онлайн Kaspi төлемі қосылмаған.</p></fieldset>
        <label className="flex items-start gap-3 text-sm"><input type="checkbox" required className="mt-1"/>Тауарлар, мекенжай және төлем тәсілін тексердім, тапсырысты растаймын.</label>
        {error&&<p role="alert" className="text-destructive">{error}</p>}
        <Button type="submit" size="lg" disabled={busy}>{busy?'Тапсырыс жіберілуде…':'Тапсырысты растау'}</Button>
      </form>
      <aside><h2 className="mb-5 text-xl font-bold">Сіздің тапсырысыңыз</h2>{items.map(i=><div key={i.product.id} className="flex items-center gap-3 border-b py-3"><img src={i.product.image} alt={i.product.name} width={64} height={64} className="h-16 w-16 rounded-md object-contain"/><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{i.product.name}</p><p className="text-sm text-muted-foreground">{i.quantity} × {i.product.price.toLocaleString('kk-KZ')} ₸</p></div></div>)}<div className="flex justify-between py-5 text-xl font-bold"><span>Барлығы</span><span className="text-primary">{totalPrice.toLocaleString('kk-KZ')} ₸</span></div><p className="text-sm text-muted-foreground">Жеткізу — тегін</p>{items.some(i=>i.product.allergens.length>0)&&<p className="mt-4 text-sm text-destructive">Аллергендер: {[...new Set(items.flatMap(i=>i.product.allergens))].join(', ')}. Қаптамадағы құрамды тексеріңіз.</p>}</aside>
      </div></>}
  </main></div>;
}