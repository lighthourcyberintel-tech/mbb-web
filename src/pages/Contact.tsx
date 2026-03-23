import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { usePageContent } from "../hooks/usePageContent";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  interest: z.string().min(1, "Please select an interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const interests = [
  "Group Classes",
  "Personal Training",
  "Membership Info",
  "General Inquiry",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { getSectionContent } = usePageContent("contact");

  const heroTitle = getSectionContent("hero_title", "Get in Touch");
  const heroSubtitle = getSectionContent(
    "hero_subtitle",
    "Ready to start your journey? Have a question? We would love to hear from you."
  );
  const address = getSectionContent(
    "address",
    "Topeka, KS"
  );
  const phone = getSectionContent("phone", "(785) 000-0000");
  const email = getSectionContent("email", "hello@mindandbodybybre.com");
  const hours = getSectionContent(
    "hours",
    "Mon-Fri: 6AM-8PM | Sat: 8AM-12PM | Sun: Closed"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError("");
      await axios.post(API_ENDPOINTS.contact, data);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Contact | Mind and Body by Bre</title>
        <meta
          name="description"
          content="Contact Mind and Body by Bre in Topeka, KS. Reach out about group classes, personal training, memberships, or general inquiries."
        />
      </Helmet>

      <section className="section-padding bg-teal text-white">
        <div className="container-max text-center">
          <p className="text-olive font-semibold text-sm uppercase tracking-widest mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto">
            {heroTitle}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Send Us a Message</h2>

              {submitted ? (
                <div className="card p-8 text-center">
                  <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail size={28} className="text-olive" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-charcoal-light">
                    Thank you for reaching out. We will get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Name *
                    </label>
                    <input
                      {...register("name")}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      I'm Interested In *
                    </label>
                    <select
                      {...register("interest")}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent bg-white"
                    >
                      <option value="">Select an option</option>
                      {interests.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                    {errors.interest && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.interest.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-vertical"
                      placeholder="Tell us about your fitness goals..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-sm">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className="section-title">Business Info</h2>
              <div className="card p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Address</h3>
                    <p className="text-charcoal-light text-sm">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Phone</h3>
                    <p className="text-charcoal-light text-sm">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Email</h3>
                    <p className="text-charcoal-light text-sm">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-teal" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Hours</h3>
                    <p className="text-charcoal-light text-sm">{hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
