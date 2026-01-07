// components/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import {
  FiClipboard,
  FiCalendar,
  FiCheckSquare,
  FiTrendingUp,
} from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiClipboard />,
      title: "Create Tasks",
      description: "Add tasks with details, deadlines, and priority levels.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiCalendar />,
      title: "Organize & Schedule",
      description: "Drag and drop tasks into timelines and calendars.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiCheckSquare />,
      title: "Track Progress",
      description: "Monitor completion rates with visual progress indicators.",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <FiTrendingUp />,
      title: "Analyze & Improve",
      description: "Review analytics to optimize your workflow over time.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How TaskFlow Works
          </h2>
          <p className="text-xl text-gray-600">
            Get started in minutes and transform how you manage tasks forever.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-6 p-6 rounded-2xl bg-gradient-to-r ${step.color} shadow-lg`}
                  >
                    <div className="text-white text-3xl">{step.icon}</div>
                  </div>
                  <div className="bg-white p-2 rounded-full border-4 border-white -bottom-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center ">
                <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    See TaskFlow in Action
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Watch how teams and individuals use TaskFlow to streamline
                    their workflow, increase productivity, and achieve more in
                    less time.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold flex items-center"
                  >
                    <svg
                      className="mr-2 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Full Demo (3 min)
                  </motion.button>
                </div>
                <div className="lg:w-1/2 ">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-r from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                      <div className="text-center">
                        <iframe
                          src="https://www.youtube.com/embed/lXaoR8gKjE8?si=eZ0U5LDyhQICrqwH"
                          title="YouTube video player"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="h-full w-full sm:h-[250px] sm:w-[400px] md:h-[315px] md:w-[560px]"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
