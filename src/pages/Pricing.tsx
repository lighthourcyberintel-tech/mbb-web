import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { usePageContent } from "../hooks/usePageContent";

interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

const fallbackTiers: MembershipTier[] = [
  {
    id: "1",
    name: "Drop-In",
    price: "$15",
    period: "per class",
    description: "Perfect for trying us out or fitting in a workout when your schedule allows.",
    features: [
      "Single class access",
      "Any group class",
      "No commitment required",
      "Pay as you go",
    ],
    highlighted: false,
  },
  {
    id: "2",
    name: "Group Classes",
    price: "$80",
    period: "per month",
    description: "Consistent training at the best value. Choose the frequency that fits your life.",
    features: [
      "1x per week — $80/month",
      "2x per week — $120/month",
      "3x per week — $150/month",
      "Access to all group classes",
      "Community support",
      "Progress tracking",
    ],
    highlighted: true,
  },
  {
    id: "3",
    name: "Personal Training",
    price: "$50",
    period: "per session",
    description: "One-on-one coaching tailored to your goals with custom programming and accountability.",
    features: [
      "1-on-1 sessions — $50 each",
      "8 sessions/month — $400",
      "12 sessions/month — $600",
      "16 sessions/month — $800",
      "Custom workout plan",
      "Nutrition guidance",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [tiers, setTiers] = useState<MembershipTier[]>(fallbackTiers);
  const { getSectionContent } = usePageContent("pricing");

  const heroTitle = getSectionContent("hero_title", "Membership Options");
  const heroSubtitle = getSectionContent(
    "hero_subtitle",
    "Flexible plans designed to meet you where you are. No long-term contracts. Just results."
  );

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.memberships);
        if (response.data && response.data.length > 0) {
          setTiers(response.data);
        }
      } catch {
        // use fallback data
      }
    };
    fetchMemberships();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Pricing | Mind and Body by Bre</title>
        <meta
          name="description"
          content="View membership pricing at Mind and Body by Bre. Drop-in classes, group memberships, and personal training packages in Topeka, KS."
        />
      </Helmet>

      <section className="section-padding bg-teal text-white">
        <div className="container-max text-center">
          <p className="text-olive font-semibold text-sm uppercase tracking-widest mb-4">
            Pricing
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`card p-8 flex flex-col ${
                  tier.highlighted
                    ? "border-2 border-teal ring-4 ring-teal/10 relative"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold text-teal">
                      {tier.price}
                    </span>
                    <span className="text-charcoal-light text-sm">
                      {tier.period}
                    </span>
                  </div>
                  <p className="text-charcoal-light text-sm mt-3 leading-relaxed">
                    {tier.description}
                  </p>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-charcoal-light"
                    >
                      <Check
                        size={16}
                        className="text-olive mt-0.5 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`text-center ${
                    tier.highlighted ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-teal">
        <div className="container-max text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Not Sure Which Plan Is Right for You?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Reach out and we will help you find the perfect fit for your goals,
            schedule, and budget.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-teal font-bold px-8 py-4 rounded-md hover:bg-cream transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </HelmetProvider>
  );
}
