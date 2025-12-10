function Home() {
  return (
    <section className="relative w-full flex justify-center px-4 md:px-10 mt-24">
      {/* HERO CARD */}
      <div
        className="
        relative bg-linear-to-br from-cyan-200 via-cyan-300 to-cyan-400 
        rounded-3xl shadow-lg w-full max-w-6xl 
        px-6 md:px-12 py-10 
        overflow-visible
        "
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Snow/particle effects */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-40 animate-pulse"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}

          {/* Large background text */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white opacity-[0.03] font-bold whitespace-nowrap"
            style={{ fontSize: "20rem", lineHeight: "1" }}
          >
            MIKU
          </div>
        </div>
        {/* FLOATING IMAGE */}
        <img
          src="/src/assets/my.png"
          alt="Miku"
          className="
            absolute right-2 sm:right-6 md:right-10 lg:right-14
            -top-24 md:-top-37 
            w-48 sm:w-60 md:w-72 lg:w-92
            object-contain pointer-events-none drop-shadow-2xl
          "
        />

        {/* CONTENT */}
        <div className="max-w-lg">
          <h1 className="text-8xl lg:text-9xl font-bold text-gray-800 mb-6 leading-none">
            Miku
          </h1>

          <p className="text-gray-700 text-base lg:text-lg mb-10 max-w-lg leading-relaxed">
            Miku is Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Obcaecati, voluptate?
          </p>

          {/* Read more */}
          <button className="relative group mb-12">
            <span className="text-gray-800 font-semibold text-lg">
              Read More
            </span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800"></div>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
