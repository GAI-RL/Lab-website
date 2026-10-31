import { useState } from "react";
import { submitJoinApplication } from "../services/api";
const AREAS = [
  { value: "agentic-ai", label: "Agentic AI" },
  { value: "agriculture", label: "GenAI in Agriculture" },
  { value: "medical", label: "GenAI in Medical" },
  { value: "education", label: "GenAI in Education" },
  { value: "bioinformatics", label: "GenAI in Bioinformatics" },
  { value: "cyber-security", label: "GenAI in Cyber Security" },
];
const POSITIONS = [
  { value: "intern", label: "Internship" },
  { value: "student", label: "Student Researcher" },
  { value: "volunteer", label: "Volunteer" },
];
export default function JoinUsForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "intern",
    area: "agentic-ai",
    message: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const okTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!okTypes.includes(file.type)) {
      setStatus({
        type: "error",
        msg: "Please upload a PDF, DOC, or DOCX file.",
      });
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: "error", msg: "File is too large. Max size is 5 MB." });
      e.target.value = "";
      return;
    }

    setCvFile(file);
    setStatus({ type: "", msg: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", msg: "Please fill in all required fields." });
      return;
    }
    if (!cvFile) {
      setStatus({ type: "error", msg: "Please attach your CV." });
      return;
    }

    setSubmitting(true);

    try {
      await submitJoinApplication({
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        area: form.area,
        message: form.message,
        cvFile,
      });

      setStatus({
        type: "success",
        msg: "Thank you! Your application has been received.",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        position: "intern",
        area: "agentic-ai",
        message: "",
      });
      setCvFile(null);
      e.target.reset();
    } catch (err) {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="join-form" onSubmit={handleSubmit} noValidate>
      <h3 className="join-form-title">Application Form</h3>

      <div className="form-row">
        <label>
          Full Name *
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          Email *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 0000000"
          />
        </label>

        <label>
          Position *
          <div className="custom-dropdown">
            <button
              type="button"
              className="custom-dropdown-trigger"
              onClick={() => setPositionOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={positionOpen}
            >
              <span>
                {POSITIONS.find((p) => p.value === form.position)?.label ||
                  "Select a position"}
              </span>
              <i
                className={`fa-solid fa-chevron-down custom-dropdown-arrow ${
                  positionOpen ? "open" : ""
                }`}
              />
            </button>

            {positionOpen && (
              <ul className="custom-dropdown-menu" role="listbox">
                {POSITIONS.map((p) => (
                  <li
                    key={p.value}
                    role="option"
                    aria-selected={form.position === p.value}
                    className={`custom-dropdown-item ${
                      form.position === p.value ? "is-selected" : ""
                    }`}
                    onClick={() => {
                      setForm({ ...form, position: p.value });
                      setPositionOpen(false);
                    }}
                  >
                    {p.label}
                    {form.position === p.value && (
                      <i className="fa-solid fa-check" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
      </div>

      {/* ── Research Area — Custom Dropdown ── */}
      <label className="full">
        Research Area of Interest
        <div className="custom-dropdown">
          <button
            type="button"
            className="custom-dropdown-trigger"
            onClick={() => setAreaOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={areaOpen}
          >
            <span>
              {AREAS.find((a) => a.value === form.area)?.label ||
                "Select an area"}
            </span>
            <i
              className={`fa-solid fa-chevron-down custom-dropdown-arrow ${
                areaOpen ? "open" : ""
              }`}
            />
          </button>

          {areaOpen && (
            <ul className="custom-dropdown-menu" role="listbox">
              {AREAS.map((a) => (
                <li
                  key={a.value}
                  role="option"
                  aria-selected={form.area === a.value}
                  className={`custom-dropdown-item ${
                    form.area === a.value ? "is-selected" : ""
                  }`}
                  onClick={() => {
                    setForm({ ...form, area: a.value });
                    setAreaOpen(false);
                  }}
                >
                  {a.label}
                  {form.area === a.value && <i className="fa-solid fa-check" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      <label className="full">
        Why do you want to join? *
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us a bit about yourself, your interests, and what you'd like to work on."
          rows={5}
          required
        />
      </label>

      <label className="full file-upload">
        Upload CV (PDF / DOC, max 5 MB) *
        <div className="file-drop">
          <i className="fa-solid fa-cloud-arrow-up" />
          <span className="file-name">
            {cvFile ? cvFile.name : "Click to choose a file"}
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFile}
            required
          />
        </div>
      </label>

      <button type="submit" className="btn-solid" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Application"}
        {!submitting && <i className="fa-solid fa-arrow-right" />}
      </button>

      {status.msg && (
        <p className={`form-status ${status.type}`}>{status.msg}</p>
      )}
    </form>
  );
}
