import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import SkillsTools from "@/components/sections/SkillsTools";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

function Home() {
  return (
    <div className="space-y-20 md:space-y-44">
      <Hero />
      <Journey />
      <Projects />
      <SkillsTools />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default Home;
