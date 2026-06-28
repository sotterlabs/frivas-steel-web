import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { JOB_TYPES } from "@/lib/content";

// --- Config & validation -----------------------------------------------

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25 MB total (typical SMTP limit)
const MAX_FILES = 5;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

const contactSchema = z.object({
  company: z.string().trim().min(2, "Company name is too short").max(150),
  contactName: z.string().trim().min(2, "Contact name is too short").max(120),
  position: z.string().trim().min(2, "Position is too short").max(120),
  phone: z.string().trim().min(7, "Phone number is too short").max(40),
  email: z.string().trim().email("Invalid email address").max(200),
  jobType: z.enum(JOB_TYPES, {
    message: "Please select a job type",
  }),
  description: z
    .string()
    .trim()
    .min(10, "Description is too short")
    .max(5000),
  // simple honeypot field — real users never fill this in
  company_website: z.string().max(0).optional().or(z.literal("")),
});

// --- Rate limiting (basic in-memory, per server instance) --------------
// For multi-instance deployments, replace with a shared store (e.g. Redis).

const rateLimitWindowMs = 10 * 60 * 1000; // 10 minutes
const rateLimitMax = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (t) => now - t < rateLimitWindowMs
  );
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > rateLimitMax;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    const fields = {
      company: String(formData.get("company") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      position: String(formData.get("position") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      jobType: String(formData.get("jobType") ?? ""),
      description: String(formData.get("description") ?? ""),
      company_website: String(formData.get("company_website") ?? ""),
    };

    const parsed = contactSchema.safeParse(fields);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    // Honeypot tripped — silently report success to the bot, do nothing.
    if (parsed.data.company_website) {
      return NextResponse.json({ ok: true });
    }

    const files = formData.getAll("attachments").filter(
      (f): f is File => f instanceof File && f.size > 0
    );

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `You can attach up to ${MAX_FILES} files.` },
        { status: 400 }
      );
    }

    let totalSize = 0;
    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return NextResponse.json(
          { error: `File type not allowed: ${file.name}` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large (max 10MB): ${file.name}` },
          { status: 400 }
        );
      }
      totalSize += file.size;
    }
    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        { error: "Total attachment size exceeds 25MB." },
        { status: 400 }
      );
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      }))
    );

    // --- SMTP transport ---------------------------------------------
    // Configure these in your .env / .env.local file. See .env.example.
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASSWORD,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO_EMAIL) {
      console.error(
        "Contact form: SMTP environment variables are not configured."
      );
      return NextResponse.json(
        {
          error:
            "The contact form is not fully configured yet. Please call or email us directly.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE === "true",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    const {
      company,
      contactName,
      position,
      phone,
      email,
      jobType,
      description,
    } = parsed.data;

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New quote request — ${company} (${jobType})`,
      text: [
        `Company: ${company}`,
        `Contact name: ${contactName}`,
        `Position: ${position}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Job type: ${jobType}`,
        "",
        "Description:",
        description,
      ].join("\n"),
      html: `
        <h2>New quote request</h2>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Contact name:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>Position:</strong> ${escapeHtml(position)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Job type:</strong> ${escapeHtml(jobType)}</p>
        <p><strong>Description:</strong></p>
        <p>${escapeHtml(description).replace(/\n/g, "<br/>")}</p>
      `,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}