import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Clock, Users, BarChart3 } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { usePageContent } from "../hooks/usePageContent";

interface ClassItem {
  id: string;
  name: string;
  description: string;
  duration: number;
  capacity: number;
  level: string;
  imageUrl?: string;
}

const fallbackClasses: ClassItem[] = [
  {
    id: "1",
    name: "HIIT Training",
    description:
      "High-intensity interval training that alternates between bursts of intense exercise and brief recovery. Burns calories, boosts metabolism, and builds full-body strength.",
    duration: 45,
    capacity: 20,
    level: "All Levels",
  },
  {
    id: "2",
    name: "Body Sculpting",
    description:
      "Toning and strengthening through controlled movements, resistance training, and targeted exercises. Build lean muscle and improve overall body definition.",
    duration: 50,
    capacity: 15,
    level: "Beginner",
  },
  {
    id: "3",
    name: "Personal Training",
    description:
      "Custom workout plans tailored to your personal fitness goals. One-on-one coaching for proper form, accountability, and faster results.",
    duration: 60,
    capacity: 1,
    level: "All Levels",
  },
];

const levels = ["All", "All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Classes() {
  const [classes, setClasses] = useState<ClassItem[]>(fallbackClasses);
  const [filter, setFilter] = useState("All");
  const { getSectionContent } = usePageContent("classes");

  const heroTitle = getSectionContent("hero_title", "Our Classes");
  const heroSubtitle = getSectionContent(
    "hero_subtitle",
    "Every class is designed to challenge you, support you, and help you grow. Find the one that fits your goals."
  );

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.classes);
        if (response.data && response.data.length > 0) {
          setClasses(response.data);
        }
      } catch {
        // use fallback data
      }
    };
    fetchClasses();
  }, []);

  const filtered =
    filter === "All"
      ? classes
      : classes.filter((c) => c.level === filter);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Classes | Mind and Body by Bre</title>
        <meta
          name="description"
          content="Explore HIIT, body sculpting, and personal training classes at Mind and Body by Bre in Topeka, KS. All fitness levels welcome."
        />
      </Helmet>

      <section
        className="relative section-padding text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/IMG_4528.jpeg')" }}
      >
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 container-max text-center">
          <p className="text-olive font-semibold text-sm uppercase tracking-widest mb-4">
            What We Offer
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
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  filter === level
                    ? "bg-teal text-white"
                    : "bg-white text-charcoal hover:bg-teal hover:text-white"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((cls) => (
              <div key={cls.id} className="card p-6">
                {cls.imageUrl && (
                  <img
                    src={cls.imageUrl}
                    alt={cls.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold mb-3">{cls.name}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                  {cls.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-charcoal-light">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-teal" />
                    {cls.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-teal" />
                    {cls.capacity === 1
                      ? "1-on-1"
                      : `Up to ${cls.capacity}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 size={14} className="text-teal" />
                    {cls.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-charcoal-light mt-8">
              No classes found for that level. Try a different filter.
            </p>
          )}
        </div>
      </section>
    </HelmetProvider>
  );
}
