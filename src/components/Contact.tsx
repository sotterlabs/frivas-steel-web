"use client";

import { useRef, useState, type FormEvent } from "react";
import { company as companyInfo, JOB_TYPES } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFilesSelected(selected: FileList | null) {
    if (!selected) return;
    const incoming = Array.from(selected).filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage(`"${file.name}" is over the 10MB limit and was skipped.`);
        return false;
      }
      return true;
    });
    const combined = [...files, ...incoming].slice(0, MAX_FILES);
    setFiles(combined);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    files.forEach((file) => formData.append("attachments", file));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
      setFiles([]);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Couldn't reach the server. Check your connection and try again."
      );
    }
  }

  if (status === "success") {
    return (
      <section id="contacto" className="bg-pastel-50 py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl text-navy-900">
            Message sent
          </h2>
          <p className="mt-4 text-navy-700 leading-relaxed">
            Thanks for reaching out — we&apos;ve received your request and
            will get back to you shortly, usually within one business day.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 inline-flex items-center gap-2 border border-pastel-100 hover:border-navy-900 text-navy-900 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Send another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="bg-pastel-50 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-sky-500 uppercase tracking-wide mb-4">
            Contact
          </p>
          <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900">
            Request a Quote
          </h2>
          <p className="mt-5 text-navy-700 max-w-lg mx-auto leading-relaxed">
            Tell us about your project and attach plans or photos — we&apos;ll
            follow up with next steps.{" "}
            <span className="text-navy-500">
              Hours: {companyInfo.hours}.
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-pastel-100 rounded-3xl p-8 lg:p-12 space-y-6"
        >
          {/* Honeypot — hidden from real users */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Company" htmlFor="company" required>
              <input
                id="company"
                name="company"
                type="text"
                required
                minLength={2}
                maxLength={150}
                placeholder="Acme Construction Ltd."
                className={inputClasses}
              />
            </Field>

            <Field label="Contact name" htmlFor="contactName" required>
              <input
                id="contactName"
                name="contactName"
                type="text"
                required
                minLength={2}
                maxLength={120}
                placeholder="Jane Smith"
                className={inputClasses}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Position in company" htmlFor="position" required>
              <input
                id="position"
                name="position"
                type="text"
                required
                minLength={2}
                maxLength={120}
                placeholder="Project Manager"
                className={inputClasses}
              />
            </Field>

            <Field label="Phone" htmlFor="phone" required>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                minLength={7}
                maxLength={40}
                placeholder="(587) 000-0000"
                className={inputClasses}
              />
            </Field>
          </div>

          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={200}
              placeholder="jane@email.com"
              className={inputClasses}
            />
          </Field>

          <Field label="Type of work requested" htmlFor="jobType" required>
            <select
              id="jobType"
              name="jobType"
              required
              defaultValue=""
              className={inputClasses}
            >
              <option value="" disabled>
                Select a job type
              </option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Project description" htmlFor="description" required>
            <textarea
              id="description"
              name="description"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              placeholder="Tell us about your project — scope, location, timeline…"
              className={inputClasses}
            />
          </Field>

          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-2">
              Attachments{" "}
              <span className="text-navy-500 font-normal">
                (PDF or images — up to {MAX_FILES} files, 10MB each)
              </span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="application/pdf,image/jpeg,image/png,image/webp,image/heic"
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
              id="file-input"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={files.length >= MAX_FILES}
              className="w-full border border-dashed border-pastel-100 hover:border-sky-500 bg-pastel-50 rounded-xl px-5 py-6 text-center text-sm text-navy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {files.length >= MAX_FILES
                ? `Maximum of ${MAX_FILES} files reached`
                : "Click to add files (PDF, JPG, PNG)"}
            </button>

            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between gap-3 bg-pastel-50 border border-pastel-100 rounded-lg px-4 py-2 text-sm"
                  >
                    <span className="truncate text-navy-900">
                      {file.name}
                    </span>
                    <span className="text-navy-500 font-mono text-xs whitespace-nowrap">
                      {formatFileSize(file.size)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      aria-label={`Remove ${file.name}`}
                      className="text-navy-500 hover:text-gold-600 shrink-0"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {status === "error" && (
            <p className="text-sm text-gold-600 bg-gold-500/10 border border-gold-500/30 rounded-lg px-4 py-3">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-navy-900 font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            {status === "submitting" ? "Sending…" : "Send Request"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputClasses =
  "w-full bg-pastel-50 border border-pastel-100 focus:border-sky-500 rounded-xl px-4 py-3 text-navy-900 placeholder:text-navy-500/60 outline-none transition-colors";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-navy-900 mb-2"
      >
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {children}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}