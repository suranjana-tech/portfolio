const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPICS = ["Job opportunity", "Collaboration", "Just saying hi"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Accepts the form's /viewform or /formResponse link and returns the POST target.
function googleFormAction(raw: string) {
  try {
    const url = new URL(raw);
    url.search = "";
    url.hash = "";
    url.pathname = `${url.pathname.replace(/\/(viewform|formResponse)\/?$/, "")}/formResponse`;
    return url.toString();
  } catch {
    return null;
  }
}

function entryKey(value: string | undefined) {
  const key = value?.trim();
  if (!key) {
    return null;
  }
  return key.startsWith("entry.") ? key : `entry.${key}`;
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
  const topic = field("topic");
  if (field("website")) {
    return Response.json({ error: "This submission was rejected." }, { status: 400 });
  }
  if (
    !name || name.length > 100 || /[\r\n]/.test(name) ||
    !emailPattern.test(email) || email.length > 254 ||
    (phone && !/^[+()\d\s.-]{5,40}$/.test(phone)) ||
    (topic && !TOPICS.includes(topic)) ||
    !message || message.length > 5000
  ) {
    return Response.json({ error: "Please provide a valid name, email, phone (if supplied), and message." }, { status: 400 });
  }
  const fullMessage = topic ? `Topic: ${topic}\n\n${message}` : message;

  const googleFormUrl = process.env.GOOGLE_FORM_URL;
  if (googleFormUrl) {
    const action = googleFormAction(googleFormUrl);
    const nameKey = entryKey(process.env.GOOGLE_FORM_ENTRY_NAME);
    const emailKey = entryKey(process.env.GOOGLE_FORM_ENTRY_EMAIL);
    const messageKey = entryKey(process.env.GOOGLE_FORM_ENTRY_MESSAGE);
    const phoneKey = entryKey(process.env.GOOGLE_FORM_ENTRY_PHONE);
    if (!action || !nameKey || !emailKey || !messageKey) {
      console.error("Google Form delivery is only partly configured.");
      return Response.json({
        error: "The contact form is temporarily unavailable. Please email suranjanaghosh2312@gmail.com directly.",
      }, { status: 503 });
    }
    const params = new URLSearchParams();
    params.set(nameKey, name);
    params.set(emailKey, email);
    params.set(messageKey, fullMessage);
    if (phoneKey) {
      params.set(phoneKey, phone || "Not provided");
    }
    let formResponse: Response;
    try {
      // Google answers 200 when it records a response; a redirect means the form is private.
      formResponse = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        redirect: "manual",
        signal: AbortSignal.timeout(15000),
      });
    } catch (error) {
      const reason =
        error instanceof Error && error.cause && typeof error.cause === "object" && "code" in error.cause
          ? String(error.cause.code)
          : "unknown";
      console.error("Google Form could not be reached.", { reason });
      return Response.json({ error: "Message delivery is unavailable. Please try again later." }, { status: 502 });
    }
    if (formResponse.status !== 200) {
      console.error("Google Form rejected the submission.", { status: formResponse.status });
      return Response.json({ error: "Your message could not be sent. Please try again later." }, { status: 502 });
    }
    return Response.json({ sent: true });
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
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\n${fullMessage}`,
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
