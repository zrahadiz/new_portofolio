import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import SkillsTools from "@/components/sections/SkillsTools";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

function Home() {
  return (
    <div className="space-y-20 md:space-y-28">
      <section id="about" className="scroll-mt-24">
        <Hero />
      </section>

      <section id="journey" className="scroll-mt-24">
        <Journey />
      </section>

      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>

      <section id="skills" className="scroll-mt-24">
        <SkillsTools />
      </section>

      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>

      <section id="contact" className="scroll-mt-24">
        <Contact />
      </section>
    </div>
  );
}

export default Home;
