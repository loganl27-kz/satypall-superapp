CREATE TABLE public.catalog_items (id text PRIMARY KEY, name text NOT NULL, price integer NOT NULL CHECK (price > 0), available boolean NOT NULL DEFAULT true);
GRANT SELECT ON public.catalog_items TO anon, authenticated;
GRANT ALL ON public.catalog_items TO service_role;
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public catalog read" ON public.catalog_items FOR SELECT TO anon, authenticated USING (true);
CREATE TABLE public.orders (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, request_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), customer_name text NOT NULL, phone text NOT NULL, address text NOT NULL, payment_method text NOT NULL CHECK (payment_method IN ('kaspi','cash')), delivery_method text NOT NULL CHECK (delivery_method IN ('standard','express','pickup')), status text NOT NULL DEFAULT 'received', payment_status text NOT NULL DEFAULT 'unpaid', items jsonb NOT NULL, total integer NOT NULL CHECK (total > 0), UNIQUE(user_id,request_id));
GRANT SELECT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own orders" ON public.orders FOR SELECT TO authenticated USING ((SELECT auth.uid()) = user_id);
CREATE INDEX orders_owner_created ON public.orders (user_id,created_at DESC);
CREATE OR REPLACE FUNCTION public.place_order(p_request_id uuid,p_name text,p_phone text,p_address text,p_payment text,p_delivery text,p_items jsonb) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_user uuid := auth.uid(); v_id uuid; v_items jsonb := '[]'::jsonb; v_total integer := 0; v_item jsonb; v_product public.catalog_items%ROWTYPE; v_qty integer;
BEGIN
IF v_user IS NULL THEN RAISE EXCEPTION 'Тапсырыс беру үшін кіріңіз'; END IF;
SELECT id INTO v_id FROM public.orders WHERE user_id=v_user AND request_id=p_request_id; IF FOUND THEN RETURN v_id; END IF;
IF p_request_id IS NULL OR p_name IS NULL OR length(trim(p_name)) NOT BETWEEN 2 AND 100 OR p_phone IS NULL OR p_phone !~ '^\+7[0-9]{10}$' OR p_address IS NULL OR length(trim(p_address)) NOT BETWEEN 5 AND 500 OR p_payment IS NULL OR p_payment NOT IN ('kaspi','cash') OR p_delivery IS NULL OR p_delivery NOT IN ('standard','express','pickup') THEN RAISE EXCEPTION 'Тапсырыс деректерін тексеріңіз'; END IF;
IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) NOT BETWEEN 1 AND 100 THEN RAISE EXCEPTION 'Себет бос немесе тым үлкен'; END IF;
FOR v_item IN SELECT value FROM jsonb_array_elements(p_items) LOOP
IF jsonb_typeof(v_item->'quantity') <> 'number' OR (v_item->>'quantity') !~ '^[0-9]+$' THEN RAISE EXCEPTION 'Тауар саны дұрыс емес'; END IF;
v_qty := (v_item->>'quantity')::integer; IF v_qty NOT BETWEEN 1 AND 99 THEN RAISE EXCEPTION 'Тауар саны 1–99 аралығында болуы тиіс'; END IF;
SELECT * INTO v_product FROM public.catalog_items WHERE id=v_item->>'id' AND available; IF NOT FOUND THEN RAISE EXCEPTION 'Тауар қолжетімсіз'; END IF;
v_total := v_total + v_product.price*v_qty;
v_items := v_items || jsonb_build_array(jsonb_build_object('id',v_product.id,'name',v_product.name,'price',v_product.price,'quantity',v_qty));
END LOOP;
INSERT INTO public.orders(user_id,request_id,customer_name,phone,address,payment_method,delivery_method,items,total) VALUES(v_user,p_request_id,trim(p_name),p_phone,trim(p_address),p_payment,p_delivery,v_items,v_total) ON CONFLICT(user_id,request_id) DO NOTHING RETURNING id INTO v_id;
IF v_id IS NULL THEN SELECT id INTO v_id FROM public.orders WHERE user_id=v_user AND request_id=p_request_id; END IF;
RETURN v_id;
END; $$;
REVOKE ALL ON FUNCTION public.place_order(uuid,text,text,text,text,text,jsonb) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.place_order(uuid,text,text,text,text,text,jsonb) TO authenticated;