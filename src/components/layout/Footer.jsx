export default function Footer() {
  return (
    <footer class="bg-gray-900 text-gray-300 py-10">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 class="text-xl font-semibold text-white">Rahadi Fauzan</h2>
          <p class="mt-3 text-sm">
            Building modern and user-friendly digital experiences.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-white mb-3">Navigation</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#about" class="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#journey" class="hover:text-white">
                Journey
              </a>
            </li>
            <li>
              <a href="#projects" class="hover:text-white">
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" class="hover:text-white">
                Skills
              </a>
            </li>
            <li>
              <a href="#testimonials" class="hover:text-white">
                Testimonies
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-white mb-3">Contact</h3>
          <ul class="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a href="mailto:you@example.com" class="hover:text-white">
                rahadifauzan7@gmail.com
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/rahadi-fauzan/"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white"
              >
                linkedin.com/in/rahadi-fauzan
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/zrahadiz"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white"
              >
                github.com/zrahadiz
              </a>
            </li>
          </ul>
        </div>
        {/* 
        <div>
          <h3 class="font-semibold text-white mb-3">Follow Me</h3>
          <div class="flex gap-4 text-xl">
            <a href="#" class="hover:text-white">
              <i class="ri-github-fill"></i>
            </a>
            <a href="#" class="hover:text-white">
              <i class="ri-linkedin-box-fill"></i>
            </a>
            <a href="#" class="hover:text-white">
              <i class="ri-instagram-fill"></i>
            </a>
          </div>
        </div> */}
      </div>

      <div class="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
        © 2025 Rahadi Fauzan. All rights reserved.
      </div>
    </footer>
  );
}
