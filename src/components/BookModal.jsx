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
  const [imgErrors, setImgErrors] = useState({});
  const isMobile = window.innerWidth < 768; // simple responsive check

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

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
  const totalPages = pages.length;
  const totalSpreads = Math.ceil(totalPages / 2);

  /** -----------------------------
   *     RESPONSIVE NAVIGATION
   *  ----------------------------- */

  const nextPage = () => {
    if (isMobile) {
      // mobile = 1 page at a time
      setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
    } else {
      // desktop = jump by spread (2 pages)
      setCurrentPage((p) => Math.min(p + 1, totalSpreads - 1));
    }
  };

  const prevPage = () => {
    if (isMobile) {
      setCurrentPage((p) => Math.max(p - 1, 0));
    } else {
      setCurrentPage((p) => Math.max(p - 1, 0));
    }
  };

  /** -----------------------------
   *     PAGE INDEX CALCULATION
   *  ----------------------------- */

  const leftPageIndex = isMobile ? currentPage : currentPage * 2;
  const rightPageIndex = isMobile ? null : currentPage * 2 + 1;

  const leftPage = pages[leftPageIndex];
  const rightPage = rightPageIndex !== null ? pages[rightPageIndex] : null;

  /** -----------------------------
   *   Reuse your render functions
   *  ----------------------------- */
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

  /** -----------------------------
   *      RENDER UI
   *  ----------------------------- */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 btn btn-circle btn-ghost text-white"
        >
          ✕
        </button>

        {/* BOOK */}
        <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
          <div
            className={`flex ${
              isMobile ? "flex-col" : "flex-row"
            } min-h-[600px]`}
          >
            {/* LEFT PAGE */}
            <div className="flex-1 bg-slate-800 p-8 md:p-12 border-r border-slate-700/50 overflow-y-auto relative max-h-[600px]">
              {leftPage?.type === "cover"
                ? renderCoverPage()
                : renderPageContent(leftPage)}
            </div>

            {/* RIGHT PAGE (Desktop only) */}
            {!isMobile && (
              <div className="flex-1 bg-slate-800 p-8 md:p-12 overflow-y-auto relative max-h-[600px]">
                {renderPageContent(rightPage)}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 px-4 py-2 rounded-full flex gap-4 items-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="btn btn-circle btn-sm btn-ghost text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-white text-sm">
              {isMobile
                ? `${leftPageIndex + 1} / ${totalPages}`
                : `${currentPage + 1} / ${totalSpreads}`}
            </span>

            <button
              onClick={nextPage}
              disabled={
                isMobile
                  ? leftPageIndex >= totalPages - 1
                  : currentPage >= totalSpreads - 1
              }
              className="btn btn-circle btn-sm btn-ghost text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
