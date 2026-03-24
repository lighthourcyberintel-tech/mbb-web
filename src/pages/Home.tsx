import { Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ArrowRight, Users, Heart, Zap, Star } from "lucide-react";
import { usePageContent } from "../hooks/usePageContent";

const benefits = [
  {
    icon: Zap,
    title: "High Energy Workouts",
    description:
      "Fun, challenging classes designed to burn fat, build strength, and improve endurance.",
  },
  {
    icon: Users,
    title: "Supportive Community",
    description:
      "Train alongside women who motivate and uplift each other every single session.",
  },
  {
    icon: Heart,
    title: "Mind and Body Focus",
    description:
      "We combine physical fitness with mindset work so you grow from the inside out.",
  },
  {
    icon: Star,
    title: "All Fitness Levels",
    description:
      "Every class includes modifications so beginners and advanced clients both thrive.",
  },
];

const testimonials = [
  {
    name: "Keisha M.",
    quote:
      "Bre changed my life. I came in nervous and left feeling unstoppable. Best decision I ever made.",
  },
  {
    name: "Tanya R.",
    quote:
      "The community here is everything. I never thought I would actually look forward to working out.",
  },
  {
    name: "Simone J.",
    quote:
      "I lost 20 pounds and gained so much confidence. MBB is more than a gym, it is a movement.",
  },
];

export default function Home() {
  const { getSectionContent, getSectionImage } = usePageContent("home");

  const heroHeadline = getSectionContent(
    "hero_headline",
    "Transform Your Mind and Body"
  );
  const heroSubheadline = getSectionContent(
    "hero_subheadline",
    "Women-centered fitness and wellness in Topeka, KS. Personal training, group classes, and mindset coaching designed to help you become your strongest self."
  );
  const heroImage = getSectionImage("hero_image", "/images/IMG_5720.jpeg");
  const featuredTitle = getSectionContent(
    "featured_title",
    "Our Signature Classes"
  );
  const featuredSubtitle = getSectionContent(
    "featured_subtitle",
    "Every class is designed to challenge you, support you, and help you grow."
  );
  const benefitsTitle = getSectionContent(
    "benefits_title",
    "Why Women Choose MBB"
  );
  const membershipTeaser = getSectionContent(
    "membership_teaser",
    "Flexible memberships starting at $15 per class. No long-term contracts. Just results."
  );
  const testimonialsTitle = getSectionContent(
    "testimonials_title",
    "Real Women, Real Results"
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mind and Body by Bre | Women's Fitness Studio in Topeka, KS</title>
        <meta
          name="description"
          content="Mind and Body by Bre offers personal training, group fitness classes, and mindset coaching for women in Topeka, KS. Join the MBB community today."
        />
      </Helmet>

      <section
        className="relative min-h-screen flex items-center justify-center bg-charcoal"
        style={
          heroImage
            ? {
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }
            : {}
        }
      >
        {heroImage && (
          <div className="absolute inset-0 bg-charcoal/60" />
        )}
        <div className="relative z-10 container-max section-padding text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-4xl mx-auto">
            {heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base px-8 py-4">
              Get Started Today
            </Link>
            <Link
              to="/classes"
              className="btn-outline border-white text-white hover:bg-white hover:text-charcoal text-base px-8 py-4"
            >
              View Classes
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight size={24} className="text-white rotate-90" />
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">{featuredTitle}</h2>
            <p className="section-subtitle">{featuredSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 border-t-4 border-teal">
              <div className="text-teal font-bold text-xs uppercase tracking-widest mb-2">
                Group Class
              </div>
              <h3 className="text-xl font-bold mb-3">HIIT Training</h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                High-intensity interval training that alternates between bursts
                of intense exercise and brief recovery. Burns calories, boosts
                metabolism, and builds full-body strength.
              </p>
              <Link
                to="/classes"
                className="text-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="card p-6 border-t-4 border-olive">
              <div className="text-olive font-bold text-xs uppercase tracking-widest mb-2">
                Group Class
              </div>
              <h3 className="text-xl font-bold mb-3">Body Sculpting</h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                Toning and strengthening through controlled movements,
                resistance training, and targeted exercises. Build lean muscle
                and improve overall body definition.
              </p>
              <Link
                to="/classes"
                className="text-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="card p-6 border-t-4 border-teal-dark">
              <div className="text-teal-dark font-bold text-xs uppercase tracking-widest mb-2">
                Personal Training
              </div>
              <h3 className="text-xl font-bold mb-3">1-on-1 Coaching</h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                Custom workout plans tailored to your personal fitness goals.
                One-on-one coaching for proper form, accountability, and faster
                results.
              </p>
              <Link
                to="/pricing"
                className="text-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">{benefitsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={24} className="text-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-teal">
        <div className="container-max text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            {membershipTeaser}
          </p>
          <Link
            to="/pricing"
            className="inline-block bg-white text-teal font-bold px-8 py-4 rounded-md hover:bg-cream transition-colors"
          >
            View Membership Options
          </Link>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title">{testimonialsTitle}</h2>
          </div>
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src="/images/IMG_6671 (1).jpeg"
              alt="MBB Community"
              className="w-full object-cover object-top"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-olive fill-olive"
                    />
                  ))}
                </div>
                <p className="text-charcoal-light text-sm leading-relaxed mb-4 italic">
                  "{t.quote}"
                </p>
                <p className="font-bold text-sm text-teal">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
