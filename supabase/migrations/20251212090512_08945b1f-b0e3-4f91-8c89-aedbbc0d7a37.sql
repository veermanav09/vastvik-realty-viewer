-- Drop the existing constraint and recreate with all valid source values
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_source_check;

-- Add updated constraint that includes all valid source values
ALTER TABLE public.leads ADD CONSTRAINT leads_source_check 
CHECK (source IN ('contact', 'brochure_download', 'expression_of_interest'));