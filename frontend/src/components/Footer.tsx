// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiTwitter, FiFacebook, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';

const Footer = () => {
  const links = {
    Product: ['Features', 'Pricing', 'API', 'Documentation'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Support: ['Help Center', 'Community', 'Contact', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <FiCheckCircle className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold">TaskFlow</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md">
              The intelligent task management platform that helps teams and individuals organize, 
              prioritize, and execute work with unprecedented efficiency.
            </p>
            <div className="flex space-x-4">
              {[FiTwitter, FiFacebook, FiLinkedin, FiGithub].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5 }}
                  href="#"
                  className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-bold text-lg mb-6">{category}</h4>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-4 sm:p-8 mb-12 border border-gray-800"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 lg:mr-8">
              <h4 className="text-xl font-bold mb-2">Stay in the loop</h4>
              <p className="text-gray-400">
                Subscribe to our newsletter for the latest updates and productivity tips.
              </p>
            </div>
            <form className="flex w-full lg:w-auto ">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow w-full lg:w-80 px-6 py-3 bg-gray-900 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-2 py-1 sm:px-6 sm:py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 rounded-r-lg font-semibold flex items-center"
              >
                <FiSend className="mr-2" />
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;