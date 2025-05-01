"use client"; // Mark as client component since it uses state

import { useState, useEffect, useRef } from "react";
import Container from "../components/container/Container";
import gsap from "gsap";

// Metadata is exported separately in Next.js app router
// Should be in a separate metadata.js file or in layout.js
export const metadata = {
  title: "Contact Us | Your Company Name",
  description:
    "Get in touch with our team. We're here to help with any questions or inquiries.",
  openGraph: {
    title: "Contact Us | Your Company Name",
    description:
      "Get in touch with our team. We're here to help with any questions or inquiries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Your Company Name",
    description:
      "Get in touch with our team. We're here to help with any questions or inquiries.",
  },
};

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ sent: false, error: null });
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for GSAP animations
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const introTextRef = useRef(null);
  const statusRef = useRef(null);

  // Initialize animations when component mounts
  useEffect(() => {
    // Initial animations
    gsap.from(headingRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out"
    });
    
    gsap.from(introTextRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out"
    });
    
    gsap.from(formRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.5,
      ease: "power3.out"
    });
  }, []);

  // Animate status message when it appears
  useEffect(() => {
    if (showMessage && statusRef.current) {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [showMessage]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateEmail(formData.email)) {
      setStatus({ sent: false, error: "Please enter a valid email address." });
      setShowMessage(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Dynamically import emailjs only when needed
      const emailjs = await import("emailjs-com");

      await emailjs.default.send(
        "service_goieppj",
        "template_o43tv2c",
        formData,
        "tiYk2CeGyDP4j3qPN"
      );

      setStatus({ sent: true, error: null });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      setStatus({
        sent: false,
        error: "Failed to send message. Please try again later.",
      });
    } finally {
      setShowMessage(true);
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="bg-white dark:bg-black text-black dark:text-white py-8 md:py-16 px-4 min-h-screen flex justify-center items-center"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h1
              ref={headingRef}
              id="contact-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-afacad font-bold mb-4 md:mb-8"
            >
              Contact Us
            </h1>
            <p 
              ref={introTextRef}
              className="text-base md:text-lg mb-6 md:mb-10"
            >
              Have questions or feedback? We'd love to hear from you. Fill out
              the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div 
              ref={formRef}
              className="w-full backdrop-blur-2xl border py-6 md:py-10 px-4 md:px-6 rounded-2xl"
            >
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4 md:space-y-6 flex flex-col justify-center"
                aria-label="Contact form"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl outline-none bg-transparent dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your name"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl outline-none bg-transparent dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="youremail@example.com"
                    aria-required="true"
                    aria-describedby="email-error"
                  />
                  {status.error && status.error.includes("email") && (
                    <p
                      id="email-error"
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {status.error}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl outline-none bg-transparent dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="How can we help you?"
                    aria-required="true"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black dark:bg-white text-white dark:text-black font-afacad py-2 md:py-3 px-4 md:px-6 rounded-xl hover:opacity-90 transition-opacity focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {showMessage && (
          <div
            ref={statusRef}
            className={`mt-6 p-4 rounded-xl ${
              status.sent
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
            } relative`}
            role="alert"
            aria-live="assertive"
          >
            <p>
              {status.sent
                ? "Message sent successfully! We will get back to you soon."
                : status.error}
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-2 right-2 text-xl font-bold focus:outline-none"
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

// Properly handle Next.js metadata export
export default ContactForm;