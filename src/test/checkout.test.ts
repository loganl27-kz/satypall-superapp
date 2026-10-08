import { describe,it,expect } from 'vitest';
import { checkoutSchema } from '@/lib/checkout';
import { bundleSets } from '@/data/mock-data';
const form={name:'Нурдаулет Кан',phone:'+7 777 123 45 67',address:'Алматы, Абай 50',delivery:'standard',payment:'cash'};
describe('checkout rules',()=>{
  it('requires name phone and address',()=>{for(const key of ['name','phone','address'])expect(checkoutSchema.safeParse({...form,[key]:''}).success).toBe(false);});
  it('accepts Kaspi and cash only',()=>{expect(checkoutSchema.safeParse({...form,payment:'kaspi'}).success).toBe(true);expect(checkoutSchema.safeParse(form).success).toBe(true);expect(checkoutSchema.safeParse({...form,payment:'card'}).success).toBe(false);});
  it('normalizes Kazakhstan phone numbers',()=>{expect(checkoutSchema.parse({...form,phone:'8 (777) 123-45-67'}).phone).toBe('+77771234567');});
  it('keeps family bundle price at 15000 tenge',()=>{expect(bundleSets.find(b=>b.id==='b1')?.price).toBe(15000);});
  it('keeps student bundle price at 10000 tenge',()=>{expect(bundleSets.find(b=>b.id==='b2')?.price).toBe(10000);});
  it('keeps healthy bundle price at 20000 tenge',()=>{expect(bundleSets.find(b=>b.id==='b3')?.price).toBe(20000);});
});