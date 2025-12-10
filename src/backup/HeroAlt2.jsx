function Hero() {
  return (
    <div>
      <div className="py-10 rounded-4xl bg-linear-to-br from-cyan-200 via-cyan-300 to-cyan-400 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Snow/particle effects */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-60 animate-pulse"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}

          {/* Large background text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-5 text-9xl font-bold whitespace-nowrap">
            MIKU
          </div>
        </div>

        <div className="hero relative z-10">
          <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl w-full px-4">
            {/* Character Image Side */}
            <div className="flex-1 flex justify-center items-center relative">
              {/* Hearts decoration */}
              <div className="absolute top-10 right-10 animate-bounce">
                <svg
                  className="w-16 h-16 text-pink-400 opacity-80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div
                className="absolute bottom-10 left-13 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <svg
                  className="w-12 h-12 text-pink-300 opacity-70"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Placeholder for character image */}
              <div className="w-full max-w-md aspect-square  bg-linear-to-br from-cyan-300 to-cyan-500 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-10"></div>
                <div className="text-center z-10">
                  <img src="/src/assets/test.jpg" className="opacity-50" />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1">
              {/* Main Heading */}
              <h1 className="text-7xl font-bold text-gray-800 mb-6">
                Rahadi Fauzan
              </h1>

              <div
                className="text-pink-500 font-bold text-2xl mb-2"
                style={{ fontFamily: "sans-serif" }}
              >
                ラハディ・ファウザン
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8 max-w-md leading-relaxed">
                Rahadi is Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Obcaecati, voluptate?
              </p>

              {/* CTA Button */}
              <button className="btn btn-neutral bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg border-none relative overflow-hidden group">
                <span className="relative z-10">Read More</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 transform origin-left transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
