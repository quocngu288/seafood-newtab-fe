"use client";

import { FormEvent, useState } from "react";
import { publicApi } from "@/lib/api/client";

type ContactFormProps = {
  labels: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    message: string;
    newsletter: string;
    send: string;
  };
};

function UnderlineField({
  id,
  label,
  type = "text",
  multiline = false,
  className = "",
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  multiline?: boolean;
  className?: string;
  required?: boolean;
}) {
  const fieldClass =
    "hh-text-base w-full border-0 border-b border-gray-300 bg-transparent py-2 text-gray-900 placeholder:text-gray-400 focus:border-hh-blue focus:outline-none focus:ring-0 sm:py-2.5";

  return (
    <div className={className}>
      <label htmlFor={id} className="hh-text-sm block font-medium text-gray-600">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          required={required}
          className={`${fieldClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className={fieldClass}
        />
      )}
    </div>
  );
}

export function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await publicApi.submitContact({
        fullName: String(data.get("fullName") ?? ""),
        phone: String(data.get("phone") ?? ""),
        email: String(data.get("email") ?? ""),
        address: String(data.get("address") ?? ""),
        message: String(data.get("message") ?? ""),
        newsletter: data.get("newsletter") === "on",
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Gửi thất bại");
    }
  }

  return (
    <form className="flex flex-1 flex-col p-5 sm:p-8 lg:p-10" onSubmit={handleSubmit}>
      <UnderlineField id="fullName" label={labels.fullName} required />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
        <UnderlineField id="phone" label={labels.phone} type="tel" required />
        <UnderlineField id="email" label={labels.email} type="email" required />
      </div>
      <UnderlineField id="address" label={labels.address} className="mt-6" />
      <UnderlineField
        id="message"
        label={labels.message}
        multiline
        className="mt-6"
        required
      />

      {status === "success" && (
        <p className="hh-text-sm mt-4 text-green-700">
          Tin nhắn đã được gửi thành công. Chúng tôi sẽ liên hệ sớm.
        </p>
      )}
      {status === "error" && (
        <p className="hh-text-sm mt-4 text-hh-red">{error}</p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
        <label className="hh-text-base flex cursor-pointer items-center gap-2.5 text-gray-700">
          <input
            type="checkbox"
            name="newsletter"
            className="h-4 w-4 rounded border-gray-300 text-hh-red focus:ring-hh-red"
          />
          {labels.newsletter}
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="hh-text-base w-full rounded-full bg-hh-red px-10 py-3 font-semibold text-white transition hover:bg-hh-red-hover disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "..." : labels.send}
        </button>
      </div>
    </form>
  );
}
