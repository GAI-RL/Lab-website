import { useState } from "react";
import Img from "./Img";
import { submitContactMessage } from "../services/api";

const EMPTY = { name: "", email: "", message: "" };

// Collaboration banner + contact form (id="contact").
export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContactMessage(values);
      setValues(EMPTY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="cta-wrap" id="contact">
      <div className="cta-box">
        <div className="cta-bg">
          <Img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80"
            alt=""
          />
        </div>
        <div className="cta-overlay" />
        <div className="cta-content">
          <div className="cta-text">
            <div className="section-tag">Collaborate With Us</div>
            <h2>
              Monitor Research Progress from <span>anywhere</span>
            </h2>
            <p>
              Access our research tools, datasets and collaboration platform
              remotely. Stay connected with the lab's ongoing work and
              contribute from wherever you are.
            </p>
            <a href="#" className="btn-solid" style={{ width: "fit-content" }}>
              <i className="fas fa-rocket" aria-hidden="true" />
              Learn more
            </a>
          </div>

          <div className="cta-form-box">
            <h3 id="contact-form-title">Get in touch with the lab</h3>
            <form onSubmit={handleSubmit} aria-labelledby="contact-form-title">
              <div className="f-row">
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="f-inp"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={handleChange}
                />
                <label htmlFor="contact-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="f-inp"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="contact-message" className="sr-only">
                Your research interest
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="f-ta"
                placeholder="Tell us about your research interest…"
                required
                value={values.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="f-btn"
                disabled={status === "sending"}
              >
                <i className="fas fa-paper-plane" aria-hidden="true" />{" "}
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {status === "success" && (
                <p className="f-status" role="status">
                  Thanks - your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="f-status" role="alert">
                  Sorry, your message could not be sent. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
