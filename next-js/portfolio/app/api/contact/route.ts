import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // In a production environment, you would use a service like Resend, SendGrid, or NodeMailer here.
    // Example with Resend (requires RESEND_API_KEY in .env):
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['your-email@example.com'],
      subject: `Portfolio Contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    */

    // For this portfolio, if the API key isn't set, we simulate a network delay
    // and return a 501 Not Implemented so the client can fallback to mailto:
    if (!process.env.EMAIL_API_KEY && !process.env.RESEND_API_KEY) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json(
        { error: 'Email service not configured. Falling back to local mail client.' },
        { status: 501 }
      );
    }

    // If an API key was configured, assume success for the sake of the mock
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
