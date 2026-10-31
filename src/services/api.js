

// All imports must be at the top of an ES module.
import { supabase } from "../lib/supabaseClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function request(path, options = {}) {
  const { headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: { "Content-Type": "application/json", ...headers },
  });

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.status === 204 ? null : response.json();
}

/**
 * Chatbot (not wired to any UI yet).
 * POST /api/chat   body: { message }   response: { reply }
 */
export async function sendChatMessage(message, { signal } = {}) {
  const data = await request("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
    signal,
  });
  return data.reply;
}

/* ─── Contact form ─── */
export async function submitContactMessage({ name, email, message }) {
  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message });

  if (error) throw new Error(error.message);
  return { ok: true };
}

/* ─── Join Us form ─── */
export async function submitJoinApplication({
  name,
  email,
  phone,
  position,
  area,
  message,
  cvFile,
}) {
  let cvUrl = null;
  let cvFilename = null;

  // Upload CV to Supabase Storage
  if (cvFile) {
    const ext = cvFile.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("cvs")
      .upload(filename, cvFile);

    if (uploadError)
      throw new Error(`CV upload failed: ${uploadError.message}`);

    cvUrl = filename;
    cvFilename = cvFile.name;
  }

  // Insert form submission
  const { error } = await supabase.from("join_submissions").insert({
    full_name: name,
    email,
    phone: phone || null,
    position,
    area,
    message,
    cv_url: cvUrl,
    cv_filename: cvFilename,
  });

  if (error) throw new Error(error.message);
  return { ok: true };
}
