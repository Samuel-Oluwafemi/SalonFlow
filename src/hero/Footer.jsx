import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "Demo"]
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Contact"]
    },
    {
      title: "Resources",
      links: ["Docs", "API", "Support", "FAQ"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookies", "License"]
    }
  ];

  const socialLinks = [
    { icon: Facebook, link: "#", label: "Facebook" },
    { icon: Twitter, link: "#", label: "Twitter" },
    { icon: Instagram, link: "#", label: "Instagram" },
    { icon: Linkedin, link: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 md:pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Bookify
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              The smartest booking system for beauty professionals.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="bg-gray-800 hover:bg-purple-600 p-3 rounded-full transition duration-300"
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-purple-400 transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12 mb-12"
        >
          <h4 className="text-lg font-bold mb-6 text-white">Get in Touch</h4>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-3 rounded-full">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">support@bookify.app</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">+234 810 240 9849</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-pink-600 p-3 rounded-full">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white font-medium">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} Bookify. All rights reserved. Built with ❤️ for beauty professionals.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
