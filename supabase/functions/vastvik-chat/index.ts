import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBSITE_CONTEXT = `
You are Vastvik AI Assistant, a helpful and knowledgeable assistant for Vastvik Realty - a premium real estate company in Bangalore.

# VASTVIK REALTY INFORMATION

## PROJECTS

### ELEMENT (ONGOING PROJECT)
- Configuration: 1, 2 & 3 BHK apartments
- Units: 60 UNITS
- Starting Price: ₹38 LAKHS ONWARD
- Location: MARSUR GATE, Plot No. 45, Marsur Gate Main Road, Near City Mall, Bangalore - 560103
- Features: Premium Amenities, Gated Community, 24/7 Security
- Expected Completion: December 2024
- Description: Experience luxury living at Element with modern architecture and world-class amenities. Located in the heart of Marsur Gate with excellent connectivity.
- Land Parcel: Approximately 2.5 acres
- Project Type: Residential Apartments
- Status: ONGOING

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
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Processing chat request with', messages.length, 'messages');

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
