-- =====================================================
-- ADDITIONAL SECURITY IMPROVEMENTS
-- =====================================================

-- Remove the previous referral SELECT policy as it won't work with JWT claims
-- Users don't need to query referrals - they get the code when they create it
DROP POLICY IF EXISTS "Users can view referral by exact code match" ON public.referrals;

-- Add a comment to the table explaining the security model
COMMENT ON TABLE public.referrals IS 'Referral codes are returned on INSERT only. No SELECT access for public to prevent data scraping. Admins can view all.';

-- Add rate limiting on leads table to prevent spam submissions
-- Create a function to check recent submissions from same email
CREATE OR REPLACE FUNCTION public.check_lead_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check if this email has submitted more than 3 times in the last hour
  SELECT COUNT(*) INTO recent_count
  FROM public.leads
  WHERE email = NEW.email
    AND created_at > NOW() - INTERVAL '1 hour';
  
  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add trigger for rate limiting on leads
DROP TRIGGER IF EXISTS check_lead_rate_limit_trigger ON public.leads;
CREATE TRIGGER check_lead_rate_limit_trigger
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.check_lead_rate_limit();

-- Add rate limiting on referrals table
CREATE OR REPLACE FUNCTION public.check_referral_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check if this email has created more than 1 referral in the last 24 hours
  SELECT COUNT(*) INTO recent_count
  FROM public.referrals
  WHERE email = NEW.email
    AND created_at > NOW() - INTERVAL '24 hours';
  
  IF recent_count >= 1 THEN
    RAISE EXCEPTION 'You can only create one referral code per 24 hours.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add trigger for rate limiting on referrals
DROP TRIGGER IF EXISTS check_referral_rate_limit_trigger ON public.referrals;
CREATE TRIGGER check_referral_rate_limit_trigger
  BEFORE INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.check_referral_rate_limit();

-- Add indexes for better performance on email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email_created ON public.leads(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_email_created ON public.referrals(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON public.referrals(created_at DESC);