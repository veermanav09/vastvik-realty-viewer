# Security Documentation

## Security Measures Implemented

This document outlines all security measures implemented in the Vastvik Realty application to protect user data and prevent vulnerabilities.

### 1. Database Security (Supabase)

#### Row-Level Security (RLS) Policies

**Leads Table:**
- ✅ Only admins can view leads data
- ✅ Anyone can insert leads (for form submissions)
- ✅ Admins can update and delete leads
- ✅ Rate limiting: Max 3 submissions per hour per email

**Referrals Table:**
- ✅ Only admins can view all referrals
- ✅ Anyone can insert referrals (for generating codes)
- ✅ No public SELECT policy to prevent data scraping
- ✅ Referral codes returned on INSERT only
- ✅ Rate limiting: 1 referral code per 24 hours per email
- ✅ Admins can update and delete referrals

**User Roles Table:**
- ✅ Only admins can manage roles
- ✅ Users can view their own roles
- ✅ Prevents privilege escalation attacks

#### SQL Injection Prevention

- ✅ All database functions use `SECURITY DEFINER` with `SET search_path = public`
- ✅ Supabase client handles parameterized queries automatically
- ✅ No raw SQL execution in application code

#### Rate Limiting

Database-level rate limiting implemented via triggers:
- **Leads**: Maximum 3 submissions per hour per email
- **Referrals**: Maximum 1 code generation per 24 hours per email

### 2. Input Validation

#### Client-Side Validation (Zod Schema)

All forms implement strict validation:

```typescript
- Name: Max 100 characters, required
- Email: Valid email format, max 255 characters, required
- Phone: 10-15 digits, valid phone format, required
- Message: Max 1000 characters, optional
```

#### Sanitization

- ✅ All inputs trimmed before submission
- ✅ Type checking enforced via TypeScript
- ✅ Regex validation for phone numbers
- ✅ Email format validation

### 3. XSS (Cross-Site Scripting) Prevention

- ✅ React automatically escapes JSX content
- ✅ `dangerouslySetInnerHTML` only used with hardcoded content in BlogDetail.tsx
- ⚠️ **IMPORTANT**: If blog content ever comes from user input, MUST use DOMPurify

### 4. Authentication & Authorization

- ✅ Role-based access control (admin, moderator, user)
- ✅ Security definer functions for role checks
- ✅ Users cannot check admin status without proper authentication
- ⚠️ Authentication not yet implemented (admin features currently unavailable)

### 5. Data Privacy

#### Personal Information Protection

- ✅ No public access to customer emails, phones, or names
- ✅ Leads and referrals only visible to admins
- ✅ No sensitive data logged to console
- ✅ HTTPS enforced (handled by Supabase)

#### API Keys

- ✅ No sensitive API keys in client-side code
- ✅ Mapbox token is a public/publishable key (safe to expose)
- ✅ Supabase keys stored securely in environment

### 6. Error Handling

- ✅ User-friendly error messages (no technical details exposed)
- ✅ Rate limit errors clearly communicated
- ✅ No stack traces sent to client
- ✅ Errors logged server-side only

### 7. Performance & DoS Prevention

#### Rate Limiting
- Database-level enforcement prevents spam
- Frontend shows user-friendly messages

#### Database Indexes
Optimized queries with indexes on:
- `leads(email, created_at DESC)`
- `referrals(email, created_at DESC)`
- `leads(created_at DESC)`
- `referrals(created_at DESC)`

### 8. Code Quality

- ✅ TypeScript for type safety
- ✅ No console.log statements with sensitive data
- ✅ Proper React Router usage (no full page reloads)
- ✅ Secure CORS configuration in edge functions

## Security Checklist for Future Development

When adding new features, ensure:

- [ ] All forms have Zod validation
- [ ] RLS policies are configured for new tables
- [ ] Rate limiting is considered for submission forms
- [ ] No sensitive data in console.logs
- [ ] Error messages don't expose system internals
- [ ] Database functions use SECURITY DEFINER with search_path
- [ ] User input is never used in dangerouslySetInnerHTML without sanitization
- [ ] API keys are not exposed in client code

## Reporting Security Issues

If you discover a security vulnerability, please email security@vastvikrealty.com

## Regular Security Audits

- Run `supabase db lint` regularly to check for security issues
- Review RLS policies when adding new tables
- Update dependencies to patch security vulnerabilities
- Monitor rate limiting logs for abuse patterns

## Known Limitations

1. **Authentication Not Implemented**: Admin features will not work until authentication is set up
2. **OTP Verification Mock**: Download brochure OTP flow is UI-only, needs backend integration
3. **Email Notifications**: Form submissions don't send emails yet (needs edge function)

## Acceptable Security Warnings

The following security warnings from Supabase linter are **intentional design decisions**:

### Unauthenticated Form Submissions
**Warning**: "Leads and Referrals tables allow unauthenticated insertion"

**Why This Is Acceptable**:
- ✅ Contact forms MUST work without requiring users to sign up
- ✅ Rate limiting prevents abuse (3 submissions/hour for leads, 1/24h for referrals)
- ✅ Only INSERT is allowed - no public SELECT/UPDATE/DELETE
- ✅ Admin-only access to view data prevents scraping
- ✅ Input validation prevents malformed data
- ✅ Database triggers enforce rate limits at the database level

**Risk Mitigation**:
1. Rate limiting via database triggers
2. Client-side validation (Zod schemas)
3. Server-side validation (database constraints)
4. Email format validation
5. Phone number format validation
6. Admin-only data access

This design prioritizes user experience (no signup required) while maintaining security through multiple layers of protection.

## Last Updated

2025-11-27 - Initial security documentation created
2025-11-27 - Added section on acceptable security warnings
