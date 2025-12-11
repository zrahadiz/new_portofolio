import { Wrench } from "lucide-react";
import TruckCarousel from "../TruckCarousel";
import { skillCategories } from "@/data/skillsList.json";

export default function SkillsTools() {
  return (
    <section className="px-8 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Tools
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What I bring to the table
          </p>
        </div>

        {/* Truck Animation Container */}
        <div className="relative h-96 sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10">
          <TruckCarousel skillCategories={skillCategories} />
        </div>
      </div>
    </section>
  );
}
