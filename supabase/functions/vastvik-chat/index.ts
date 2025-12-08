import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting: Track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 15; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

// Message limits
const MAX_MESSAGE_LENGTH = 1000;
const MAX_CONVERSATION_HISTORY = 20;

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_MAX) {
    return false;
  }

  clientData.count++;
  return true;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_CONVERSATION_HISTORY) {
    return { valid: false, error: `Too many messages. Maximum ${MAX_CONVERSATION_HISTORY} allowed.` };
  }

  for (const msg of messages) {
    if (typeof msg !== 'object' || msg === null) {
      return { valid: false, error: "Invalid message format" };
    }

    const message = msg as { role?: unknown; content?: unknown };

    if (typeof message.role !== 'string' || !['user', 'assistant', 'system'].includes(message.role)) {
      return { valid: false, error: "Invalid message role" };
    }

    if (typeof message.content !== 'string') {
      return { valid: false, error: "Message content must be a string" };
    }

    if (message.content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.` };
    }
  }

  return { valid: true };
}

const WEBSITE_CONTEXT = `
You are Vastvik AI Assistant, a helpful and knowledgeable assistant for Vastvik Realty - a premium real estate company in Bangalore.

# VASTVIK REALTY INFORMATION

## PROJECTS

### ELEMENT (ONGOING PROJECT)
- Configuration: 2 & 3 BHK apartments
- Units: 60 UNITS
- Starting Price: ₹45 LAKHS ONWARD
- Location: MARSUR GATE, Sy.No-340/2&3, Marsur gate, opp M tres school, chandapura, anekal main road, bengaluru -562106
- Features: Premium Amenities, Gated Community, 24/7 Security
- Expected Completion: April 2027
- Description: Vastvik Element is a luxury residential apartment project recently launched by Vastvik Realty at Marsur Gate, off Chandapura Road near Electronic City in South East Bangalore. Element comprises some of the best luxuries of living, offering expansive 2 and 3 BHK apartments set amidst beautifully landscaped open spaces. The project prioritizes comfort and an elite lifestyle for the residents who value quality and convenience. Situated at prime area in Marsur Gate, it connects with the Outer Ring Road, Electronic City, Sarjapur Road and HSR Layout.
- Project Type: Residential Apartments
- Status: ONGOING

## ELEMENT - NEARBY LOCATIONS

### Educational Institutions:
- Sri Chaitanya School
- SFS Academy
- National Public School
- D-Sales Academy
- Swami Vivekanada College
- Alliance University
- Spoorthi Institute

### Hospitals:
- Narayana Institution
- Oxford Medical Institute
- Best Hospital
- Athreya Hospital
- Sparsh Hospital

### Corporate Hubs:
- Infosys
- Biocon
- Tech Machindra
- TCS
- Siemens
- Wipro

### Retail & Entertainment:
- M5
- Royal Mart
- D Mart
- Metro Cash and Carry

## ELEMENT - AMENITIES
- Swimming Pool
- Gym
- Jogging Track
- Outdoor Gym
- Event Plaza
- Flex Court
- Pet Park
- Elders Park Seater
- Yoga Deck
- Seater Area
- Banquet Hall
- Deck Area
- Sand Pit
- Toddlers Pit
- Security Room
- Store Room
- Transformer

### HIGH RISE (UPCOMING PROJECT)
- Configuration: 2 & 3 BHK apartments  
- Units: 120 UNITS
- Starting Price: ₹60 LAKHS ONWARD
- Location: CHANDAPURA MAIN ROAD, Survey No. 128, Chandapura Main Road, Near Tech Park, Bangalore - 560099
- Features: Sky Lounge, Swimming Pool, Gym & Spa
- Expected Completion: Q2 2025
- Description: Elevate your lifestyle with High Rise, featuring panoramic views and premium amenities. A perfect blend of luxury and convenience on Chandapura Main Road.
- Land Parcel: Approximately 4 acres
- Project Type: High Rise Residential
- Status: UPCOMING

## CONTACT INFORMATION
- Phone: +91 88845 45404
- Address: Bangalore, Karnataka
- Services: Real estate development, Property sales, Site visits, Referral program

## REFERRAL PROGRAM
- Earn up to 2% commission on successful referrals
- Easy process to join and refer customers

## COMPANY VALUES
- Building luxury homes with modern amenities
- Focus on prime locations in Bangalore
- Commitment to quality and customer satisfaction
- Gated communities with 24/7 security

# INSTRUCTIONS
- Always be helpful, professional, and enthusiastic
- Provide accurate information from the context above
- If asked about specific details not in the context, suggest contacting the team at +91 88845 45404
- Encourage users to schedule site visits or download brochures
- Keep responses concise and friendly
- Use Indian numbering system for prices (lakhs, crores)
- When mentioning land parcels, refer to the information above
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(JSON.stringify({ 
        error: "Too many requests. Please wait a moment before trying again." 
      }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages } = body;

    // Validate messages
    const validation = validateMessages(messages);
    if (!validation.valid) {
      console.log(`Validation failed: ${validation.error}`);
      return new Response(JSON.stringify({ 
        error: validation.error 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Processing chat request with', messages.length, 'messages from IP:', clientIP);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: WEBSITE_CONTEXT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Service temporarily unavailable. Please try again later." 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service error");
    }

    const data = await response.json();
    console.log('AI response received successfully');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in vastvik-chat:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
