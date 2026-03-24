import { HelmetProvider, Helmet } from "react-helmet-async";
import { Heart, Shield, Users, TrendingUp, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContent } from "../hooks/usePageContent";

const values = [
  { icon: Star, label: "Confidence" },
  { icon: Heart, label: "Empowerment" },
  { icon: Users, label: "Support" },
  { icon: Shield, label: "Accountability" },
  { icon: TrendingUp, label: "Growth" },
  { icon: Clock, label: "Consistency" },
];

export default function About() {
  const { getSectionContent, getSectionImage } = usePageContent("about");

  const heroTitle = getSectionContent("hero_title", "About Mind and Body by Bre");
  const heroSubtitle = getSectionContent(
    "hero_subtitle",
    "More than a fitness studio. A movement built for women, by a woman who understands the journey."
  );
  const storyTitle = getSectionContent("story_title", "Our Story");
  const storyBody = getSectionContent(
    "story_body",
    "Mind and Body by Bre was founded by Abreanna Parker with a simple but powerful mission: to create a safe space where women can feel free to be themselves, clear their minds, and reconnect with their bodies. Bre understands what it means to juggle it all as a busy woman, a mom, a professional, a business owner. She built MBB for the woman who is ready to break free and believe in herself again."
  );
  const missionTitle = getSectionContent("mission_title", "Our Mission");
  const missionBody = getSectionContent(
    "mission_body",
    "To empower women to build strength, confidence, and balance through intentional movement and mindful fitness. This is not just a fitness program. This is a full body transformation from the inside out."
  );
  const visionTitle = getSectionContent("vision_title", "Our Vision");
  const visionBody = getSectionContent(
    "vision_body",
    "To become a recognizable women's wellness brand known for sustainable fitness, mindset transformation, and community impact. We want every woman who walks through our doors to believe she can do and lift anything when she puts her mind to it."
  );
  const instructorName = getSectionContent("instructor_name", "Abreanna Parker");
  const instructorTitle = getSectionContent(
    "instructor_title",
    "Founder and Head Trainer"
  );
  const instructorBio = getSectionContent(
    "instructor_bio",
    "Abreanna Parker is a certified personal trainer with a background in mental health and wellness. She combines her passion for fitness with a deep understanding of the mindset work required to create lasting change. Her approach is soft yet strong, accessible yet challenging, and always rooted in community and care."
  );
  const instructorImage = getSectionImage("instructor_image", "/images/IMG_4515.jpeg");
  const valuesTitle = getSectionContent("values_title", "The Values We Live By");

  return (
    <HelmetProvider>
      <Helmet>
        <title>About | Mind and Body by Bre</title>
        <meta
          name="description"
          content="Learn about Mind and Body by Bre, founded by Abreanna Parker. A women-centered fitness and wellness brand in Topeka, KS built on empowerment, community, and transformation."
        />
      </Helmet>

      <section
        className="relative section-padding text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/IMG_4556.jpeg')" }}
      >
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 container-max text-center">
          <p className="text-olive font-semibold text-sm uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 max-w-3xl mx-auto">
            {heroTitle}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title">{storyTitle}</h2>
              <p className="text-charcoal-light leading-relaxed mb-6">
                {storyBody}
              </p>
              <Link to="/contact" className="btn-primary inline-block">
                Join the Community
              </Link>
            </div>
            <div className="bg-cream rounded-2xl p-8 flex items-center justify-center min-h-64">
              <img
                src="/images/f4cb0ec5-178a-4169-942f-23c5184bd4b7.jpg"
                alt="Mind and Body by Bre Studio"
                className="rounded-xl w-full object-cover max-h-96"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 border-l-4 border-teal">
              <h2 className="text-2xl font-extrabold mb-4">{missionTitle}</h2>
              <p className="text-charcoal-light leading-relaxed">{missionBody}</p>
            </div>
            <div className="card p-8 border-l-4 border-olive">
              <h2 className="text-2xl font-extrabold mb-4">{visionTitle}</h2>
              <p className="text-charcoal-light leading-relaxed">{visionBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-cream rounded-2xl p-8 flex items-center justify-center min-h-64 order-2 lg:order-1">
              {instructorImage ? (
                <img
                  src={instructorImage}
                  alt={instructorName}
                  className="rounded-xl w-full object-cover max-h-96"
                />
              ) : (
                <div className="text-center text-charcoal-light">
                  <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={40} className="text-teal" />
                  </div>
                  <p className="font-semibold">Trainer Photo</p>
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-teal font-semibold text-sm uppercase tracking-widest mb-2">
                Meet Your Trainer
              </p>
              <h2 className="section-title">{instructorName}</h2>
              <p className="text-olive font-semibold mb-4">{instructorTitle}</p>
              <p className="text-charcoal-light leading-relaxed">
                {instructorBio}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-teal">
        <div className="container-max text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
            {valuesTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {values.map((value) => (
              <div
                key={value.label}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                  <value.icon size={24} className="text-white" />
                </div>
                <span className="font-bold text-sm">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-max text-center">
          <h2 className="section-title">Ready to Transform?</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Take the first step toward becoming your strongest self. We are here
            for every rep, every step, and every breakthrough.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/classes" className="btn-primary">
              Explore Classes
            </Link>
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
