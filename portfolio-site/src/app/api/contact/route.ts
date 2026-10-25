const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "This request is not allowed." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected a JSON request." }, { status: 415 });
  }
  const body = await request.text();
  if (body.length > 12000) {
    return Response.json({ error: "Your message is too long." }, { status: 413 });
  }
  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isRecord(data)) {
    return Response.json({ error: "Please complete the contact form." }, { status: 400 });
  }
  const fields = data;
  const field = (key: string) =>
    typeof fields[key] === "string" ? fields[key].trim() : "";
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const message = field("message");
  if (field("website")) {
    return Response.json({ error: "This submission was rejected." }, { status: 400 });
  }
  if (
    !name || name.length > 100 || /[\r\n]/.test(name) ||
    !emailPattern.test(email) || email.length > 254 ||
    (phone && !/^[+()\d\s.-]{5,40}$/.test(phone)) ||
    !message || message.length > 5000
  ) {
    return Response.json({ error: "Please provide a valid name, email, phone (if supplied), and message." }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact email delivery is not configured.");
    return Response.json({
      error: "The contact form is temporarily unavailable. Please email suranjanaghosh2312@gmail.com directly.",
    }, { status: 503 });
  }
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: ["suranjanaghosh2312@gmail.com"],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    console.error("Contact email provider could not be reached.");
    return Response.json({ error: "Email delivery is unavailable. Please try again later." }, { status: 502 });
  }
  if (!response.ok) {
    console.error("Contact email provider rejected the request.", { status: response.status });
    return Response.json({ error: "Your message could not be sent. Please try again later." }, { status: 502 });
  }
  return Response.json({ sent: true });
}
