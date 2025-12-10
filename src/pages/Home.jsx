import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperiences";
import Projects from "@/components/Projects";

function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <WorkExperience />
      <Projects />
    </div>
  );
}

export default Home;
