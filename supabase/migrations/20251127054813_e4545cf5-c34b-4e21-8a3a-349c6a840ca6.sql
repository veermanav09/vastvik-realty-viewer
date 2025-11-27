-- =====================================================
-- CRITICAL SECURITY FIXES
-- =====================================================

-- 1. FIX CRITICAL: Remove dangerous public access to referrals table
-- The current policy allows ANYONE to view ALL referrals (emails, phones, names)
DROP POLICY IF EXISTS "Anyone can view their own referral by code" ON public.referrals;

-- Create secure policy: Only allow users to view referrals by providing the exact code
-- This ensures users can only see their own referral after generating it
CREATE POLICY "Users can view referral by exact code match" 
ON public.referrals 
FOR SELECT 
USING (
  referral_code = current_setting('request.jwt.claims', true)::json->>'referral_code'
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- 2. FIX CRITICAL: Ensure leads table has proper SELECT restrictions
-- Only admins should be able to view all leads data
DROP POLICY IF EXISTS "Anyone can view leads" ON public.leads;

CREATE POLICY "Only admins can view leads" 
ON public.leads 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. FIX: Allow users to check their own roles for proper authorization
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- 4. FIX: Set search_path on functions to prevent SQL injection
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate random 8-character alphanumeric code
    code := 'VAST' || UPPER(substring(md5(random()::text) from 1 for 6));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.referrals WHERE referral_code = code) INTO code_exists;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  RETURN code;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;