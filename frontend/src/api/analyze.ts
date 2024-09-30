import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk'; // Assuming Groq SDK is installed and supports ES6 imports

const GROQ_API_KEY = process.env.GROQ_API_KEY; // Ensure this is set in your .env.local

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: 'GROQ_API_KEY is not set' }, { status: 500 });
  }

  try {
    const { image, textPrompt } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const groq = new Groq({ apiKey: GROQ_API_KEY });

    // Prepare the completion request to Groq API
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": textPrompt || "Describe what this equipment is and what is its use, if it is a machine explain how to use it"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": image  // Pass the Base64 image URL here
              }
            }
          ]
        }
      ],
      "model": "llava-v1.5-7b-4096-preview",
      "temperature": 0,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "stop": null
    });

    const result = chatCompletion.choices[0]?.message?.content;

    if (!result) {
      return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}
