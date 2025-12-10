import { useState } from "react";
import { ExternalLink, Search, ChevronRight, ChevronLeft } from "lucide-react";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { projects } from "@/data/listProjects.json";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsPerPage = 6;

  const categories = ["All", "Web Design", "Mobile App", "UI/UX", "Branding"];

  const filteredProjects = projects.filter((project) => {
    // Filter by category
    const matchesCategory =
      activeFilter === "All" || project.category === activeFilter;

    // Filter by search query (search in title, description, and tags)
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Reset to page 1 when filter or search changes
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of projects section
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section className="px-8 pb-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my recent work and creative solutions for various clients
          </p>
        </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeFilter === category
                  ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects by title, description, or tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>
        {/* Results Info */}
        {(searchQuery || activeFilter !== "All") && (
          <div className="text-center mb-8">
            <p className="text-gray-400">
              Found{" "}
              <span className="text-blue-400 font-semibold">
                {filteredProjects.length}
              </span>{" "}
              project{filteredProjects.length !== 1 ? "s" : ""}
              {searchQuery && (
                <span>
                  {" "}
                  matching "<span className="text-white">{searchQuery}</span>"
                </span>
              )}
            </p>
          </div>
        )}
        {/* Projects Grid */}
        {currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-slate-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Link
                      href={project.link}
                      className="btn btn-circle btn-sm bg-white text-slate-900 hover:bg-blue-500 hover:text-white"
                      onClick={(e) => e.preventDefault()}
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <Link
                      href={project.github}
                      className="btn btn-circle btn-sm bg-white text-slate-900 hover:bg-purple-500 hover:text-white"
                      onClick={(e) => e.preventDefault()}
                    >
                      <SiGithub size={16} />
                    </Link>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 8).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}

                    {project.tags.length > 8 && (
                      <span className="px-3 py-1 bg-slate-700/50 text-gray-400 text-xs rounded-full border border-white/10">
                        … {project.tags.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
              <Search size={32} className="text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
                setCurrentPage(1);
              }}
              className="btn btn-outline border-white/30 hover:bg-white hover:text-slate-900"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 my-10">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-circle btn-outline border-white/20 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`btn btn-circle transition-all ${
                        currentPage === pageNumber
                          ? "bg-linear-to-r from-blue-500 to-purple-500 text-white border-none"
                          : "btn-outline border-white/20 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span
                      key={pageNumber}
                      className="flex items-center text-gray-400"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-circle btn-outline border-white/20 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <BookModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </section>
  );
}
