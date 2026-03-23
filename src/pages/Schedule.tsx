import { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Clock, MapPin, Users } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { usePageContent } from "../hooks/usePageContent";

interface ScheduleItem {
  id: string;
  className: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  instructor: string;
  location?: string;
  capacity?: number;
}

const fallbackSchedule: ScheduleItem[] = [
  {
    id: "1",
    className: "HIIT Training",
    dayOfWeek: "Monday",
    startTime: "11:00 AM",
    endTime: "11:45 AM",
    instructor: "Bre",
    location: "Main Studio",
    capacity: 20,
  },
  {
    id: "2",
    className: "Body Sculpting",
    dayOfWeek: "Tuesday",
    startTime: "12:00 PM",
    endTime: "12:50 PM",
    instructor: "Bre",
    location: "Main Studio",
    capacity: 15,
  },
  {
    id: "3",
    className: "HIIT Training",
    dayOfWeek: "Saturday",
    startTime: "8:30 AM",
    endTime: "9:15 AM",
    instructor: "Bre",
    location: "Main Studio",
    capacity: 20,
  },
];

const daysOfWeek = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(fallbackSchedule);
  const [dayFilter, setDayFilter] = useState("All");
  const { getSectionContent } = usePageContent("schedule");

  const heroTitle = getSectionContent("hero_title", "Class Schedule");
  const heroSubtitle = getSectionContent(
    "hero_subtitle",
    "Find a time that works for you. New classes and times are added regularly."
  );

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.schedule);
        if (response.data && response.data.length > 0) {
          setSchedule(response.data);
        }
      } catch {
        // use fallback data
      }
    };
    fetchSchedule();
  }, []);

  const filtered =
    dayFilter === "All"
      ? schedule
      : schedule.filter((s) => s.dayOfWeek === dayFilter);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Schedule | Mind and Body by Bre</title>
        <meta
          name="description"
          content="View the weekly class schedule at Mind and Body by Bre. HIIT, body sculpting, and personal training sessions in Topeka, KS."
        />
      </Helmet>

      <section className="section-padding bg-teal text-white">
        <div className="container-max text-center">
          <p className="text-olive font-semibold text-sm uppercase tracking-widest mb-4">
            Weekly Schedule
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
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setDayFilter(day)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  dayFilter === day
                    ? "bg-teal text-white"
                    : "bg-white text-charcoal hover:bg-teal hover:text-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-teal font-bold text-xs uppercase tracking-widest">
                    {item.dayOfWeek}
                  </span>
                  <span className="bg-cream text-charcoal text-xs font-semibold px-3 py-1 rounded-full">
                    {item.className}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.className}</h3>
                <div className="flex flex-col gap-2 text-sm text-charcoal-light">
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-teal" />
                    {item.startTime} - {item.endTime}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-teal" />
                      {item.location}
                    </span>
                  )}
                  {item.capacity && (
                    <span className="flex items-center gap-2">
                      <Users size={14} className="text-teal" />
                      Up to {item.capacity} people
                    </span>
                  )}
                </div>
                <p className="text-sm text-charcoal-light mt-3">
                  Instructor: <span className="font-semibold text-charcoal">{item.instructor}</span>
                </p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-charcoal-light mt-8">
              No classes scheduled for this day. Check back soon!
            </p>
          )}
        </div>
      </section>
    </HelmetProvider>
  );
}
