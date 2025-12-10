import Hero from "@/components/sections/Hero";
import WorkExperience from "@/components/sections/WorkExperiences";
import Projects from "@/components/sections/Projects";
import SkillsTools from "@/components/sections/SkillsTools";

function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <WorkExperience />
      <Projects />
      <SkillsTools />
    </div>
  );
}

export default Home;
