-- =====================================================
-- CLEANUP: Remove duplicate SELECT policy on leads table
-- =====================================================

-- Keep the more descriptive policy name
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;

-- The "Only admins can view leads" policy will remain active