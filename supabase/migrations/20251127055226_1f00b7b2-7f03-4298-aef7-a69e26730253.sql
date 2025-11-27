-- =====================================================
-- ADD PERMISSIVE POLICIES (Required by RLS best practices)
-- =====================================================

-- For leads table: Add explicit permissive policy for admins
CREATE POLICY "Permissive: Admins can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- For referrals table: Add explicit permissive policy for admins
CREATE POLICY "Permissive: Admins can view referrals" 
ON public.referrals 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- For user_roles table: Add explicit permissive policies
CREATE POLICY "Permissive: Admins manage all roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Remove old restrictive-only policies
DROP POLICY IF EXISTS "Only admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all referrals" ON public.referrals;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;