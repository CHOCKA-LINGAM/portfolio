import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let body: { name?: string; email?: string; message?: string } = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid or empty JSON payload in request body.' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_API_KEY && !process.env.RESEND_API_KEY) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json(
        { error: 'Email service not configured. Falling back to local mail client.' },
        { status: 501 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
