import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
  Facebook,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rahadifauzan7@gmail.com",
      link: "mailto:rahadifauzan7@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+62 811-1107-244",
      link: "tel:+628111107244",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bogor, Indonesia",
      link: "#",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "#",
      color: "hover:text-blue-400",
    },
    { icon: Github, label: "GitHub", link: "#", color: "hover:text-gray-400" },
    { icon: Twitter, label: "Twitter", link: "#", color: "hover:text-sky-400" },
    {
      icon: Facebook,
      label: "Facebook",
      link: "#",
      color: "hover:text-blue-500",
    },
  ];

  return (
    <section className="px-8 pb-20 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4">
            <Mail size={20} className="text-blue-400" />
            <span className="text-sm text-gray-400">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your
            ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-8">
                Feel free to reach out through any of these channels. I
                typically respond within 24 hours.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      <p className="text-white font-semibold">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    aria-label={social.label}
                    className={`w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-white/30 ${social.color}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">
                Available for freelance work
              </span>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {!isSubmitted ? (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-300 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full btn bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. I'll get back to you as soon as
                  possible.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Optional: Map or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Looking for my resume?{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 underline">
              Download it here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
