import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Атыңызды толық жазыңыз').max(100),
  phone: z.string().transform(v => { const n = v.replace(/\D/g, ''); return n.startsWith('8') ? '+7' + n.slice(1) : '+' + n; }).pipe(z.string().regex(/^\+7\d{10}$/, 'Қазақстан нөмірін енгізіңіз: +7 777 123 45 67')),
  address: z.string().trim().min(5, 'Мекенжайды толық жазыңыз').max(500),
  payment: z.enum(['kaspi', 'cash']),
  delivery: z.enum(['standard', 'express', 'pickup']),
});
export const deliveryLabels: Record<string,string> = { standard: 'Стандартты — сол күні', express: 'Экспресс — 1–2 сағат', pickup: 'Өзі алып кету' };