import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import { Link } from "react-router-dom";

export default function BookModal({ project, isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [imgErrors, setImgErrors] = useState(false);

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Reset to first page when modal opens with new project
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const pages = project.pages || [];
  const totalSpreads = Math.ceil(pages.length / 2);

  const nextPage = () => {
    if (currentPage < totalSpreads - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const leftPageIndex = currentPage * 2;
  const rightPageIndex = currentPage * 2 + 1;
  const leftPage = pages[leftPageIndex];
  const rightPage = pages[rightPageIndex];

  // Render page content based on type
  const renderPageContent = (page) => {
    if (!page) return null;

    return (
      <div className="space-y-4 h-full">
        {/* Heading */}
        {page.heading && (
          <h3 className="text-2xl font-bold text-white mb-4">{page.heading}</h3>
        )}

        {/* Text content */}
        {page.text && (
          <p className="text-gray-400 leading-relaxed whitespace-pre-line">
            {page.text}
          </p>
        )}

        {/* Image */}
        {page.image && (
          <div className="my-4">
            <img
              src={page.image}
              alt={page.heading || "Project image"}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Multiple Images */}
        {page.imgUrl &&
          Array.isArray(page.imgUrl) &&
          page.imgUrl.length > 0 && <ImageCarousel images={page.imgUrl} />}

        {/* List items */}
        {page.list && page.list.length > 0 && (
          <ul className="space-y-2 mt-4 max-h-11/12 overflow-y-auto pr-2">
            {page.list.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-400">
                <span className="text-blue-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Grid items (for results/metrics) */}
        {page.grid && page.grid.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4 max-h-11/12 overflow-y-auto pr-2">
            {page.grid.map((item, index) => (
              <div
                key={index}
                className="bg-slate-700/50 rounded-lg p-3 border border-white/10"
              >
                <p className="text-sm text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* Contributors */}
        {page.contributors && page.contributors.length > 0 && (
          <div className="space-y-3 max-h-11/12 overflow-y-auto pr-2">
            {page.contributors.map((person, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-white/10"
              >
                {/* Avatar */}
                {person.img && !imgErrors[index] ? (
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [index]: true }))
                    }
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg border border-white/10">
                    {getInitials(person.name)}
                  </div>
                )}

                {/* Contributor Info */}
                <div className="flex-1">
                  <p className="font-semibold text-white">{person.name}</p>
                  <p className="text-gray-400 text-sm">{person.role}</p>
                </div>

                {/* LinkedIn */}
                {person.linkedin && (
                  <Link
                    to={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Linkedin size={20} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* My Contribution */}
        {page.contributions && page.contributions.length > 0 && (
          <div className="space-y-4 max-h-11/12 overflow-y-auto pr-2">
            {page.contributions.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-800/40 border border-white/10 rounded-xl"
              >
                <p className="text-blue-400 font-semibold mb-2">{item.label}</p>

                <ul className="space-y-1">
                  {item.tasks.map((task, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                    >
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {page.testimonial && (
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20 mt-4">
            <p className="text-gray-300 italic leading-relaxed mb-4">
              "{page.testimonial.text}"
            </p>
            <div className="border-t border-white/10 pt-4">
              <p className="font-semibold text-white">
                {page.testimonial.author}
              </p>
              <p className="text-sm text-gray-400">
                {page.testimonial.position}
              </p>
            </div>
          </div>
        )}

        {/* Tags */}
        {page.tags && page.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {page.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Info boxes (for client, duration, role) */}
        {page.info && page.info.length > 0 && (
          <div className="space-y-3 mt-4 max-h-11/12 overflow-y-auto pr-2">
            {page.info.map((item, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-blue-400 mb-1">
                  {item.label}
                </h4>
                <p className="text-gray-300">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        {page.links && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
            {page.links.live && (
              <a
                href={page.links.live}
                className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none flex-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                View Live
              </a>
            )}
            {page.links.github && (
              <a
                href={page.links.github}
                className="btn btn-sm bg-purple-500 hover:bg-purple-600 text-white border-none flex-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  // Special rendering for cover page
  const renderCoverPage = () => {
    if (currentPage !== 0 || !leftPage || leftPage.type !== "cover")
      return null;

    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">
          {project.title}
        </h2>
        {leftPage.subtitle && (
          <p className="text-xl mb-6 text-center text-white/80">
            {leftPage.subtitle}
          </p>
        )}
        {leftPage.tags && (
          <div className="flex flex-wrap gap-2 justify-center">
            {leftPage.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {leftPage.image && (
          <div className="mt-6 w-full max-w-sm">
            <img
              src={leftPage.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="
    fixed inset-0 z-50 flex items-center justify-center 
    p-4 bg-black/80 backdrop-blur-sm animate-fadeIn
  "
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
        absolute -top-12 right-0 
        btn btn-circle btn-ghost text-white hover:bg-white/10
      "
        >
          ✕
        </button>

        {/* Book Container */}
        <div
          className="
      relative bg-slate-900 rounded-xl shadow-2xl overflow-hidden
      max-h-[85vh] flex flex-col
    "
        >
          <div
            className="
        flex flex-col md:flex-row 
        h-full
      "
          >
            {/* Left Page */}
            <div
              className="
          flex-1 bg-slate-800 p-6 md:p-10 
          border-b md:border-b-0 md:border-r border-slate-700/50 
          overflow-y-auto
          max-h-[40vh] md:max-h-[85vh]
        "
            >
              {leftPage && leftPage.type === "cover"
                ? renderCoverPage()
                : renderPageContent(leftPage)}

              {/* Page number */}
              {leftPage && (
                <div className="text-gray-500 text-xs mt-6 md:absolute md:bottom-4 md:left-8">
                  {leftPageIndex + 1}
                </div>
              )}
            </div>

            {/* Right Page */}
            <div
              className="
          flex-1 bg-slate-800 p-6 md:p-10 
          overflow-y-auto 
          max-h-[40vh] md:max-h-[85vh]
        "
            >
              {renderPageContent(rightPage)}

              {rightPage && (
                <div className="text-gray-500 text-xs mt-6 md:absolute md:bottom-4 md:right-8">
                  {rightPageIndex + 1}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div
            className="
        sticky bottom-0 left-0 
        flex items-center justify-center gap-4
        bg-slate-900/90 backdrop-blur-sm
        py-3 border-t border-white/10
      "
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="
            btn btn-circle btn-sm btn-ghost 
            text-white hover:bg-white/10 
            disabled:opacity-30 disabled:cursor-not-allowed
          "
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-white text-sm font-medium">
              {currentPage + 1} / {totalSpreads}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalSpreads - 1}
              className="
            btn btn-circle btn-sm btn-ghost 
            text-white hover:bg-white/10 
            disabled:opacity-30 disabled:cursor-not-allowed
          "
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
