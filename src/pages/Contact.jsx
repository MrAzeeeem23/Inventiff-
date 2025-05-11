"use client";

import { useState, useEffect, useRef } from "react";
import Container from "../components/container/Container";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";

export const metadata = {
  title: "Contact Us | Your Company Name - Get in Touch With Our Team",
  description:
    "Have questions or need assistance? Our team is ready to help. Fill out our contact form for quick responses to your inquiries about our services and solutions.",
  openGraph: {
    title: "Contact Us | Your Company Name - Get in Touch With Our Team",
    description:
      "Have questions or need assistance? Our team is ready to help. Fill out our contact form for quick responses to your inquiries about our services and solutions.",
    type: "website",
    url: "https://yourcompany.com/contact",
    images: [
      {
        url: "https://yourcompany.com/images/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Your Company Name",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Your Company Name - Get in Touch With Our Team",
    description:
      "Have questions or need assistance? Our team is ready to help. Fill out our contact form for quick responses to your inquiries about our services and solutions.",
    site: "@yourcompanyhandle",
    creator: "@yourcompanyhandle",
    images: ["https://yourcompany.com/images/contact-twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://yourcompany.com/contact",
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const subjectInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Your Company Name",
    "description": "Contact form for Your Company Name. Reach out to our team with any questions or inquiries.",
    "url": "https://yourcompany.com/contact",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["English"],
      "areaServed": ["US", "CA", "UK", "AU"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", 
          "Thursday", "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Your Company Name",
      "logo": "https://yourcompany.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/yourcompany",
        "https://www.twitter.com/yourcompany",
        "https://www.linkedin.com/company/yourcompany",
        "https://www.instagram.com/yourcompany"
      ]
    }
  };

  useEffect(() => {
    // Only prevent automatic scrolling when component loads
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
    
    return () => {
      // Reset scroll restoration behavior when component unmounts
      if (typeof window !== 'undefined') {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const focusInvalidField = () => {
    if (formErrors.name) nameInputRef.current?.focus();
    else if (formErrors.email) emailInputRef.current?.focus();
    else if (formErrors.subject) subjectInputRef.current?.focus();
    else if (formErrors.message) messageInputRef.current?.focus();
  };

  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      focusInvalidField();
    }
  }, [formErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const emailjs = await import("emailjs-com");

      await emailjs.default.send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_API_KEY
      );

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section 
        className="bg-white dark:bg-black text-black dark:text-white py-16 md:py-24 px-4 min-h-screen flex justify-center items-center"
        aria-labelledby="contact-heading"
      >
        <Container>
          <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
            <div className="w-full lg:w-2/5">
              <h1
                id="contact-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-afacad font-bold mb-6"
              >
                We'd Love To Hear From You
              </h1>
              
              <p className="text-base md:text-lg mb-8 text-gray-700 dark:text-gray-300">
                Have questions or feedback? Our team is ready to assist. 
                Fill out the form, and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="mailto:info@yourcompany.com" className="hover:underline">
                        info@yourcompany.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      <a href="tel:+15551234567" className="hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <address className="text-gray-600 dark:text-gray-400 not-italic">
                      123 Business Avenue<br />
                      Suite 200<br />
                      San Francisco, CA 94107
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-3/5">
              <div className="w-full backdrop-blur-2xl bg-white/5 dark:bg-black/10 border border-gray-200 dark:border-gray-800 py-8 md:py-10 px-6 md:px-8 rounded-2xl shadow-lg">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="w-full space-y-5 md:space-y-6 flex flex-col justify-center"
                  aria-label="Contact form"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={nameInputRef}
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none bg-gray-50 dark:bg-gray-900 dark:text-white border ${
                        formErrors.name 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500" 
                          : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      } transition`}
                      placeholder="John Doe"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                    />
                    {formErrors.name && (
                      <p
                        id="name-error"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      ref={emailInputRef}
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none bg-gray-50 dark:bg-gray-900 dark:text-white border ${
                        formErrors.email 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500" 
                          : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      } transition`}
                      placeholder="johndoe@example.com"
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                    />
                    {formErrors.email && (
                      <p
                        id="email-error"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      ref={subjectInputRef}
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl outline-none bg-gray-50 dark:bg-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      ref={messageInputRef}
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none bg-gray-50 dark:bg-gray-900 dark:text-white border ${
                        formErrors.message 
                          ? "border-red-500 focus:ring-2 focus:ring-red-500" 
                          : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      } transition`}
                      placeholder="How can we help you?"
                      aria-required="true"
                      aria-invalid={!!formErrors.message}
                      aria-describedby={formErrors.message ? "message-error" : undefined}
                    ></textarea>
                    {formErrors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-xl md:text-2xl font-medium mb-6">Follow Us</h2>
            <div className="flex justify-center space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/yourcompany`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="sr-only">Follow us on {social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>
      
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </>
  );
}