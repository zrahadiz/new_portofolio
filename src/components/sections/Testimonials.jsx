import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonies";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsAnimating(false);
    }, 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Get initials from name
  const getInitials = (name) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return name.substring(0, 2);
  };

  // Handle image error
  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Render avatar (image or initials)
  const renderAvatar = (testimonial, size = "large") => {
    const isError = imageErrors[testimonial.id];
    const sizeClasses = size === "large" ? "w-20 h-20" : "w-16 h-16";
    const textSizeClasses = size === "large" ? "text-2xl" : "text-xl";

    return (
      <div
        className={`relative ${sizeClasses} rounded-full bg-gradient-to-br ${testimonial.color} p-1`}
      >
        {!isError ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full rounded-full object-cover"
            onError={() => handleImageError(testimonial.id)}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center">
            <span className={`${textSizeClasses} font-bold text-white`}>
              {getInitials(testimonial.name)}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="px-8 py-10 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-400">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Others Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take my word for it - hear from some of the amazing
            peoples I've worked with
          </p>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-10">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                100+
              </div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                5.0
              </div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
          </div> */}
        </div>

        {/* Main Testimonial Card */}
        <div className="relative mb-12">
          <div
            className={`transition-all duration-500 ${
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
              {/* Gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${currentTestimonial.color}`}
              ></div>

              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote size={100} className="text-white" />
              </div>

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-light">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Client Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    {renderAvatar(currentTestimonial, "large")}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-400 mb-2">
                      {currentTestimonial.position} at{" "}
                      {currentTestimonial.company}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                      <span>Project:</span>
                      <span className="font-semibold">
                        {currentTestimonial.project}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-5 -right-5  flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="pointer-events-auto -translate-x-1  xl:-translate-x-12 btn btn-circle btn-lg bg-slate-800/80 backdrop-blur-sm border-white/20 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="pointer-events-auto translate-x-1 xl:translate-x-12 btn btn-circle btn-lg bg-slate-800/80 backdrop-blur-sm border-white/20 hover:bg-white hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => handleDotClick(index)}
              disabled={isAnimating}
              className={`relative transition-all duration-300 ${
                index === currentIndex
                  ? "scale-110"
                  : "scale-100 opacity-50 hover:opacity-75"
              } disabled:cursor-not-allowed`}
            >
              {renderAvatar(testimonial, "small")}
              {index === currentIndex && (
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.color} opacity-30 animate-ping`}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-gradient-to-r " + testimonials[currentIndex].color
                  : "w-2 bg-white/30 hover:bg-white/50"
              } disabled:cursor-not-allowed`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
